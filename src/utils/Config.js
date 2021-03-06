import util from './Common';

const _config_ = {};

let image;

let video;

let music;

let wechat;

_config_.setConfig = function (config) {
    if (typeof config === 'string') {
        config = util.jsonToObject(config) || {};
    }

    // 原始图片
    let {Image} = config;
    if (typeof Image === 'string') {
        Image = util.jsonToObject(Image);
    }
    image = Image;

    let {Video} = config;
    if (typeof Video === 'string') {
        Video = util.jsonToObject(Video);
    }
    video = Video;
    let {Music} = config;
    if (typeof Music === 'string') {
        Music = util.jsonToObject(Music);
    }
    music = Music;
    let {Wechat} = config;
    if (typeof Wechat === 'string') {
        Wechat = util.jsonToObject(Wechat);
    }
    wechat = Wechat;
};

/**
 * 判断 使用 dev || pro
 * @param obj
 * @returns {string|number | config.browserify.dev | {src, options, dest} | string | module.exports.dev | {assetsSubDirectory, assetsPublicPath, errorOverlay, poll, proxyTable, useEslint, devtool, port, host, showEslintErrorsInOverlay, notifyOnErrors, autoOpenBrowser, cssSourceMap, cacheBusting}}
 */
_config_.getSource = function (obj) {
    if (location.hostname === 'localhost') {
        return obj.dev;
    } else {
        return obj.pro;
    }
};

/**
 * 返回原始图片url
 * @returns {*}
 */
_config_.getImageOriginal = function () {
    let param = _config_.getSource(image);
    return param.originalUrl;
};

_config_.getVideoOriginal = function () {
    let param = _config_.getSource(video);
    return param.originalUrl;
};

_config_.getMusicOriginal = function () {
    let param = _config_.getSource(music);
    return param.originalUrl;
};

_config_.getWechatWebSocket = function () {
    let param = _config_.getSource(wechat);
    return param.websocket + '?Authorization=' + localStorage.token;
};

export default _config_;
