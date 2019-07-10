let dateFormat = {};

/**
 * 对Date的扩展，将 Date 转化为指定格式的String
 * 月(M)、日(d)、12小时(h)、24小时(H)、分(m)、秒(s)、周(E)、季度(q) 可以用 1-2 个占位符
 * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 * e.g
 * yyyy-MM-dd hh:mm:ss.S => 2006-07-02 08:09:04.423
 * yyyy-MM-dd E HH:mm:ss => 2009-03-10 二 20:09:04
 * yyyy-MM-dd EE hh:mm:ss => 2009-03-10 周二 08:09:04
 * yyyy-MM-dd EEE hh:mm:ss => 2009-03-10 星期二 08:09:04
 * yyyy-M-d h:m:s.S => 2006-7-2 8:9:4.18
 * @param date
 * @param fmt
 * @returns {*}
 */
dateFormat.pattern = function (date, fmt) {
    let o = {
        'M+': date.getMonth() + 1, //月份
        'd+': date.getDate(), //日
        'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12, //小时
        'H+': date.getHours(), //小时
        'm+': date.getMinutes(), //分
        's+': date.getSeconds(), //秒
        'q+': Math.floor((date.getMonth() + 3) / 3), //季度
        'S': date.getMilliseconds() //毫秒
    };
    let week = {
        '0': '/u65e5',
        '1': '/u4e00',
        '2': '/u4e8c',
        '3': '/u4e09',
        '4': '/u56db',
        '5': '/u4e94',
        '6': '/u516d'
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
        }
    }
    return fmt;
};

/**
 * Date => yyyy-MM-dd HH:mm:ss
 * @param date
 * @returns {string}
 */
dateFormat.formatDate = function (date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second = date.getSeconds();
    second = minute < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
};

/**
 * yyyy-MM-dd HH:mm:ss => Date
 * @param param
 * @returns {Date}
 */
dateFormat.toData = function (param) {
    param = param.replace(/-/g, '/');
    let date = new Date(param);
    return date;
};

/**
 * 比较时间
 * @param param1
 * @param param2
 * @returns {boolean}
 */
dateFormat.compareTime = function (param1, param2) {
    let date1 = dateFormat.toData(param1);
    let date2 = dateFormat.toData(param2);
    if (date1.getTime() > date2.getTime()) {
        return true;
    } else {
        return false;
    }
};

export default dateFormat;
