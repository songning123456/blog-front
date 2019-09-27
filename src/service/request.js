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
 * 获取热门文章
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getHotArticle = (params) => {
    return axios.ajax('/blog/queryHotArticle', 'post', params);
};

/**
 *
 * @returns {*|Promise|Promise<any>}
 */
export const getGroupCache = () => {
    return axios.ajax('/label/queryGroupCache', 'post');
};

export const getAllLabelName = () => {
    return axios.ajax('/label/queryAllLabelName', 'post');
};

export const highlightSearch = (params) => {
    return axios.ajax('/blog/searchArticle', 'post', params);
};

/**
 * 获取个人简介信息
 */
export const getPersonalInfo = (params) => {
    return axios.ajax('/personalInfo/getPersonalInfo', 'post', params);
};

/**
 *
 * @param params
 */
export const getBloggerInfo = (params) => {
    return axios.ajax('/blogger/getBlogger', 'post', params);
};

export const getHadoop = (params) => {
    return axios.ajax('/statistic/hadoop', 'post', params);
};

export const sendSimpleMail = (params) => {
    return axios.ajax('/mail/send', 'post', params);
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
 * 获取点赞状态
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getTag = (params) => {
    return axios.ajax('/tag/get', 'post', params);
};

/**
 *
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const updateTag = (params) => {
    return axios.ajax('/tag/update', 'post', params);
};
