// Libraries
var PIXI = require('pixi.js');
var Stats = require('stats.js');

// App requires
var config = require('./config/default');
var Kaleidoscope = require('./kaleidoscope');


var bGui = true;
var gui = null;

if (bGui) {
  gui = new dat.GUI();
  setupGui();
}


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

function update(delta)
{
    stats.begin();
    kal.update(delta);
    stats.end();
}

function setupGui() {
  gui.add(config, 'slices').min(6).step(2).name('Slices').onChange(function(value) {
    config.slices = value;
    console.log(config.slices);
  });

  gui.add(config, 'speed', 0, 2).name('Speed').onChange(function(value) {
    config.speed = kal.speed = value;
  });

  gui.add(config, 'offsetScale', 0.2, 0.8).name('Offset').onChange(function(value) {
    config.speed = value;
    kal.setOffset(value);
  });

  gui.add(config, 'reverse').name('Reverse').onChange(function(value) {
    config.reverse = kal.reverse = value;
  });

}