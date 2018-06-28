(function () {
    // 获取元素
    var uls = document.getElementsByTagName('ul');
    var footer = document.getElementsByTagName('footer')[0]
    uls=[...uls];
    var bodyH = null;
    var page = 0;
    var imgs = document.getElementsByTagName('img');
    let winH = utils.win('clientHeight');
// 绑定li标签
    function bindHtml(n){
        page++;
        if(page>2){
            // alert('别拉了~！已经加载到最底部了')
            utils.css(footer,'display','block');
            window.onscroll=null;
            return
        }
        for (var i=0;i<n;i++){
            uls.sort((a,b)=>{
                return utils.css(a,'height')-utils.css(b,'height')
            });
            //给最短的哪个一个ul添加li标签
            uls[0].innerHTML+=`
                <li style='height:${utils.getRandom(300,350)}px'>      <div class="bg">
                <img pic="img/${utils.getRandom(1,27)}.jpg" alt="">
                </div>
                <a href="https://baike.baidu.com/item/%E8%88%AA%E6%B5%B7%E7%8E%8B/75861?fromtitle=%E6%B5%B7%E8%B4%BC%E7%8E%8B&fromid=8904&fr=aladdin" target="_blank">点击查看详情</a>
               </li>
            `
        }
        bodyH = uls[0].offsetHeight//ul
    }
    bindHtml(28);
    readyImg();
    function readyImg(){
        for (var i=0;i<imgs.length;i++){
            lazyImg(imgs[i])
        }
    }

// 下拉加载
    window.onscroll = function () {
        let winS = utils.win('scrollTop');
        if(winS+winH+50>bodyH){
            bindHtml(28)
        }
        readyImg()
    }

    function lazyImg(ele) {
        if(ele.flg)return;
        let winS = utils.win('scrollTop');
        let eleH = ele.offsetHeight/2;
        let eleT = utils.offset(ele).top;
        if(winH+winS>eleH+eleT){
            let newImg = new Image;
            let url = ele.getAttribute('pic');
            newImg.src = url;
            newImg.onload=function () {
                ele.src = this.src;
                newImg=null;
                fadeIn(ele);
                ele.flg=true
            }
        }
    }

    function fadeIn(ele) {
        let opacity = utils.css(ele,'opacity');
        let timer = setInterval(()=>{
            utils.css(ele,'opacity',opacity+=0.15);
            if(utils.css(ele,'opacity')>=1){
                clearInterval(timer);
                utils.css(ele,'opacity',1)
            }
        },50)
    }
})()

