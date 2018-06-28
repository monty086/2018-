var utils = (function () {
    // win：获取和设置可视窗口的属性
    function win(attr,value){
        // 如果参数只传了一个值的话，就是获取属性名对应的属性值
        if(value == undefined){
            // 如果形参没有传值，那么它的值就是undefined
            // undefined == undefined
            // null == undefined
            // var obj = {name:1} obj.name == obj['name']
            // var name = 'name'
            // obj[name] == obj['name'] =>1
            // var ary =[1,2] ary[0]
             return document.documentElement[attr] || document.body[attr]
        }
        // 2个值可以设置，scrollTop scrollLeft
        document.documentElement[attr]=value;
        document.body[attr]=value;
    }
    // offset:找到当前元素距离body的偏移量
    function offset (ele){
        // 要找当前元素距离body的偏移量，是因为当前元素的父级以上出现定义  定位:(position relative fixed)
        let L = ele.offsetLeft; // 当前元素距离父级参照物的左偏移量，
        let T = ele.offsetTop;
        let parent = ele.offsetParent;
        while(parent){// 循环body的时候，body的父级参照物是null，
            //false
            if(!/MSIE 8/.test(window.navigator.userAgent)){

                L+=parent.clientLeft;//父级的左border
                T+=parent.clientTop;
            }
            L+=parent.offsetLeft;// 父级的左偏移量
            T+=parent.offsetTop;
            parent = parent.offsetParent;
        }
        //return T
        // return L
        return {left:L,top:T}
    }
    // utils.offset(box)=>.left

    /*
    * 获取一个元素css属性//获取一个元素css属性名所对应的属性值
    * 参数：元素 属性名
    * 返回值： 属性值
    *
    * */

    return {
        win,
        offset,
    }
})()