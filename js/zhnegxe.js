$("#name").blur(function(){
    var res=/^[1][3,4,5,7,8][0-9]{9}$/;
    var sname=this.value;
    console.log(sname)
    console.log($("#name"));
    // console.log($(".name-em"));
    if(res.test(sname)){
        // console.log(1);
        for(i=0;i<($(".name-em").length);i++){
            console.log( $(".name-em")[i]);
            $(".name-em")[i].style.display="none";
        }
        
        
    }
    else{
        for(i=0;i<($(".name-em").length);i++){
            console.log( $(".name-em")[i]);
            $(".name-em")[i].style.display="block";
        }
    }
})

$("#yan").blur(function(){
    var res=/^[0-9]{6}$/;
    var syan=this.value;
    if(res.test(syan)){
        // console.log(1);
        for(i=0;i<($(".yan-em").length);i++){
            console.log( $(".yan-em")[i]);
            $(".yan-em")[i].style.display="none";
        }
        
        
    }
    else{
        for(i=0;i<($(".yan-em").length);i++){
            console.log( $(".yan-em")[i]);
            $(".yan-em")[i].style.display="block";
        }
    }
})


$("#password").blur(function(){
    var regUserName = /^[\u4e00-\u9fa5a-zA-Z0-9\-_]{6,20}$/;

    var spass=this.value;
    if(regUserName.test(spass)){
        // console.log(1);
        for(i=0;i<($(".password-em").length);i++){
            console.log( $(".password-em")[i]);
            $(".password-em")[i].style.display="none";
        }
        
        
    }
    else{
        for(i=0;i<($(".password-em").length);i++){
            console.log( $(".password-em")[i]);
            $(".password-em")[i].style.display="block";
        }
    }
})

$("#respass").blur(function(){
    var sres=this.value;
    var spass1=$("#password")[0].value;
    if(sres==spass1){
        for(i=0;i<($(".respass-em").length);i++){
            console.log( $(".respass-em")[i]);
            $(".respass-em")[i].style.display="none";
        }
    }
    else{
       for(i=0;i<($(".respass-em").length);i++){
            console.log( $(".respass-em")[i]);
            $(".respass-em")[i].style.display="block";
        }
    }
})




