var PIXI = require('pixi.js');
var Stats = require('stats.js');
var config = require('./config/default');
var Kaleidoscope = require('./kaleidoscope');

var type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type)

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

var kal = null;

init();

function init() {
  var canvas = document.getElementById('kaleidoscope');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  var app = new PIXI.Application({
    autostart: true, 
    width: canvas.width, 
    height: canvas.height,
    view: canvas});
  
  kal = new Kaleidoscope(app);

  //create a texture
  // kal.texture = PIXI.Texture.fromImage("./assets/kal-test.png");
  kal.texture = PIXI.Texture.fromImage("./assets/bg--alt-04.jpg");
  // kal.texture = PIXI.Texture.fromImage("./assets/bg--main-bertrand.jpg");
  kal.tilingSprite = new PIXI.extras.TilingSprite(kal.texture, 2000, 2000);

  kal.setup();

}

kal.app.ticker.add(update);

// // update();
function update(delta)
{
    stats.begin();
    kal.update(delta);
    stats.end();
}