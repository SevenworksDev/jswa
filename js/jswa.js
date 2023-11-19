/*
    jswa v1.0 - https://github.com/SevenworksDev/jswa
    Created by https://sevenworks.eu.org
*/

var jswa = jswa || {};

jswa.windows = {};

jswa.create = function (name, x, y, width, height) {
  var jswaWindow = window.open('', name, `width=${width},height=${height},left=${x},top=${y}`);
  
  jswa.windows[name] = {
    windowRef: jswaWindow,
    x: x,
    y: y,
    width: width,
    height: height,
    title: ''
  };
};

jswa.move = function (name, x, y, duration) {
  var JSWA = jswa.windows[name];
  if (JSWA) {
    var startX = JSWA.x;
    var startY = JSWA.y;
    var deltaX = x - startX;
    var deltaY = y - startY;
    var startTime = null;

    function animate(time) {
        if (!startTime) startTime = time;
        var progress = (time - startTime) / duration;
        if (progress < 1) {
        var newX = startX + deltaX * progress;
        var newY = startY + deltaY * progress;
        JSWA.windowRef.moveTo(newX, newY);
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
    
    JSWA.x = x;
    JSWA.y = y;
  }
};

jswa.resize = function (name, width, height) {
  var JSWA = jswa.windows[name];
  if (JSWA) {
    JSWA.windowRef.resizeTo(width, height);
    JSWA.width = width;
    JSWA.height = height;
  }
};

jswa.write = function (name, content) {
  var JSWA = jswa.windows[name];
  if (JSWA) {
    JSWA.windowRef.document.body.innerHTML = content;
  }
};

jswa.title = function (name, newTitle) {
  var JSWA = jswa.windows[name];
  if (JSWA) {
    JSWA.windowRef.document.title = newTitle;
    JSWA.title = newTitle;
  }
};

jswa.close = function (name) {
  var JSWA = jswa.windows[name];
  if (JSWA) {
    JSWA.windowRef.close();
    delete jswa.windows[name];
  }
};
