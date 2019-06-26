// 跨浏览器的事件处理程序
let EventUtil = {};
// 添加事件
EventUtil.addHandler = function (element, type, handler) {
    if (element.addEventListener) {
        // 使用DOM2级方法添加事件
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        // 使用IE方法添加事件
        element.attachEvent('on' + type, handler);
    } else {
        // 使用DOM0级方法添加事件;
        element['on' + type] = handler;
    }
};
//取消事件
EventUtil.removeHandler = function (element, type, handler) {
    if (element.removeEventListener) {
        element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
        element.detachEvent('on' + type, handler);
    } else {
        element['on' + type] = null;
    }
};
// 使用这个方法跨浏览器取得event对象
EventUtil.getEvent = function (event) {
    return event || window.event;
};
// 返回事件的实际目标
EventUtil.getTarget = function (event) {
    return event.target || event.srcElement;
};
// 阻止事件的默认行为
EventUtil.preventDefault = function (event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
};
//立即停止事件在DOM中的传播
//避免触发注册在document.body上面的事件处理程序
EventUtil.stopPropagation = function (event) {
    if (event.stopPropagation) {
        event.stopPropagation();
    } else {
        event.cancelBubble = true;
    }
};
// 获取mouseover和mouseout相关元素
EventUtil.getRelatedTarget = function (event) {
    if (event.relatedTarget) {
        return event.relatedTarget;
        // 兼容IE8-
    } else if (event.toElement) {
        return event.toElement;
    } else if (event.formElement) {
        return event.formElement;
    } else {
        return null;
    }
};
// 获取mousedown或mouseup按下或释放的按钮是鼠标中的哪一个
EventUtil.getButton = function (event) {
    if (document.implementation.hasFeature('MouseEvents', '2.0')) {
        return event.button;
    } else {
        //将IE模型下的button属性映射为DOM模型下的button属性
        let leftButton = [0, 1, 3, 5, 7];
        let rightButton = [4];
        let middleButton = [2, 6];
        if (leftButton.indexOf(event.button) !== -1) {
            //按下的是鼠标主按钮（一般是左键）
            return 0;
        } else if (rightButton.indexOf(event.button) !== -1) {
            //鼠标次按钮（一般是右键）
            return 1;
        } else if (middleButton.indexOf(event.button) !== -1) {
            //按下的是中间的鼠标按钮
            return 2;
        }
    }
};
// 获取表示鼠标滚轮滚动方向的数值
EventUtil.getWheelDelta = function (event) {
    if (event.wheelDelta) {
        return event.wheelDelta;
    } else {
        return -event.detail * 40;
    }
};
//以跨浏览器取得相同的字符编码，需在keypress事件中使用
EventUtil.getCharCode = function (event) {
    if (typeof event.charCode == 'number') {
        return event.charCode;
    } else {
        return event.keyCode;
    }
};
export default EventUtil;
