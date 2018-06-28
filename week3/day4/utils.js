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
    function getCss(ele,attr){
        // getComputedStyle(元素，元素伪类【一般情况下不写或者写null都可以】)【元素样式上的属性名】 这个方法是用来获取当前元素设置的样式，这个样式是浏览器已经成功渲染出来的样式
        // 在ie6-8下不兼容，xxx.currentStyle //
        if('getComputedStyle' in window){
            // 通过in方法来判断当前属性是否在这个对象中，如果在，证明当前浏览器是标准浏览器，可以用；
            var val = window.getComputedStyle(ele)[attr];// 它的返回值是一个对象
            var reg = /^-?([1-9]\d+|\d+)(\.\d+)?(px|pt|em|rem)?$/i;
            //'12.5px' 'red' 'url(..)' '100%'
            if(reg.test(val)){
                val = parseFloat(val) // 去掉后面的单位，将字符串转成数字
            }
        }
        return val
    }
    /*
    * 设置当前元素的样式
    * 参数：当前元素 当前的样式 样式的值
    * 返回值：没有
    * */
    function setCss(ele,attr,value) {
        var reg = /^width|height|fontSize|(margin|padding)?(top|left|bottom|right)$/i;
        // 我们创建的这个正则，是匹配可以设置数值的属性
        if(reg.test(attr)){
            // 判断当前传的值有没有添加px属性，如果没有，我们手动给这个值添加上px属性，如果有可以不管
            /px/.test(value)?null:value+='px'
        }
        // 最后我们将这个属性和属性值设置给当前的元素
        ele.style[attr]=value;
    }
    /*
    * 批量给元素设置属性
    * 参数：当前元素，对象
    * 返回值：没有
    * */
    function setGroupCss(ele,obj) {
        // 检测obj是一个对象,我们通过Object上的一个方法来检测
        if(Object.prototype.toString.call(obj) == '[object Object]'){
           for(var key in obj){
               // 通过for in循环可以便利到obj上的公有属性和私有属性，但是公有属性对于样式设置没有意义，我们需要通过hasOwnProperty，这个方法找到它的私有属性，进行赋值
               if(obj.hasOwnProperty(key)){
                   // 在这里我们可以通过写的setCss方法来给元素赋值
                   setCss(ele,key,obj[key])
               }
           }
        }
    }

    /*
    * css
    * 通过css方法可以给元素设置样式
    * 如果传的参数是三个参数，我们给元素直接设置样式
    * 如果传的参数是二个参数，判断第二个参数是否是一个对象，如果是对象，就批量给当前元素设置，如果不是对象，就获取到当前元素的样式
    *
    *
    * */

    function css(...arg) {
        // if(arguments.length===3){
        //     setCss(arguments[0],arguments[1],arguments[2])
        // }else{
        //     if(arguments[1] instanceof Object){
        //         setGroupCss(arguments[0],arguments[1])
        //     }else{
        //         return getCss(arguments[0],arguments[1])
        //     }
        // }
        // 通过判断arg的length的长度，来决定是否调用哪个方法，如果长度为3的话，我们调用setCss方法（ary[0],arg[1],arg[2]）
        // 剩余运算符拿到的值，再通过...变成扩展运算符（‘属性0’，‘属性1’，‘属性2’）
        if(arg.length===3){
            setCss(...arg)
        }else if(arg.length===2){
            if(arg[1] instanceof Object){
                setGroupCss(...arg) //继续让该形参展开，执行setGroupCss方法
            }else{
                return getCss(...arg) //如果第二个参数不是对象，我们调用getCss方法，将返回值return出来
            }
        }
    }

    /*
    * 类数组转数组
    *
    * */
    function toArray(ary) {
        return  [].slice.call(ary)
        // return  [...ary]
    }

    /*
    * 获取随机数的方法
    *
    * */
    // 获取随机数 Math.round(Math.random()*(m-n)+n)
    function getRandom(n,m) {
        n=Number(n);
        m=Number(m);
        if(!isNaN(n)&& !isNaN(m)){
            // 如果m小于n的话怎么办
            if(n>m){
               [n,m] = [m,n]
            }
            return Math.round(Math.random()*(m-n)+n)
        }
    }


    return {
        win,
        offset,
        getCss,
        setCss,
        setGroupCss,
        css,
        toArray,
        getRandom,
    }
})()

// console.log(utils.getCss(box,'height'));
// console.log(utils.setCss(box,'background','green'));
// console.log(utils.setCss(box,'height','300'));
// console.log(utils.setGroupCss(box,{height:'300',width:300,background:'green'}));
// console.log(utils.setGroupCss(box,1));
// utils.css(box,'width',100)
// utils.css(box,{'width':200,marginLeft:50})
// console.log(utils.css(box, 'width'));
// console.log(utils.getRandom(90, 100));