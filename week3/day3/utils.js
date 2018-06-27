var utils = (function () {
    // win：获取和设置可视窗口的属性
    function win(attr,value){
        if(value == undefined){
            return document.documentElement[attr] || document.body[attr]
        }
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }
    // offset:找到当前元素距离body的偏移量
    function offset (ele){
        let L = ele.offsetLeft;
        let T = ele.offsetTop;
        let parent = ele.offsetParent;
        while(parent){
            if(!/MSIE 8/.test(window.navigator.userAgent)){
                L+=parent.clientLeft;
                T+=parent.clientTop;
            }
            L+=parent.offsetLeft;
            T+=parent.offsetTop;
            parent= parent.offsetParent;
        }
        return {left:L,top:T}
    }

    return {
        win,
        offset,
    }
})()