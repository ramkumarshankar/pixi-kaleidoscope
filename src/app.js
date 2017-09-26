let PIXI = require('pixi.js');
let Stats = require('stats.js');
let Kaleidoscope = require('./kaleidoscope');

var type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
    type = "canvas"
}
PIXI.utils.sayHello(type)

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

var canvas = document.getElementById('kaleidoscope');
canvas.width = canvas.clientWidth;
canvas.height = canvas.clientHeight;


var app = new PIXI.Application({
  autostart: true, 
  width: canvas.width, 
  height: canvas.height,
  view: canvas});

var kal = new Kaleidoscope(app);

//create a texture
kal.texture = PIXI.Texture.fromImage("./assets/bg--main-bertrand.jpg");
// var texture = PIXI.Texture.fromImage("./assets/bg--main-bertrand.jpg");
var tilingSprite = new PIXI.extras.TilingSprite(kal.texture, 2000, 2000);
kal.app.stage.addChild(tilingSprite);

//create a polygon
var graphics = new PIXI.Graphics();
graphics.beginFill(0);
graphics.moveTo(50,50);
graphics.lineTo(300,140);
graphics.lineTo(220, 320);
graphics.lineTo(80, 110);
graphics.lineTo(50,50);
graphics.endFill();
// stage.addChild(graphics);

  var semicircle = new PIXI.Graphics();
  semicircle.beginFill(0);
//   semicircle.lineStyle(2, 0xffffff);
  semicircle.arc(0, 0, 500, 0, 2*Math.PI); // cx, cy, radius, startAngle, endAngle
  semicircle.position = {x: window.innerWidth/2, y: window.innerHeight/2};
  semicircle.endFill();
  kal.app.stage.addChild(semicircle);

//mask the texture with the polygon
tilingSprite.mask = semicircle;

kal.app.ticker.add(update);

// // update();
function update(delta)
{    
    // requestAnimationFrame( update );
    // semicircle.x += 1;
    stats.begin();
    // app.renderer.render(app.stage);
    stats.end();
}