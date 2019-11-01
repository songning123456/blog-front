import util from './FunctionUtil';

const _config_ = {};

let image;

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
};

/**
 * 返回原始图片url
 * @returns {*}
 */
_config_.getImageOriginal = function () {
    return image.originalUrl;
};

export default _config_;
