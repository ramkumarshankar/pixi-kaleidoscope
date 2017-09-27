var PIXI = require('pixi.js');

var Kaleidoscope = function (pixiApp) {
    var self = this;

    self.app = pixiApp;

    self.HALF_PI = Math.PI / 2;
    self.TWO_PI = Math.PI * 2;

    self.sprites = [];
    self.pieces = [];
    self.arcs = [];

    self.parentElement = null;

    self.texture = null;
    self.tilingSprite = null;

    self.sliceContainer = new PIXI.Container();
    self.textureContainer = new PIXI.Container();

    self.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    self.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    self.variables = {
        offsetRotation: 0.0,
        offsetScale: 0.8,
        offsetX: 0.0,
        offsetY: 0.0,
        radius: 500, // TO BE CHANGED
        // radius: Math.round(Math.sqrt( (self.viewportWidth* self.viewportWidth) + (self.viewportHeight * self.viewportHeight) ) / 2),
        slices: 20,
        zoom: 1.0
    };

    self.setParent = function(element) {
        self.parentElement = element;
    };

    self.setup = function() {

        self.app.stage.addChild(self.sliceContainer);
        self.app.stage.addChild(self.textureContainer);

        self.sliceContainer.removeChildren();
        self.textureContainer.removeChildren();
        var step = self.TWO_PI / self.variables.slices;

        var currentRotation = 0;

        for (var i = 0; i < self.variables.slices; i++) {
            
            currentRotation = i*step;
 
            var slice = new PIXI.Graphics();

            // Setup shape
            slice.beginFill(0);
            slice.lineStyle(2, 0xffffff);
            // slice.position = {x: window.innerWidth/2, y: window.innerHeight/2};
            slice.moveTo(0, 0);
            slice.arc(0, 0, self.variables.radius, i*step + (step * -0.51), i*step + step * 0.51); // cx, cy, radius, startAngle, endAngle\
            slice.closePath();
            slice.position = {x: window.innerWidth/2, y: window.innerHeight/2};

            slice.endFill();
            self.sliceContainer.addChild(slice);

            // console.log(slice.getBounds());

            // Setup texture
            var texture = new PIXI.extras.TilingSprite(self.texture, 1920, 1080);
            texture.anchor.x = 0.5;
            texture.anchor.y = 0.5;
            texture.position = {x: window.innerWidth/2, y: window.innerHeight/2};
            texture.rotation = self.HALF_PI;
            texture.rotation += currentRotation;
            
            texture.mask = slice;

            if (i % 2 === 0) {
                texture.anchor.x = 1;
                texture.anchor.y = 0.5;
                texture.scale.x *= -1;
                texture.anchor.x = 0.5;
                texture.anchor.y = 0.5;
            }
            // Use anchor.x setting for offset config
            texture.anchor.x = 0.80; // safe values are between 0.20 and 0.80
            texture.anchor.y = 0.5;


            self.textureContainer.addChild(texture);
        }

    }

    self.update = function(delta) {
        var sliceImages = self.textureContainer.children;
        var speed = 0.5;

        for (var i = 0; i < sliceImages.length; i++) {

            sliceImages[i].tilePosition.y += speed;
                
        }
    };
}

module.exports = Kaleidoscope;