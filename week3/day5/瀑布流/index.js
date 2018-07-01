// 获取元素
let uls = document.getElementsByTagName('ul');
uls = [...uls]//通过es6中的展开运算符将类数组转化成一个数组
let winH = utils.win('clientHeight');//可视窗口的高度
// let bodyH = null; // body页面的高度
let imgs = document.getElementsByTagName('img');

// 再页面中插入内容
function bindHtml(n) {
    for(var i=0;i<n;i++){
        //对所有ul进行排序，高度最小的ul，给它插入li卡片
        uls.sort((a,b)=>{
            // a \ b =>每一个ul
            // return a.offsetHeight - b.offsetHeight
                return utils.css(a,'height') - utils.css(b,'height')
        })
        // 对排好序的ul，高度最小的ul插入 li卡片
        uls[0].innerHTML+=`<li>
        <div class="bg">
           <img pic="img/${utils.getRandom(1,27)}.jpg" alt="">
        </div>
        <a href="javascript:;">点击详情</a>
        </li>`
    }

}
bindHtml(20);
//滑动鼠标，让后执行方法，当鼠标滑动到最底部的时候，让页面重新再加载一次
window.onscroll = function () {
    let winST = utils.win('scrollTop');
    let bodyH = utils.win('scrollHeight');
    if(winST+winH+50>=bodyH){
        // 浏览器窗口的滚动的高度+浏览器可视窗口的高度+50px的高度>body的高度的时候
        bindHtml(20);
    }
    forImg()
}
forImg()
function forImg() {
    for (var i=0;i<imgs.length;i++){
        lazyImg(imgs[i])
    }
}
function lazyImg(ele) {
    let winST = utils.win('scrollTop');
    let imgT = utils.offset(ele).top;
    let imgH = utils.css(ele,'height');
    // console.log(imgH);
    if(winST+winH>imgT+imgH){
        // 创建一张新的图片
        let newImg = new Image;
        //  我们通过getAttribute这种方式获取行内的属性
        let url = ele.getAttribute('pic');
        // 把地址给新创建的图片
        newImg.src = url;
        // 让图片尝试加载,如果图片加载成功就执行这个方法
        newImg.onload = function () {
            ele.src = this.src;
            fadeIn(ele)
        }
    }
}
function fadeIn(ele) {
    let op = utils.css(ele,'opacity');
    let timer = setInterval(()=>{

        utils.css(ele,'opacity',op+=0.05);
        if(utils.css(ele,'opacity')>=1){
            clearInterval(timer);
            utils.css(ele,'opacity',1);
        }
    },17)
}