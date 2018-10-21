

function Banner(){};
$.extend(Banner.prototype,{
	init:function(options){
		this.slider_item=$(options.slider_item);
		this.sk_left=$(options.sk_left);
		this.sk_right=$(options.sk_right);
		this.list_btn=$(options.list_btn);
		this.nowIndex=0;
		this.list_wrap=this.slider_item.parent();
		//console.log(this.list_wrap)
		this.focus_wraper=this.list_wrap.parent();
		//console.log(this.focus_wraper)
		this.slider_num=this.slider_item.length;
		//console.log(this.slider_num)
		if(this.sk_left==0&&this.sk_right==0&&this.list_btn==0){
			this.autoPlay();
		}else{
			this.bindEvent();
		}
		if(options.autoPlay){
			this.autoPlay();
		}
	},
	bindEvent:function(){
		this.sk_left.click($.proxy(this.prev,this));
		this.sk_right.click($.proxy(this.next,this));
		this.list_btn.mouseover($.proxy(this.toIndex,this));
	},
	next:function(){
		if(this.nowIndex==this.slider_num-1){
			this.list_wrap.css({
				left:0
			})
			this.nowIndex=1;
		}else{
			this.nowIndex++;
		}
		this.animate()
	},
	prev:function(){
		if(this.nowIndex==0){
			this.list_wrap.css({
				left:-(this.slider_num-1)*(this.slider_item[0].offsetWidth)
			})
			this.nowIndex=this.slider_num-2
		}else{
			this.nowIndex--;
		}
		this.animate()
	},
	toIndex:function(event){
		var target=event.target;
		this.nowIndex=$(target).index();
		this.animate()
	},
	autoPlay:function(){
		this.focus_wraper.mouseenter(function(){
                        clearInterval(this.banner_timer)
                    }.bind(this))
        this.focus_wraper.mouseleave(function(){
                        this.banner_timer=setInterval(function(){
                        this.next()
						}.bind(this),2000)
                    }.bind(this)).trigger("mouseleave");
	},
	animate:function(){
		this.list_wrap.stop().animate({
			left:-this.nowIndex*(this.slider_item[0].offsetWidth)
		})
		this.list_btn.removeClass("active");
            var index;
            if(this.nowIndex==this.slider_num-1){
                index=0;
            }else{
                index=this.nowIndex;
            }
            this.list_btn.eq(index).addClass("active");
	}
})


var banner = new Banner();
banner.init(
    {
        slider_item: ".xuan-bottom-left li",
        list_btn: ".xuan-bottom-left-btn button",
        autoPlay: true
    }

);
