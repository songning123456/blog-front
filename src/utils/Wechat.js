import {wechatWebSocket} from '../service/webSocket';

let wechat = {};
// webSocket 对象
wechat.webSocket = null;
// 避免webSocket重复连接
wechat.lockReConnect = false;
// 心跳
wechat.heartCheck = {
    timeout: 10 * 1000, // 10s发一次心跳
    timeoutObj: null,
    serverTimeoutObj: null,
    reset: function () {
        clearTimeout(this.timeoutObj);
        clearTimeout(this.serverTimeoutObj);
        return this;
    },
    start: function () {
        this.timeoutObj = setTimeout(() => {
            // 发送一次心跳ping, 返回pong说明连接正常
            wechat.webSocket.send('ping');
            this.serverTimeoutObj = setTimeout(() => {
                wechat.webSocket.close();
            }, this.timeout);
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
            let data = JSON.parse(message.data);
            if (wechat.message[data.userId]) {
                wechat.message[data.userId](data);
            }
        }
    };
};
wechat.createWebSocket();
export default wechat;
