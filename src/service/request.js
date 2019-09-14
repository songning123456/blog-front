import axios from '../configure/ajax/index';
import environment from '../configure/devOrProduct';

/**
 * 发布文章
 */
export const publishArticle = (params) => {
    return axios.ajax(environment.DEV.esUrl + '/blog/insertArticle', 'post', params);
};

/**
 * 根据种类获取摘要信息
 */
export const getAbstract = (params) => {
    return axios.ajax(environment.DEV.esUrl + '/blog/queryAbstract', 'post', params);
};

/**
 * 查询总数
 * @returns {*|Promise|Promise<any>}
 */
export const getAllCount = () => {
    return axios.ajax(environment.DEV.esUrl + '/blog/queryAllCount', 'post');
};

/**
 * 获取文章详情
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getContent = (params) => {
    return axios.ajax(environment.DEV.esUrl + '/blog/queryContent', 'post', params);
};

/**
 * 获取热门文章
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getHotArticle = (params) => {
    return axios.ajax(environment.DEV.esUrl + '/blog/queryHotArticle', 'post', params);
};

/**
 *
 * @returns {*|Promise|Promise<any>}
 */
export const getLabelCache = () => {
    return axios.ajax(environment.DEV.url + '/label/queryLabelCache', 'post');
};

/**
 *
 * @returns {*|Promise|Promise<any>}
 */
export const getGroupCache = () => {
    return axios.ajax(environment.DEV.url + '/label/queryGroupCache', 'post');
};

export const getAllLabelName = () => {
    return axios.ajax(environment.DEV.url + '/label/queryAllLabelName', 'post');
};

export const highlightSearch = (params) => {
    return axios.ajax(environment.DEV.esUrl + '/blog/searchArticle', 'post', params);
};

/**
 * 获取个人简介信息
 */
export const getPersonalInfo = (params) => {
    return axios.ajax(environment.DEV.url + '/personalInfo/getPersonalInfo', 'post', params);
};

/**
 *
 * @param params
 */
export const getBloggerInfo = (params) => {
    return axios.ajax(environment.DEV.url + '/blogger/getBlogger', 'post', params);
};

export const getHadoop = (params) => {
    return axios.ajax(environment.DEV.url + '/statistic/hadoop', 'post', params);
};

export const sendSimpleMail = (params) => {
    return axios.ajax(environment.DEV.url + '/mail/send', 'post', params);
};
