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
