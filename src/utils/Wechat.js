import {wechatWebSocket} from '../service/webSocket';

let wechat = {};
// webSocket 对象
wechat.webSocket = null;
// 避免webSocket重复连接
wechat.lockReConnect = false;
// 打开时发送消息通知后台登陆成功并且发布
wechat.open = null;
// 接收消息的方法集合
wechat.message = null;
// 心跳
wechat.heartCheck = {
    timeout: 2000, // 2s发一次心跳
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function () {
        let self = this;
        this.timeoutObj = setTimeout(function () {
            //这里发送一个心跳，后端收到后，返回一个心跳消息，onmessage拿到返回的心跳就说明连接正常
            wechat.webSocket.send('ping');
            //如果超过一定时间还没重置，说明后端主动断开了
            self.serverTimeoutObj = setTimeout(function () {
                //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                wechat.webSocket.close();
            }, self.timeout);
        }, this.timeout);
    }
};
// 创建webSocket对象
wechat.createWebSocket = function () {
    try {
        wechat.webSocket = wechatWebSocket();
        wechat.initWebSocket();
    } catch (e) {
        wechat.reconnect();
    }
};
// 重连
wechat.reconnect = function () {
    if (wechat.lockReConnect) {
        return;
    }
    wechat.lockReConnect = true;
    // 连接失败会一直重连， 设置延迟避免请求过多
    setTimeout(() => {
        wechat.createWebSocket();
        wechat.lockReConnect = false;
    }, 2000);
};
// 初始化
wechat.initWebSocket = function () {
    wechat.webSocket.onopen = (message) => {
        wechat.heartCheck.reset().start();
        wechat.open();
    };
    wechat.webSocket.onerror = (message) => {
        wechat.reconnect();
    };
    wechat.webSocket.onclose = (message) => {
        wechat.reconnect();
    };
    wechat.webSocket.onmessage = (message) => {
        wechat.heartCheck.reset().start();
        if (message.data !== 'pong') {
            if (wechat.message) {
                wechat.message(Object.assign({}, JSON.parse(message.data)));
            }
        }
    };
};
export default wechat;
