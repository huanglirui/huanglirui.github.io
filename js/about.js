;(function () {
  //选择器简单实现
  var $ = function (selector) {
    var firstLetter = selector.charAt(0);
    switch (firstLetter) {
      case '#': 
          return document.querySelector(selector);
      case '.':
          return document.querySelector(selector);
      default: 
          return document.querySelectorAll(selector);
    }
  };
//鼠标滚轮事件
  var mouseScroll = function (obj,upfn,downfn) {
     if(obj.attachEvent){
        obj.attachEvent("onmousewheel",scrollFn);  
      }else if(obj.addEventListener){
        obj.addEventListener("mousewheel",scrollFn,false);  
        obj.addEventListener("DOMMouseScroll",scrollFn,false);  
      }
      function scrollFn (e) {
        var ev=e||window.event;
        var num=ev.detail||ev.wheelDelta;
        if(num==120||num==-3){
          if(upfn){
            upfn.call(obj)
          }
        }else if(num==-120||num==3){
          if(downfn){
            downfn.call(obj)
          } 
        }
        if (ev.preventDefault ) {
          ev.preventDefault(); 
        } else {
          ev.returnValue = false; 
        }  
      }
  };

 
  window.onload = function () {
    var rItems = $('.r-items'),
        rItemsLi = rItems.querySelectorAll('li'),
        rItemsUl = rItems.querySelector('ul'),
        rButtons = $('.r-buttons'),
        rButtonsLi = rButtons.querySelectorAll('li'),
        index = 0,
        moveFn = function () {
          for(var i=0,len=rButtonsLi.length; i<len; i++){
            rButtonsLi[i].className = '';
          }
          rButtonsLi[index].className = 'active';
          rItemsUl.style.top = (-index*100)+'%'; 
        };

    rButtons.addEventListener('click', function (e) {
      var li = e.target;
      index = li.dataset.id - 1;
      moveFn();
    }, false);

    mouseScroll(window, function () {
      index--;
      if (index < 0) {
        index = rButtonsLi.length - 1;
      }
      moveFn();
    }, function () {
      index++;
      if (index >= rButtonsLi.length) {
        index = 0;
      }
      moveFn();
    });

  };

})()