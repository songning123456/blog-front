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

/**
 * 驼峰转下划线
 * @param param
 * @returns {string}
 */
FunctionUtil.camelToUnderline = function (param) {
    return param.replace(/([A-Z])/g, '-$1').toLowerCase();
};

/**
 * 下划线转驼峰
 * @param param
 */
FunctionUtil.underlineToCamel = function (param) {
    return param.replace(/_(\w)/g, function (all, letter) {
        return letter.toUpperCase();
    });
};

/**
 * 根据属性获取对象
 * @param object
 * @param array
 */
FunctionUtil.getObjByAttribute = function (object = {}, array = []) {
    let result = {};
    if (JSON.stringify(object) !== '{}' && array.length !== 0) {
        array.forEach(item => {
            result[item] = object[item];
        });
    }
    return result;
};
/**
 * 对象转json字符串
 */
FunctionUtil.objectToJson = (object) => {
    try {
        return JSON.stringify(object);
    } catch (e) {
        console.error('JSON.stringify 出错！');
    }
    return '';
};
/**
 * json字符串转对象
 */
FunctionUtil.jsonToObject = (json) => {
    if (typeof json === 'object') {
        return json;
    }
    try {
        return JSON.parse(json);
    } catch (e) {
        console.error('JSON.parse 出错！');
    }
    return null;
};

/**
 * @return {string}
 */
FunctionUtil.GetString = function (url, obj) {
    let result = url + '?';
    for (let key in obj) {
        result += (key + '=' + obj[key] + '&');
    }
    result = result.slice(0, -1);
    return result;
};

export default FunctionUtil;
