function Gouwu() { }
$.extend(Gouwu.prototype, {
    init: function (opts) {

        this.main = $(".connect-in ul");
        this.loadJson()
            .then(function (res) {
                console.log(1);
                this.json = res.subjects;
                this.getItem();


                var shopCar = new ShopCar();
                shopCar.init(res);






            })
    },
    loadJson: function () {
        var opt = {
            url: "http://localhost:8080/jso/douban.json",
            data: { start: 0, count: 20 },
            context: this
        };
        return $.ajax(opt);
    },

    getItem: function () {
        var str = window.location.hash;
        str = str.replace("#", "");
        var html = "";
        var html2 = "";
        var html3 = "";
        for (var i = 0; i < this.json.length; i++) {
            if (this.json[i].id === str) {
                html += `
                        <img src="${this.json[i].images.small}">
                       `;

                html2 += `<h2>${this.json[i].title}</h2>`;
                html3 += `<button data-id="${this.json[i].id}">加入购物车</button>`;
            }
        }
        $(".small-img").html(html);
        $(".big-img").html(html);
        $(".xiang-right-p").html(html2);
        $(".jia1").html(html3);
    },

})

var gouwu = new Gouwu();
gouwu.init();
//console.log($(".jia1"));
function ShopCar() { }
$.extend(ShopCar.prototype, {
    init: function (res) {
        // 参数合并;
        // opts 假定  会传入一个对象;
        //      假定  什么都没有;
        // opts = $.extend({mian:".container ul"} , typeof opts == "object" ? opts : {} );
        // opts = {main : "hello"}
        // $.extend({main:".container ul"},opts);
        // 列表结构;
        gouwu.getItem();
        console.log("gggg")
        this.main = $(".jia1 button");
        console.log(this.main);
        // console.log(this.main);
        // console.log($(".jia"));
        // 购物车图标;
        this.shopCarIcon = $(".shopCar").children();
        // 购物车商品展示容器;
        this.goodsList = $(".goods-list");
        // 商品数量容器;
        this.showNumEle = $(".shopCar").find(".header-right-span2");
        this.json = res.subjects;
        //  this.loadJson()
        //  .then(function(res){
        //      // console.log(res,this);
        //      // 数据加载成功

        //      //console.log(this.json);
        //      // this.renderPage();
        //  })
        console.log("m");
        this.bindEvent();
        this.showNum();
    },
    //  loadJson:function(){
    //      var opt = {
    //          url:"http://localhost/1814phnow/project/douban.json",
    //          data:{start:0 , count:20},
    //          context:this
    //      };
    //      return $.ajax(opt);
    //  },
    // renderPage:function(){
    //     var html = "";
    //     for(var i = 0 ; i < this.json.length ; i++){
    //         html += `<li>
    //                     <img src="${this.json[i].images.small}" alt="">
    //                     <h3>${this.json[i].title}</h3>
    //                     <button data-id="${this.json[i].id}">加入购物车</button>
    //                 </li> `;
    //     }
    //     this.main.html(html);
    // },
    bindEvent: function () {
        console.log("bind");
        this.main.on("click", this.addCar.bind(this));
        // 查看;
        // 隐藏;
        // 清空购物车;
        this.shopCarIcon.on("mouseenter", this.showCar.bind(this))
        this.shopCarIcon.on("mouseleave", this.hideCar.bind(this))
        this.shopCarIcon.on("click", this.clearCar.bind(this))
    },
    addCar: function (event) {
        console.log("加入购物车")
        var target = event.target;
        // 当前商品的id;
        var goodsId = $(target).attr("data-id");
        // 把商品存入cookie之中;
        // $.cookie("shopCar",goodsId);
        // 以数组的规则去创建字符串;
        //  逻辑 ; 创建数组结构; => 购物车内容为空的时候;
        //       操作结构的增删改查 => 购物车内容不为空的时候;
        var cookie;
        if (!(cookie = $.cookie("shopCar")) || cookie == "[]") {
            // 建立结构;
            $.cookie("shopCar", `[{"id":${goodsId},"num":1}]`);
            this.showNum();
            return 0;
        }
        // 数据添加;
        var cookieArray = JSON.parse(cookie);

        // 当前商品是否存在;
        var flag = false;
        // 判定是否存在当前商品;
        for (var i = 0; i < cookieArray.length; i++) {
            if (cookieArray[i].id == goodsId) {
                // 当前商品存在;
                flag = true;
                cookieArray[i].num++;
            }
        }
        if (flag == false) {
            // 创建商品cookie
            cookieArray.push({
                id: goodsId,
                num: 1
            });
        }
        // 操作之后的数组转换成字符串放入cookie之中;
        $.cookie("shopCar", JSON.stringify(cookieArray));
        // console.log($.cookie("shopCar"));
        this.showNum();
    },
    showCar: function () {
        console.log(1);
        // 如果为空不渲染;
        var cookie;
        if (!(cookie = $.cookie("shopCar"))) {
            return 0;
        }
        var cookieArray = JSON.parse(cookie);
        var html = "";
        for (var i = 0; i < cookieArray.length; i++) {
            // console.log(cookieArray[i]);
            var item = this.getItem(cookieArray[i].id);
            html += `<li>
                        <img src="${item.images.small}" alt="">
                        <h3>${item.title}</h3>
                        <strong>${cookieArray[i].num}</strong>
                    </li>`;
        }
        this.goodsList.html(html);

    },
    getItem: function (id) {
        // 根据id在this.json之中查找数据的
        for (var i = 0; i < this.json.length; i++) {
            if (this.json[i].id == id) {
                return this.json[i];
            }
        }
    },
    hideCar: function () {
        this.goodsList.children().remove();
    },
    clearCar: function () {
        var flag = confirm("是否清空购物车?");
        if (flag) {
            $.cookie("shopCar", "");
            this.hideCar();
        }
        this.showNum()
    },
    showNum: function () {
        // 如果为空不计算;
        var cookie;
        if (!(cookie = $.cookie("shopCar"))) {
            this.showNumEle.html(0)
            return 0;
        }
        var cookieArray = JSON.parse($.cookie("shopCar"));
        var sum = 0;
        for (var i = 0; i < cookieArray.length; i++) {
            sum += Number(cookieArray[i].num);
        }

        console.log(sum);
        this.showNumEle.html(sum);
    }
})