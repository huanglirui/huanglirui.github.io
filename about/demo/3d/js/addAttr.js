define('addAttr', [] , function (require, exports, module) { 
  //1.球的坐标
  function ball (obj, r, theta, phi, i, j, layers) {
    obj.circleX = r * Math.sin(theta * i) * Math.sin(phi * j) + 200;
    obj.circleY = -r * Math.cos(theta * i) + 200;
    obj.circleZ = r * Math.sin(theta * i) * Math.cos(phi * j);
    obj.circleTheta = theta * (layers - i) - Math.PI / 2;
    obj.circlePhi = phi * j;
    //大球的坐标，只增大半径
    obj.bigCircleX = (r + 2000) * Math.sin(theta * i) * Math.sin(phi * j) + 200;
    obj.bigCircleY = -(r + 2000) * Math.cos(theta * i) + 200;
    obj.bigCircleZ = (r + 2000) * Math.sin(theta * i) * Math.cos(phi * j);
  }
  //2.圆锥的坐标
  function cone (obj, phi, i, j, r, layers) {
    obj.coneX = (2 * r / layers) * i * Math.tan(Math.PI / 6) * Math.sin(phi * j) + 200; 
    obj.coneY = (2 * r / layers) * i;
    obj.coneZ = (2 * r / layers) * i * Math.tan(Math.PI / 6) * Math.cos(phi * j);
    obj.coneTheta = Math.PI / 6;
    obj.conePhi = phi * j;
    //大球的坐标，只增大半径
    obj.bigConeX = (2 * (r + 2000) / layers) * i * Math.tan(Math.PI / 6) * Math.sin(phi * j) + 200; 
    obj.bigConeY = (2 * (r + 2000) / layers) * i - 2000;
    obj.bigConeZ = (2 * (r + 2000) / layers) * i * Math.tan(Math.PI / 6) * Math.cos(phi * j);
  }
  //3.圆柱的坐标
  function cylinder (obj, phi, i, j, r, layers) {
    //r/1.5规定了圆柱的圆半径。
    obj.cylinderX = r / 1.5 * Math.sin(phi * j) + 200;
    //y坐标偏了50
    obj.cylinderY = (2 * r / layers) * i + 50;
    obj.cylinderZ = r / 1.5 * Math.cos(phi * j);
    obj.cylinderPhi = phi * j;
    //大球的坐标，只增大半径
    obj.bigCylinderX = (r + 2000) / 1.5 * Math.sin(phi * j) + 200;
    //50-2000是为了保持中心点依然在原来的位置
    obj.bigCylinderY = (2 * (r + 2000) / layers) * i + 50 - 2000;
    obj.bigCylinderZ = (r + 2000) / 1.5 * Math.cos(phi * j);
  }

    //4.扭曲圆柱的坐标
  function tcylinder (obj, phi, i, j, r, layers) {
    var num = 8 * Math.PI / 180 * i;
    //r/1.5规定了圆柱的圆半径。
    obj.tcylinderX = r / 1.5 * Math.sin(phi * j + num) + 200;
    //y坐标偏了50
    obj.tcylinderY = (2 * r / layers) * i + 50;
    obj.tcylinderZ = r / 1.5 * Math.cos(phi * j + num);
    obj.tcylinderPhi = phi * j + num;
    //大球的坐标，只增大半径
    obj.bigTcylinderX = (r + 2000) / 1.5 * Math.sin(phi * j + num) + 200;
    //50-2000是为了保持中心点依然在原来的位置
    obj.bigTcylinderY = (2 * (r + 2000) / layers) * i + 50 - 2000;
    obj.bigTcylinderZ = (r + 2000) / 1.5 * Math.cos(phi * j + num);
  }

  exports.ball = ball;
  exports.cone = cone;
  exports.cylinder = cylinder;
  exports.tcylinder = tcylinder;
});