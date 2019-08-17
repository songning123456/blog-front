import axios from '../configure/ajax/index';
import environment from '../configure/devOrProduct';

/**
 * 发布文章
 */
export const publishArticle = (params) => {
    return axios.ajax(environment.DEV.url + '/es/blog/insertArticle', 'post', params);
};

/**
 * 根据种类获取摘要信息
 */
export const getAbstract = (params) => {
    return axios.ajax(environment.DEV.url + '/es/blog/queryAbstract', 'post', params);
};

/**
 * 查询总数
 * @returns {*|Promise|Promise<any>}
 */
export const getAllCount = () => {
    return axios.ajax(environment.DEV.url + '/es/blog/queryAllCount', 'post');
};

/**
 * 获取文章详情
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getContent = (params) => {
    return axios.ajax(environment.DEV.url + '/es/blog/queryContent', 'post', params);
};

/**
 * 获取热门文章
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getHotArticle = (params) => {
    return axios.ajax(environment.DEV.url + '/es/blog/queryHotArticle', 'post', params);
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
