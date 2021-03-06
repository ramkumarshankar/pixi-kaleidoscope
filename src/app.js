// Libraries
var PIXI = require('pixi.js');

// @if NODE_ENV='production'
var config = require('./config/prd');
// @endif

// @if NODE_ENV='development'
var Stats = require('stats.js');
var config = require('./config/default');
// @endif

if (localStorage.getItem('k_config') != null) {
  config = JSON.parse(localStorage.getItem('k_config'));
}

// App requires
var Kaleidoscope = require('./kaleidoscope');

var bGui = config.bGui;
var gui = null;

var loader = PIXI.loader
  .add(config.images[0])
  .load(init);

// @if NODE_ENV='development'
var stats = new Stats();
stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );
// @endif

function init() {
  var canvas = document.getElementById('kaleidoscope');
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;

  var app = new PIXI.Application({
    autostart: true, 
    width: canvas.width, 
    height: canvas.height,
    view: canvas,
    resolution: window.devicePixelRatio });
  
  kal = new Kaleidoscope(app, config);

  kal.texture = loader.resources[config.images[0]].texture;

  kal.setup();

  kal.app.ticker.add(update);

  if (bGui) {
    gui = new dat.GUI({autoPlace: false});
    var guiContainer = document.getElementById('gui');
    guiContainer.appendChild(gui.domElement);
    setupGui();
  }

  resize();

}

function update(delta) {
    // @if NODE_ENV='development'
    stats.begin();
    // @endif

    kal.update(delta);
    
    // @if NODE_ENV='development'
    stats.end();
    // @endif
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
        kal.texture = loader.resources[config.images[kal.currentIndex]].texture;
        kal.setupSlices();
      }
    }
  }
  
  gui.add(config, 'slices').min(6).max(30).step(2).name('Slices').onChange(function(value) {
    config.slices = kal.slices = value;
    localStorage.setItem('k_config', JSON.stringify(config));
    kal.setupSlices();
  });

  gui.add(config, 'speed', 0, 2).name('Speed').onChange(function(value) {
    config.speed = kal.speed = value;
    localStorage.setItem('k_config', JSON.stringify(config));
  });

  gui.add(config, 'offsetScale', 0.2, 0.8).name('Offset').step(0.001).onChange(function(value) {
    config.offsetScale = value;
    localStorage.setItem('k_config', JSON.stringify(config));
    kal.setOffset(value);
  });

  gui.add(config, 'reverse').name('Reverse').onChange(function(value) {
    config.reverse = kal.reverse = value;
    localStorage.setItem('k_config', JSON.stringify(config));
  });

  gui.add(config, 'animate').name('Animate').onChange(function(value) {
    config.animate = kal.animate = value;
    localStorage.setItem('k_config', JSON.stringify(config));
  });

  gui.add(nextButton, 'nextImage').name('Next Image');

}

window.onresize = function (event){
  resize();
}

function resize() {
  var w = window.innerWidth;
  var h = window.innerHeight;
  var c = document.getElementById('kaleidoscope');
  c.style.width = w +'px';
  c.style.height = h +'px';
  if(kal) {
      kal.app.renderer.resize(w,h);
      kal.setupSlices();
  }
}