import axios from '../configure/ajax/index';

/**
 * 发布文章
 */
export const publishArticle = (params) => {
    return axios.ajax('/blog/insertArticle', 'post', params);
};

/**
 * 根据种类获取摘要信息
 */
export const getAbstract = (params) => {
    return axios.ajax('/blog/queryAbstract', 'post', params);
};

/**
 * 获取文章详情
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getContent = (params) => {
    return axios.ajax('/blog/queryContent', 'post', params);
};

/**
 * 插入历史信息
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const insertHistoryInfo = (params) => {
    return axios.ajax('/history/insertHistory', 'post', params);
};

export const getHistoryInfo = (params) => {
    return axios.ajax('/history/getHistory', 'post', params);
};

/**
 * 获取热门文章
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getHotArticle = (params) => {
    return axios.ajax('/blog/queryHotArticle', 'post', params);
};

export const getSelectedLabel = () => {
    return axios.ajax('/label/querySelected', 'get');
};

export const getAllLabel = (params) => {
    return axios.ajax('/label/all', 'post', params);
};

export const highlightSearch = (params) => {
    return axios.ajax('/blog/searchArticle', 'post', params);
};

/**
 * 他人获取作者简介信息
 */
export const getPersonalInfo = (params) => {
    return axios.ajax('/personalInfo/getPersonalInfo', 'post', params);
};

export const updatePersonalInformation = (params) => {
    return axios.ajax('/personalInfo/update', 'post', params);
};

export const addMyInfo = (params) => {
    return axios.ajax('/personalInfo/add', 'post', params);
};
/**
 * 获取个人简介信息
 */
export const getMyInfo = (params) => {
    return axios.ajax('/personalInfo/getMyInfo', 'post', params);
};
/**
 *
 * @param params
 */
export const getBlogger = (params) => {
    return axios.ajax('/blogger/getBlogger', 'post', params);
};

export const updateBlogger = (params) => {
    return axios.ajax('/blogger/update', 'post', params);
};

export const getHadoop = (params) => {
    return axios.ajax('/statistic/hadoop', 'post', params);
};

export const sendSimpleMail = (params) => {
    return axios.ajax('/mail/send', 'post', params);
};

export const saveEmailDraft = (params) => {
    return axios.ajax('/mail/draft', 'post', params);
};

/**
 * 登陆
 * @param params
 * @returns {*|Promise<any>}
 */
export const loginBlog = (params) => {
    return axios.ajax('/login', 'post', params);
};

/**
 * 退出
 * @returns {*|Promise<any>}
 */
export const exitBlog = () => {
    return axios.ajax('/logout', 'get');
};

/**
 *
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const updateTag = (params) => {
    return axios.ajax('/tag/updateTag', 'post', params);
};

/**
 * 模糊查询系统配置
 * @param params
 * @returns {*|Promise|Promise<unknown>}
 */
export const getSystemConfigLike = (params) => {
    return axios.ajax('/systemConfig/getLike', 'post', params);
};

export const updateSystemConfig = (params) => {
    return axios.ajax('/systemConfig/update', 'post', params);
};

export const updateAttention = (params) => {
    return axios.ajax('/label/updateAttention', 'post', params);
};

/**
 * 判断是否存在此用户
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const existUser = (params) => {
    return axios.ajax('/users/exist', 'post', params);
};

export const saveImage = (params) => {
    return axios.ajax('/image/save', 'post', params);
};
export const directUpload = (params) => {
    return axios.ajax('/file/directUpload', 'post', params);
};
export const shardUpload = (params) => {
    return axios.ajax('/file/shardUpload', 'post', params);
};
export const shardMerge = (params) => {
    return axios.ajax('/file/shardMerge', 'get', params);
};
export const fileIsExist = (params) => {
    return axios.ajax('/file/isExist', 'get', params);
};
export const getFile = (params) => {
    return axios.ajax('/file/getFile', 'post', params);
};
export const deleteImage = (params) => {
    return axios.ajax('/image/delete', 'post', params);
};

export const getLabelConfig = () => {
    return axios.ajax('/label/getLabelConfig', 'get');
};
export const registerAll = (params) => {
    return axios.ajax('/register/all', 'post', params);
};
export const modifyUser = (params) => {
    return axios.ajax('/users/modify', 'post', params);
};

export const getUserPermission = (params) => {
    return axios.ajax('/users/getPermission', 'post', params);
};

/**
 * 刷新缓存
 * @param params
 * @returns {*|Promise|Promise<unknown>}
 */
export const refreshCache = (params) => {
    return axios.ajax('/cache/refresh', 'post', params);
};

export const gitHubUser = (params) => {
    return axios.ajax('/thirdPart/gitHub', 'post', params);
};

export const getWrittenArticle = (params) => {
    return axios.ajax('/blog/queryByUser', 'post', params);
};
export const getLovedArticle = (params) => {
    return axios.ajax('/blog/queryByLove', 'post', params);
};
export const deleteArticle = (params) => {
    return axios.ajax('/blog/delete', 'post', params);
};

export const getDialog = (params) => {
    return axios.ajax('/wechat/getDialog', 'post', params);
};
