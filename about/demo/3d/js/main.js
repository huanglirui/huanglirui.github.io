
define('main', ['layers', 'handleLi', 'mousescroll'], function(require, exports, module){
  
  var r = 150,
      handleLi = require('./handleLi.js'),
      layers = require('./layers.js'),
      mousescroll = require('./mousescroll.js').mouseScroll,
      str = 'qwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnmqwertyuioplkjhgfdsazxcvbnm'
      ;
  window.onload = function () {
    var scene = document.getElementsByClassName('scene')[0],
        sCon = scene.getElementsByClassName('s-con')[0],
        sTxt = scene.getElementsByClassName('s-txt')[0],
        txt = sTxt.getElementsByClassName('txt')[0],
        sTxtClose = sTxt.getElementsByClassName('close')[0],
        sUl = sCon.getElementsByClassName('words')[0],
        aLi = sUl.getElementsByTagName('li'),
        buttons = document.getElementsByClassName('buttons')[0],
        bShape = buttons.getElementsByClassName('b-shape')[0],
        bToggle = buttons.getElementsByClassName('b-toggle')[0],
        open = bToggle.getElementsByClassName('open')[0],
        define = bToggle.getElementsByClassName('define')[0],
        model = document.getElementsByClassName('model')[0],
        modelClose = model.getElementsByClassName('m-close')[0],
        textarea = model.getElementsByClassName('textarea')[0],
        submit = model.getElementsByClassName('submit')[0],
        reset = model.getElementsByClassName('reset')[0],
        curShape = 'ball', // 1.当前li所组成的形状
        prevShape = 'ball', // 2.上一次li所组成的形状
        timer = null,
        hasAlert = false; // 3.判断是否有弹出层
        ;

    init(str, r, aLi);
    // 1.初始化li 
    function init (str, r) {
      // 1.算出球的总层数
      var arrCircleLayer = layers.getArrCircleLayer(layers.getCircleLayer(str));
      // 2.生成li，算出其在球上对对应的坐标，返回li的文档碎片
      sUl.appendChild( handleLi.createLi(str, r, arrCircleLayer) );
      // 3.把li对于的球坐标设置为li的transform属性
      handleLi.setLiCircle(aLi, r);
      // 4.在li上添加圆锥、圆柱、扭曲圆柱的坐标属性
      handleLi.updateConeLi(aLi, r, layers.getArrConeLayer(aLi));
      handleLi.updateCylinderLi(aLi, r, arrCircleLayer.length);
      handleLi.updateTcylinderLi(aLi, r, arrCircleLayer.length);
    }

    // 2.根据li的形状为li设置该形状的css3属性
    function setLiCss (shape, big) {
      switch (shape) {
        case 'ball':
          handleLi.setLiCircle(aLi, big);
          break;
        case 'cone':
          handleLi.setLiCone(aLi, big);
          break;
        case 'cylinder':
          handleLi.setLiCylinder(aLi, big);
          break;
        case 'tcylinder':
          handleLi.setLiTcylinder(aLi, big);
          break;
      }
    }
    // 3.当切换形状的时候触发（用的事件委托）
    bShape.onclick = function (e) {
      timer && clearTimeout(timer);
      sCon.style.transform = 'translateZ(0px)';
      var target = e.target
          ;
      if ( target.tagName === 'A' ) {

        curShape = target.dataset.shape;

        for (var i=0,len=aLi.length; i<len; i++) {
          aLi[i].className = 'all';
          aLi[i].style.opacity = 0;
        }
        setLiCss(prevShape, 'big');

        timer = setTimeout(function () { 

          for (var i = 0,len = aLi.length; i < len; i++) {
            aLi[i].className = '';
          };
          setLiCss(curShape, 'big');

          setTimeout(function () {
            for (var i = 0,len = aLi.length; i < len; i++) {
              aLi[i].className = 'one';
              aLi[i].style.opacity = 1;
            };
            setLiCss(curShape);

            prevShape = curShape;
          }, 50);

        }, 1050);
      }
      
    };
    // 4.展开成为文本平面的按钮
    open.onclick = function () {
      if ( hasAlert ) {
        return;
      }
      hasAlert = true;
      for (var i=0,len=aLi.length; i<len; i++) {
        aLi[i].className = 'all';
        aLi[i].style.opacity = 0;
      }
      setLiCss(prevShape, 'big');

      sTxt.style.display = 'block';
      setTimeout(function () {
        sTxt.style.opacity = 1;
        sTxt.style.transform = 'scale(1)';
        txt.innerHTML = str;
     }, 1050);
    };
    // 5.把展开的文本关闭的按钮
    sTxtClose.onclick = function () {
      sTxt.style.transform = 'rotateX(180deg)';
      sTxt.style.opacity = 0;
      setTimeout(function () {
        for (var i = 0,len = aLi.length; i < len; i++) {
          aLi[i].className = 'one';
          aLi[i].style.opacity = 1;
        };
        setLiCss(prevShape);
        sTxt.style.transform = 'rotateX(0deg)';
        sTxt.style.display = 'none';
        sTxt.style.transform = 'scale(2)';
        hasAlert = false;
      }, 550);
    };
    // 6.自定义文字的按钮
    define.onclick = function () {
      if ( hasAlert ) {
        return;
      }
      hasAlert = true;
      model.style.display = 'block';
      setTimeout(function () {
        model.style.transform = 'scale(1)';
        model.style.opacity = 1;
      }, 20);
    };
    // 7.自定义文字提交按钮
    submit.onclick = function () {
      if ( textarea.value.length < 50 ) {
        alert('too low');
        return ;
      } 
      str = textarea.value
      sUl.innerHTML = '';
      init(str, r);
      modelClose.onclick();
    };
    // 8.自定义文字重置按钮
    reset.onclick = function () {
      textarea.value = '';
    };

    // 9.自定义文字模态框关闭的按钮
    modelClose.onclick = function () {
      model.style.opacity = 0;
      model.style.display = 'none';
      model.style.transform = 'scale(0.5)';
      model.style.display = 'none';
      hasAlert = false;
    };
    // 10.整个场景的转动
    var angleX = 0,
        angleY = 0,
        rotateTimer = null
        ;
    rotateTimer = setInterval(function () {
      angleY ++;
      sUl.style.transform = 'rotateY('+angleY+'deg)'
    }, 60);
    // 11.鼠标拖拽转动
    scene.onmousedown = function (e) {
      rotateTimer && clearInterval(rotateTimer);
      var clickX = 0,
          clickY = 0,
          disX = 0,
          disY = 0
          ;
      clickX = e.clientX ;
      clickY = e.clientY;    
      document.onmousemove = move;
      document.onmouseup = up;

      function move (e) {
        disX = e.clientX - clickX;
        disY = e.clientY - clickY;
        sUl.style.transform = 'rotateX('+(angleX-disY)+'deg) rotateY('+(angleY+disX)+'deg)';
      }

      function up () {
        document.onmousemove = null;
        document.onmouseup = null;
        if ( disX == 0 && disY == 0 ) {
          disY = 200;
        }
        rotateTimer = setInterval(function () {
          angleX -= disX/100;
          angleY += disY/100;
          sUl.style.transform = 'rotateX('+angleX+'deg) rotateY('+angleY+'deg)'
        }, 60);
      }
      return false;
    }
    // 12.鼠标滚轮滚动放大图形
    //mousescroll (sCon, upfn, downfn)
    var startZ = 0;
    mousescroll (sCon, function () {
      startZ += 20;
    sCon.style.transform = 'translateZ('+startZ+'px)';
    }, function () {
      startZ -= 20;
      sCon.style.transform = 'translateZ('+startZ+'px)';
    });

  };
});