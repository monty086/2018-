// 1.获取要操作的元素
var header = document.getElementById('header');
var btnList = header.getElementsByTagName('a');
var shopList = document.getElementById('shopList');
var data = null

// 2. 通过ajax获取要操作的数据
// 创建一个ajax对象
var xhr = new XMLHttpRequest();
// 打开一个请求连接（请求方式，请求地址，是否异步请求）
xhr.open('get','data/product.json',false);
// 监听xhr的准备状态,当状态码变成200，准备状态变成4【准备结束】的时候，证明请求成功
xhr.onreadystatechange= function () {
    if(xhr.status==200 && xhr.readyState==4){
        data = JSON.parse(xhr.responseText)
    }
}
// 发送ajax请求，参数没有
xhr.send();
console.log(data);

// 3将数据绑定到页面当中
function bindHtml (){
    var str = ''
    // 循环便利data数据，将数据通过字符串模板绑定到页面上
    data.forEach(item=>{
        // 其中的变量通过${}这种形式来表现
        str+=`<li>
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <p class="hot">热度:${item.hot}</p>
                <del>$9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </li>`
    })
    shopList.innerHTML=str
}
bindHtml();
// 4.绑定点击事件，实现sort排序
for (var i=0;i<btnList.length;i++){
    // 要给三个按钮绑定事件
    // (function () {
    btnList[i].flg = -1
    btnList[i].onclick = function () {
        // 经过整合方法，除了a,b它的属性名，其他都是相同的，a和b的属性名可以通过获取标签上属性可以拿到
        // 通过getAttribute这种方式拿到标签上属性名和属性值
        var value = this.getAttribute('attrName')
        this.flg*=-1
        // 我们通过封装一个sortAll方法，将产品排序这个功能放到一个函数中，通过call方法，将函数中this改成点击事件的元素，将获取到属性值传入到函数当中
        sortAll.call(this,value)
    }
}

 function sortAll(value) {
    // 因为排序的时候，有一个事件格式需要转换，所以我们需要判断一下传进来的value是不是time事件，如果是事件，就转换一下，如果不是直接sort
    if(value=='time'){
        data.sort((a, b) => {
            return (new Date(a[value]) - new Date(b[value]))*this.flg
        })
    }else{
        data.sort((a, b) => {
            return (a[value] - b[value])*this.flg
        })
    }
    bindHtml()
 }



