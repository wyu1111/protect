
//轮播图封装 (选择器为queryselector, className 为active);
//right为右面按钮,left为左;
//btn_list为下面onmouseenter按钮;
//lun_list为图片;
//每两秒自动播放;
function Lun (){};
Lun.prototype.init = function(right, left, btn_list, lun_list){
    this.oLeft = document.querySelector(left);
    this.oRight = document.querySelector(right);
    this.aBtn = document.querySelectorAll(btn_list);
    // console.log(this.aBtn);
    
    this.aImg = document.querySelectorAll(lun_list);
    console.log(this.aImg);
    this.index = 0;
    this.handleEvent();
    this.autoClick();
}
Lun.prototype.handleEvent = function(){
    this.oRight.onclick = this.changeIndex.bind(this);
    this.oLeft.onclick = this.changeIndex.bind(this);
    this.oRight.onmouseenter = this.stopTimer.bind(this);
    this.oLeft.onmouseenter = this.stopTimer.bind(this);
    this.oRight.onmouseleave = this.autoClick.bind(this);
    this.oLeft.onmouseleave = this.autoClick.bind(this);
    for(var i = 0 ; i < this.aBtn.length ; i ++){
        this.aBtn[i].onmouseenter = this.changeIndex.bind(this);
        this.aBtn[i].onmouseleave = this.autoClick.bind(this);
    }
}

Lun.prototype.changeIndex = function(e){
    var e = e;
    var target = e.target || e;
    if(target == this.oRight.children[0] || target == this.oRight){
        if(this.index == this.aImg.length - 1 ) this.index = 0;
        else this.index ++;
    }else{
        if(this.index == 0) this.index = this.aImg.length - 1;
        else this.index --;
    }
    var aBtn = Array.from(this.aBtn);
    var index;
    if((index = aBtn.indexOf(target) ) != -1){
        this.index = index;
        this.stopTimer();
    }
    this.animate();
}
Lun.prototype.animate = function(){
    for(var i = 0 ; i < this.aImg.length ; i++){
        this.aImg[i].className = "";
        this.aBtn[i].className = "";
    }
    this.aImg[this.index].className = "active";
    this.aBtn[this.index].className = "active";
}
Lun.prototype.autoClick = function(){
    clearInterval(this.timer);
    this.timer = setInterval(() => {
        this.changeIndex(this.oRight);
    }, 2000);
}
Lun.prototype.stopTimer = function(){
    clearInterval(this.timer);
}

var lun1 = new Lun();
lun1.init("#banner-right", "#banner-left",".banner-buttom-list button", ".banner li");
var lun2=new Lun();
lun2.init("#dinghun-right","#dinghun-left",".dinghun-btn-list button",".dinghun li");
var lun3=new Lun();
lun3.init("#tuijian-right","#tuijian-left",".tuijian-top a",".tuijian-connet li")