import axios from 'axios';
/**
 * 发布文章
 */
export const publishArticle = (params) => {
    return axios.post('http://localhost:8072/blog/insertArticle', params);
};
