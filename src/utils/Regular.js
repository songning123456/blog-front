let Regular = {};
// 正则表达式

Regular.USERNAME = /^[a-zA-Z0-9_.-]{4,20}$/;
Regular.PASSWORD = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
Regular.AUTHOR = /^([\u4e00-\u9fa5]|[a-zA-Z0-9_.-]){1,20}$/;
Regular.EMAIL = /^([\w-_]+(?:\.[\w-_]+)*)@((?:[a-z0-9]+(?:-[a-zA-Z0-9]+)*)+\.[a-z]{2,6})$/;
Regular.PHONE = /^1[3456789]\d{9}$/;

export default Regular;
