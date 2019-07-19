import axios from 'axios';
import environment from '../configure/devOrProduct';

/**
 * 发布文章
 */
export const publishArticle = (params) => {
    return axios.post(environment.DEV.url + '/blog/insertArticle', params);
};

/**
 * 根据种类获取摘要信息
 */
export const getAbstract = (params) => {
    return axios.post(environment.DEV.url + '/blog/queryAbstract', params);
};
