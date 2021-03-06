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
    data.forEach(item=>{
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
    // (function () {
    btnList[i].flg = -1
        if(i==2) {
            btnList[i].onclick = function () {
                this.flg*=-1
                data.sort((a, b) => {
                    return (a.price - b.price)*this.flg
                })
                bindHtml()
            }
        }else if(i==1){
            btnList[i].onclick = function () {
                this.flg*=-1
                data.sort((a, b) => {
                    return (a.hot - b.hot)*this.flg
                })
                bindHtml()
            }
        }else{
            btnList[i].onclick = function () {
                this.flg*=-1
                data.sort((a, b) => {
                    return (new Date(a.time) - new Date(b.time))*this.flg
                })
                bindHtml()
            }
        }
    // })()
}

[1,2].sort((a,b)=>{
    return (a-b)*-1// 1-2 //-1
})
[1,2].sort((a,b)=>{
    return b-a// 2-1 // 1
})



