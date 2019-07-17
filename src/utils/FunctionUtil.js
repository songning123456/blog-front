let FunctionUtil = {};

/**
 * 深拷贝
 * @param obj
 * @returns {*}
 */
FunctionUtil.deepClone = function clone (obj) {
    let result = obj;
    if (typeof obj === 'object' && obj !== null) {
        result = Object.prototype.toString.call(obj) === '[object Array]' ? [] : {};
        for (let prop in obj) {
            result[prop] = clone(obj[prop]);
        }
    }
    return result;
};

export default FunctionUtil;
