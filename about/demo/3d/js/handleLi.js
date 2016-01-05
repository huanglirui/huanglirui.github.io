define('handleLi', ['addAttr'], function (require, exports, module) {
  var addAttr = require('./addAttr.js')
      ;
  //创建li，默认展示的是球形    
  function createLi (str, r, arrCircleLayer) {
    var phi = 0,
        circleLayer = 0,
        count = 0,
        frag = document.createDocumentFragment(),
        theta = Math.PI/(arrCircleLayer.length - 1)
        ;
    for (var i=0,len1=arrCircleLayer.length; i<len1; i++) {
      var layer = arrCircleLayer[i]
          ;
      phi = 2 * Math.PI / layer;
      for (var j=0,len2=layer; j<len2; j++) {
        var li = document.createElement('li') 
            ;
        li.innerHTML = str[count++];
        addAttr.ball(li, r, theta, phi, i, j, arrCircleLayer.length);
        frag.appendChild(li);
      }
    }
    return frag;
  };

  function updateConeLi (aLi, r, arrConeLayer) {
    var len = arrConeLayer.length,
        count = 0,
        phi = 0,
        theta = Math.PI/(len - 1)
        ;
    for (var i=0; i<len; i++) {
      var layer = arrConeLayer[i];
      phi = 2 * Math.PI / layer;
      for (var j=0; j<layer; j++) {
        addAttr.cone(aLi[count++], phi, i, j, r, len);
      }
    }
  }

  function updateCylinderLi (aLi, r, circleLayers) { 
    var columnLayers = circleLayers - 2, //一共有多少层
        columnNum = Math.floor(aLi.length/columnLayers), // 每层的个数
        phi = 0,
        count = 0
        ;
    for (var i=0; i<columnLayers; i++) {
       phi = 2 * Math.PI / columnNum;
      for (var j=0; j<columnNum; j++) {
        addAttr.cylinder(aLi[count++], phi, i, j, r, columnLayers);
      }
    }    
  }

  function updateTcylinderLi (aLi, r, circleLayers) { 
    var columnLayers = circleLayers - 2, //一共有多少层
        columnNum = Math.floor(aLi.length/columnLayers), // 每层的个数
        phi = 0,
        count = 0
        ;
    for (var i=0; i<columnLayers; i++) {
       phi = 2 * Math.PI / columnNum;
      for (var j=0; j<columnNum; j++) {
        addAttr.tcylinder(aLi[count++], phi, i, j, r, columnLayers);
      }
    }    
  }


  function setLiCircle (aLi, big) {
    var len = aLi.length
        ;
    for (var i=0; i<len; i++) {
      aLi[i].style.display = 'block';
      if ( big !== 'big' ) {
        aLi[i].style.transform = 'translate3D('+aLi[i].circleX+'px, '+aLi[i].circleY+'px, '+aLi[i].circleZ+'px) rotateX('+aLi[i].circleTheta+'rad) rotateY('+aLi[i].circlePhi+'rad)';
      } else {
        aLi[i].style.transform = 'translate3D('+aLi[i].bigCircleX+'px, '+aLi[i].bigCircleY+'px, '+aLi[i].bigCircleZ+'px) rotateX('+aLi[i].circleTheta+'rad) rotateY('+aLi[i].circlePhi+'rad)';
      }
    }
  };

  function setLiCone (aLi, big) {
    var len = aLi.length
        ;
    //把未用到的li隐藏    
    for (var i=0; i<len; i++) {
      aLi[i].style.display = 'none';
    }
    for (var i=0,len=aLi.length; i<len; i++) {
      if ( !aLi[i].coneX || !aLi[i].bigConeX ) {
        return;
      }
      aLi[i].style.display = 'block';
      if ( big !== 'big' ) {
        aLi[i].style.transform = 'translate3D('+aLi[i].coneX+'px, '+aLi[i].coneY+'px, '+aLi[i].coneZ+'px) rotateX('+aLi[i].coneTheta+'rad) rotateY('+aLi[i].conePhi+'rad)';
      } else {
        aLi[i].style.transform = 'translate3D('+aLi[i].bigConeX+'px, '+aLi[i].bigConeY+'px, '+aLi[i].bigConeZ+'px) rotateX('+aLi[i].coneTheta+'rad) rotateY('+aLi[i].conePhi+'rad)';
      }
    }
  };

  function setLiCylinder (aLi, big) {
    var len = aLi.length
        ;
    //把未用到的li隐藏    
    for (var i=0; i<len; i++) {
      aLi[i].style.display = 'none';
    }
    for (var i=0,len=aLi.length; i<len; i++) {
      if ( !aLi[i].cylinderX || !aLi[i].bigCylinderX ) {
        return;
      }
      aLi[i].style.display = 'block';
      if ( big !== 'big' ) {
        aLi[i].style.transform = 'translate3D('+aLi[i].cylinderX+'px, '+aLi[i].cylinderY+'px, '+aLi[i].cylinderZ+'px) rotateX(0deg) rotateY('+aLi[i].cylinderPhi+'rad)';
      } else {
        aLi[i].style.transform = 'translate3D('+aLi[i].bigCylinderX+'px, '+aLi[i].bigCylinderY+'px, '+aLi[i].bigCylinderZ+'px) rotateX(0deg) rotateY('+aLi[i].cylinderPhi+'rad)';
      }
    }
  };


  function setLiTcylinder (aLi, big) {
    var len = aLi.length
        ;
    //把未用到的li隐藏    
    for (var i=0; i<len; i++) {
      aLi[i].style.display = 'none';
    }
    for (var i=0,len=aLi.length; i<len; i++) {
      if ( !aLi[i].tcylinderX || !aLi[i].bigTcylinderX ) {
        return;
      }
      aLi[i].style.display = 'block';
      if ( big !== 'big' ) {
        aLi[i].style.transform = 'translate3D('+aLi[i].tcylinderX+'px, '+aLi[i].tcylinderY+'px, '+aLi[i].tcylinderZ+'px) rotateX(0deg) rotateY('+aLi[i].tcylinderPhi+'rad)';
      } else {
        aLi[i].style.transform = 'translate3D('+aLi[i].bigTcylinderX+'px, '+aLi[i].bigTcylinderY+'px, '+aLi[i].bigTcylinderZ+'px) rotateX(0deg) rotateY('+aLi[i].tcylinderPhi+'rad)';
      }
    }
  };



  exports.createLi = createLi;
  exports.updateConeLi = updateConeLi;
  exports.updateCylinderLi = updateCylinderLi;
  exports.updateTcylinderLi = updateTcylinderLi;

  exports.setLiCircle = setLiCircle;
  exports.setLiCone = setLiCone;
  exports.setLiCylinder = setLiCylinder;
  exports.setLiTcylinder = setLiTcylinder;

});