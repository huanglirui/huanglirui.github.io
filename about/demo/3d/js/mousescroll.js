define('mousescroll', [], function (require, exports, module) {

  function mouseScroll (obj, upfn, downfn) {
    if(obj.attachEvent){
      obj.attachEvent("onmousewheel", scrollFn);  //IE opera
    } else if (obj.addEventListener){
      obj.addEventListener("mousewheel", scrollFn, false);  //chrome,safari
      obj.addEventListener("DOMMouseScroll", scrollFn, false);  //firefox
    }
    function scrollFn (e) {
      var ev = e || window.event,
          num = ev.detail || ev.wheelDelta
          ;
      if( num == 120 || num == -3){
        if(upfn){
          upfn.call(obj)
        }
      } else if( num == -120 || num == 3){
        if(downfn){
          downfn.call(obj)
        }
      }
      if (ev.preventDefault ) {
        ev.preventDefault(); 
      }else{
        //IE
        ev.returnValue = false; 
      }
    }
  }

  exports.mouseScroll = mouseScroll;

});


