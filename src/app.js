// Libraries
var PIXI = require('pixi.js');
var Stats = require('stats.js');

// App requires
var config = require('./config/default');
var Kaleidoscope = require('./kaleidoscope');

var bGui = config.bGui;
var gui = null;

var loader = PIXI.loader
  .add(config.images[0])
  .load(init);

var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

function init() {
  console.log("first asset loaded");
  console.log("initialising kaleidoscope");
  var canvas = document.getElementById('kaleidoscope');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  var app = new PIXI.Application({
    autostart: true, 
    width: canvas.width, 
    height: canvas.height,
    view: canvas});
  
  kal = new Kaleidoscope(app);

  kal.texture = loader.resources[config.images[0]].texture;

  kal.setup();

  kal.app.ticker.add(update);

  if (bGui) {
    gui = new dat.GUI();
    setupGui();
  }

}

function update(delta) {
    stats.begin();
    kal.update(delta);
    stats.end();
}

function setupGui() {

  var nextButton = {
    nextImage: function() {
      kal.currentIndex++;
      if (kal.currentIndex >= config.images.length) {
        kal.currentIndex = 0;
      }
      try {
        // Try loading image
        loader = PIXI.loader
        .add(config.images[kal.currentIndex])
        .load(function () {
          kal.texture = loader.resources[config.images[kal.currentIndex]].texture;
          kal.setupSlices();
        });
      }
      catch (err) {
        // Already loaded, just update the kaleidoscope
        console.log('inside catch');
        console.log(err);
        kal.texture = loader.resources[config.images[kal.currentIndex]].texture;
        kal.setupSlices();
      }
    }
  }
  
  gui.add(config, 'slices').min(6).max(30).step(2).name('Slices').onChange(function(value) {
    config.slices = kal.slices = value;
    kal.setupSlices();
  });

  gui.add(config, 'speed', 0, 2).name('Speed').onChange(function(value) {
    config.speed = kal.speed = value;
  });

  gui.add(config, 'offsetScale', 0.2, 0.8).name('Offset').step(0.001).onChange(function(value) {
    config.speed = value;
    kal.setOffset(value);
  });

  gui.add(config, 'reverse').name('Reverse').onChange(function(value) {
    config.reverse = kal.reverse = value;
  });

  gui.add(config, 'animate').name('Animate').onChange(function(value) {
    config.animate = kal.animate = value;
  });

  gui.add(nextButton, 'nextImage').name('Next Image');

}