import util from './FunctionUtil';

const _config_ = {};

let image;

let video;

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
};

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

export default _config_;
