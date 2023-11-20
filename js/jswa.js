/*
    jswa v1.1 - https://github.com/SevenworksDev/jswa
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

jswa.get = function (fileURL) {
  fetch(fileURL)
    .then(response => response.text())
    .then(data => {
      const lines = data.split('\n');
      let lineNumber = 0;

      function processLine() {
        if (lineNumber < lines.length) {
          const line = lines[lineNumber].trim();
          lineNumber++;

          const [command, ...params] = line.split(' ');

          switch (command) {
            case 'create':
              jswa.create(params[0], parseFloat(params[1]), parseFloat(params[2]), parseFloat(params[3]), parseFloat(params[4]));
              processLine();
              break;
            case 'move':
              jswa.move(params[0], parseFloat(params[1]), parseFloat(params[2]), parseInt(params[3]));
              processLine();
              break;
            case 'resize':
              jswa.resize(params[0], parseFloat(params[1]), parseFloat(params[2]));
              processLine();
              break;
            case 'write':
              jswa.write(params[0], params.slice(1).join(' '));
              processLine();
              break;
            case 'title':
              jswa.title(params[0], params[1]);
              processLine();
              break;
            case 'close':
              jswa.close(params[0]);
              processLine();
              break;
            case 'sleep':
              const sleepDuration = parseInt(params[0]);
              setTimeout(() => processLine(), sleepDuration);
              break;
            default:
              console.error(`Unknown JSWA command: ${command}`);
              processLine();
          }
        }
      }

      processLine();
    })
    .catch(error => console.error('Error fetching JSWA file:', error));
};
