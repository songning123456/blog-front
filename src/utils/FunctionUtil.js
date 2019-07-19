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

/**
 * []根据{label: '', value:''}中的某一key获取另一个key的值
 */
FunctionUtil.getValueByLabel = function (arr, srcKey, srcValue, targetKey) {
    for (let i in arr) {
        if (arr[i][srcKey] === srcValue) {
            return arr[i][targetKey];
        }
    }
};

export default FunctionUtil;
