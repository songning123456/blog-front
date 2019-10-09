let ResponseUtil = {};

ResponseUtil.response = function (data, message = '') {
    let msg = '';
    if (message) {
        msg = '【' + message + '】';
    }
    return new Promise((resolve, reject) => {
        if (data.status === 200) {
            if (data.total > 0) {
                let result = {
                    data: data.data,
                    dataExt: data.dataExt,
                    total: data.total
                };
                resolve(result);
            } else {
                reject(msg + '查询为空');
            }
        } else {
            reject('查询失败' + data.message);
        }
    });
};

export default ResponseUtil;
