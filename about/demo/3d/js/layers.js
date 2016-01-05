define('layers' , [], function (require, exports, module) {
  //1.算出字符串可以把圆分成多少层 
  function getCircleLayer (str) {
    var len = str.length,
        layerNum = 0,
        sum = 0 
    ;
    for (var i=4; i<=13; i++) {
      sum = i * i + (i + 1) * (i + 1);
      if ( sum >= len ) {
        layerNum = i - 1;
        break;
      }
      layerNum = i - 1;
    }
    return layerNum * 2 + 1;
  };
  //2.算出圆的每一层li的个数
  function getArrCircleLayer (layerNum) {
    var num = -1,
        arr = []
        ;
    for (var i=0; i<layerNum; i++) {
      if ( i < (layerNum + 1) / 2 ) {
        num += 2;
      } else {
        num -=2;
      }
      arr.push(num);
    }
    return arr;
  }
  //3.根据li的个数，得到圆锥每一层的个数
  function getArrConeLayer (aLi) {
    var len = aLi.length,
        coneSum = 0,
        arr = []
        ;
    for (var i=1; i<=len; i++) {
      coneSum += 2 * i - 1;
      if ( coneSum > len ) {
        coneSum -= 2 * i - 1;
        break;
      }
      arr.push(2 * i - 1);
    }
    return arr;
  };

  exports.getCircleLayer = getCircleLayer;
  exports.getArrCircleLayer = getArrCircleLayer;
  exports.getArrConeLayer = getArrConeLayer;
});