import axios from '../configure/ajax/index';
import environment from '../configure/devOrProduct';

/**
 * 发布文章
 */
export const publishArticle = (params) => {
    return axios.ajax(environment.DEV.url + '/blog/insertArticle', 'post', params);
};

/**
 * 根据种类获取摘要信息
 */
export const getAbstract = (params) => {
    return axios.ajax(environment.DEV.url + '/blog/queryAbstract', 'post', params);
};

/**
 * 查询总数
 * @returns {*|Promise|Promise<any>}
 */
export const getAllCount = () => {
    return axios.ajax(environment.DEV.url + '/blog/queryAllCount', 'post');
};

/**
 * 获取文章详情
 * @param params
 * @returns {*|Promise|Promise<any>}
 */
export const getContent = (params) => {
    return axios.ajax(environment.DEV.url + '/blog/queryContent', 'post', params);
};
