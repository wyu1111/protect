
    
    var oSmall = document.getElementById("small");
      var oSmall_img=document.querySelector(".small-img");
    //   var oSmall_img=oSmall_img1.children[0];
      var oBig = document.getElementById("big");
      var oFrame = document.getElementById("frame");
      var oBig_img =document.querySelector(".big-img");
    //   var oBig_img=oBig_img1.children[0];
    //   console.log(oSmall_img1)
      oSmall.onmouseenter = function(){
              oBig.style.display = "block";
          oFrame.style.display = "block";
          // 让图片模糊;
        //   oSmall_img.style.opacity = "0.3";
     }
      oSmall.onmouseleave = function(){
              oBig.style.display = "none";
          oFrame.style.display = "none";
          oSmall_img.style.opacity = "1";
     }
      oSmall.onmousemove = function(event){
              var e = event || window.event;
          var nLeft = e.offsetX - size / 2;
          var nTop = e.offsetY - size / 2;
          if(nLeft <= 0){
                  nLeft = 0;
         }
          if(nTop <= 0){
                  nTop = 0;
         }
          var maxLeft = oSmall.offsetWidth - oFrame.offsetWidth;
          if(nLeft >= maxLeft){
                  nLeft = maxLeft
         }
          var maxTop = oSmall.offsetHeight - oFrame.offsetHeight;
          if(nTop >= maxTop){
                  nTop = maxTop;
         }
          oFrame.style.left = nLeft + "px";
          oFrame.style.top = nTop + "px";  
         //console.log(nLeft);
          // 计算比例;
          var propX = oBig.offsetWidth / oFrame.offsetWidth;
          // 根据比例算出位移值;
        //   console.log(propX)
        // console.log(-nLeft*propX)
          oBig_img.style.left = -nLeft * propX + "px";
          var propY = oBig.offsetHeight / oFrame.offsetHeight;
          oBig_img.style.top = -nTop * propY + "px";
          // 设置背景的位置;
        //   oFrame.style.backgroundPosition = `${-nLeft}px ${-nTop}px`
     }
      var size = 100;
      // 鼠标滚轮事件;
      if(document.addEventListener){
              document.addEventListener('DOMMouseScroll',handleEvent,false);
     }
      window.onmousewheel = document.onmousewheel = handleEvent;
      function handleEvent(event){
              var e = event || window.event;
          var flag = true 
          if(e.detail != 0 ){ 
                  if(e.detail > 0){
                      flag = false// 向下;
             }else{
                      flag = true; // 向上;
             }
         }else{
                  if(e.deltaY > 0){
                      flag = false// 向下;
             }else{
                      flag = true; // 向上;
             }
         }
          if(flag){
                  // 放大;
              size ++;
         }else{
                 // 缩小;
              size --;
         }
          oFrame.style.width =  size + "px";
          oFrame.style.height = size + "px";
          // 为什么要加上mousemove; ****;
          oSmall.onmousemove(e);
          // 大图和小图的比例计算;
          // 400 => big 的 宽高;
          var prop = 400 / size;
          // 根据比例缩放图片 ;
          oBig_img.style.width = 400 * prop + "px";
          oBig_img.style.height = 400 * prop + "px";
     }
