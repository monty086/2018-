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
    btnList[i].flg = -1;//1 升序  -1 降序
    btnList[i].onclick = function () {
        var value = this.getAttribute('attrName');
        this.flg*=-1
        sortAll.call(this,value)
        arrowColor.call(this)
        clearArrow.call(this)
    }
}

 function sortAll(value) {
    data.sort((a, b) => {
        // 判断value和time是否相等，如果相等直接使用new Date的方式进行相减达到排序效果，如果不相等直接属性名对应的属性值进行相减排序。最后乘以this.flg
        return  (value=='time'?(new Date(a[value]) - new Date(b[value])):(a[value] - b[value]))*this.flg
    })
     bindHtml()
}

 function arrowColor(){
    // 拿到当前a标签下的两个子元素节点，利用索引来表示，一个是up箭头，一个是down箭头
    var down = this.children[1];
    var up = this.children[0];
    // 利用this.flg的值来表示，是升序还是降序，如果是升序，我给up标签添加一个类名bg，如果是降序，给down元素添加一个bg类名
     if(this.flg>0){ //1 升序
         up.classList.add('bg');
         down.classList.remove('bg')
         // 否则就移除相对应的元素上的类名
     } else{
         up.classList.remove('bg');
         down.classList.add('bg')
     }
 }
// 其他的箭头需要及时的清空才行，我们需要便利所有的按钮，然后如果便利的每一个标签和当前点击的不同，那么就让其他的元素移除bg类名，
 function clearArrow(){
    for(var i=0;i<btnList.length;i++){
        if(btnList[i]!=this){
            btnList[i].children[0].classList.remove('bg')
            btnList[i].children[1].classList.remove('bg')
            // 为了让每次点击的时候，其他元素都恢复到默认的升序，我们在清空其他元素状态的时候，给其他元素的flg值都赋值为-1
            // 这样你再点击的时候，就可以默认升序
            btnList[i].flg=-1
        }
    }
 }






