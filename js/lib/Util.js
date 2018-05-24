var Util = (function Util () {

  var _getRandomNumberBetween = function(min, max) {
    return Math.floor(Math.random()*(max-min+1)+min);
  };

  var _padNumber = function(n, p, c) {
    var pad_char = typeof c !== 'undefined' ? c : '0';
    var pad = new Array(1 + p).join(pad_char);
    return (pad + n).slice(-pad.length);
  };

  var _getPointOnCircle = function(x0, y0, r, rotation) {
    var x1 = x0 + r * Math.cos(this.degreesToRadians(rotation));
    var y1 = y0 + r * Math.sin(this.degreesToRadians(rotation));

    return {x: x1, y: y1 };
  };

  var _degreesToRadians = function(degrees) {
    return degrees * (Math.PI / 180);
  };

  var _radiansToDegrees = function(radians) {
    return radians * (180 / Math.PI);
  };

  var _createText = function(pos, size, text, color, fontSize, font) {
    return Crafty.e("2D, DOM, Text")
      .attr({ x: pos.x, y: pos.y, w: size.w, h: size.h })
      .text(text)
      .textColor(color)
      .textFont({ size: fontSize, family: font });
  };

  var _loadAssets = function(assetsObj) {
    var percentLoad = [];
    Crafty.load(assetsObj, // preload assets
      function() {
        console.log(percentLoad);
        var counter = -1;
        var interval = window.setInterval(function(){
          document.getElementsByClassName('loaderPercent')[0].innerHTML = " Loading Game: "+parseInt(percentLoad[++counter], 10);
          if(counter === percentLoad.length - 1){
            clearInterval(interval);
            Crafty.e("Delay").delay(function(){
              Crafty.scene("main");
            }, 1500);
          }
        }, 200);
      },
      function(o) { //progress
        // Update Array
        percentLoad.push(o.percent);
      },
      function(e) { //uh oh, error loading
        console.log(e);
      }
    );
  };

  var _getOptions = function(that) {
    return {
      maxParticles: 100,
      size: 2,
      speed: 2,
      lifeSpan: 30,
      angle: 360, // Calculated clockwise: 12pm is 0deg, 3pm is 90deg etc.
      angleRandom: 360,
      startColour: [255, 255, 255, 1],
      endColour: [255, 255, 255, 1],
      spread: 10, // Random spread from origin
      duration: 20,
      fastMode: false, // Will draw squares instead of circle gradients
      gravity: { x: 0, y: 0 },
      originOffset: {x: that.x, y: that.y}
    };
  };

  return {
    getRandomNumberBetween: _getRandomNumberBetween,
    padNumber: _padNumber,
    getPointOnCircle: _getPointOnCircle,
    degreesToRadians: _degreesToRadians,
    radiansToDegrees: _radiansToDegrees,
    createText: _createText,
    loadAssets: _loadAssets,
    getOptions: _getOptions
  }
})();
