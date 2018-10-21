function Tab(){};
$.extend(Tab.prototype,{
    init:function(sort_item,submenu){
        this.hd=$(sort_item);
        console.log(this.hd)
        this.bd=$(submenu);
        console.log(this.bd)
        this.nowIndex=0;
        this.bindEvent();
    },
    bindEvent:function(){
        this.hd.mouseenter($.proxy(this.changeIndex,this))
    },
    changeIndex:function(event){
        var target=event.target;
        this.nowIndex=$(target).index();
        console.log(this.nowIndex)
        this.show();
    },
    show:function(){
        this.hd.eq(this.nowIndex).siblings().removeClass("on");
        this.hd.eq(this.nowIndex).addClass("on");
        this.bd.eq(this.nowIndex).siblings().removeClass("active");
        this.bd.eq(this.nowIndex).addClass("active");
     }
})
var tab=new Tab();
tab.init(".xuan-top-right a",".xuan-center1");
var tab1=new Tab();
tab1.init(".xuan-center1 a",".xuan-bottom-right1")
