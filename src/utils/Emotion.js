import md5 from 'js-md5';

let Emotion = {};
const emotions = ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'];
// 数组加密后
Emotion.encryptArr = emotions.map(item => {
    return md5(item);
});
// 双重数组
Emotion.dbEncryptArr = [];
Emotion.encryptArr.forEach((item, index) => {
    let num = Math.floor(index / 7);
    if (!Emotion.dbEncryptArr[num]) {
        Emotion.dbEncryptArr[num] = [];
    }
    Emotion.dbEncryptArr[num].push(item);
});
// SingleEmotion 中 加密文本 转换成 表情图片
Emotion.encrypt2Img = function (encrypt) {
    let index = Emotion.encryptArr.indexOf(encrypt);
    return `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`;
};
// 文本中所有加密信息全部转换成表情图片
Emotion.text2Img = function (arg0) {
    Emotion.encryptArr.forEach((item, index) => {
        let regex = new RegExp(item, 'g');
        arg0 = arg0.replace(regex, `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`);
    });
    return arg0;
};
// 文本中所有表情图片全部转换成加密信息
Emotion.img2Text = function (arg0) {
    Emotion.encryptArr.forEach((item, index) => {
        let regex = new RegExp(`<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif">`, 'g');
        arg0 = arg0.replace(regex, item);
    });
    return arg0;
};
export default Emotion;
