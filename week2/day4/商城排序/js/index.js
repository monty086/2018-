// 1.获取元素
let header = document.getElementById('header');
let btnList = header.getElementsByTagName('a');
let shopList = document.getElementById('shopList');
let data = null;

// 2.获取数据
let xhr = new XMLHttpRequest();
xhr.open('get','data/product.json',false);
xhr.onreadystatechange = function () {
    if(xhr.status==200&&xhr.readyState==4){
        data= JSON.parse(xhr.responseText)
    }
}
xhr.send()
console.log(data);

//3. 将拿到的数据进行字符串拼接，然后放到页面中
function bindHtml (){
    var str = '';
    data.forEach(item=>{
        str+=`<li>
                <img src="${item.img}" alt="">
                <p>${item.title}</p>
                <p class="hot">热度:${item.hot}</p>
                <del>$9999</del>
                <span>￥${item.price}</span>
                <p class="time">上架时间：${item.time}</p>
            </li>`
    });
    shopList.innerHTML=str
}
bindHtml();

// 4. 点击实现排序
for(var i=0;i<btnList.length;i++){
    //btnList[i].flg=-1;//1
    btnList[i].setAttribute('flg',-1)

    btnList[i].onclick = function () {
        let flg = this.getAttribute('flg');
        this.setAttribute('flg',flg*=-1)
        //this.flg*=-1;
        let value = this.getAttribute('attrName');
        sort.call(this,value);
        arrowColor.call(this);
        clearArrow.call(this)
    }
}
function sort(value){
    data.sort((a,b)=>{
        if(value=='time'){
            return (new Date(a.time)-new Date(b.time))*this.flg
        }else{
            return (a[value]-b[value])*this.flg
        }
    })
    bindHtml()
}

function arrowColor(){
    let up = this.children[0];
    let down = this.children[1];
    let flg =this.getAttribute('flg')
    if(flg>0){//升序
        up.classList.add('bg');
        down.classList.remove('bg')
    }else{ // 降序
        up.classList.remove('bg')
        down.classList.add('bg')
    }
}
function clearArrow(){
    for(var i=0;i<btnList.length;i++){
        if(btnList[i]!=this){
            btnList[i].children[0].classList.remove('bg')
            btnList[i].children[1].classList.remove('bg');
            //btnList[i].flg=-1
            btnList[i].setAttribute('flg',-1)
        }
    }
}
