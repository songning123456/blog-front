import Config from '../utils/Config';

export const wechatWebSocket = () => {
    return new WebSocket(Config.getWechatWebSocket());
};
