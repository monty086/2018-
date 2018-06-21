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