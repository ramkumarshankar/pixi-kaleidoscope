var PIXI = require('pixi.js');

var Kaleidoscope = function (pixiApp, config) {
    var self = this;

    self.app = pixiApp;

    self.HALF_PI = Math.PI / 2;
    self.TWO_PI = Math.PI * 2;

    self.radius = Math.round(Math.sqrt ( (Math.pow(self.app.view.width/window.devicePixelRatio, 2) + Math.pow(self.app.view.height/window.devicePixelRatio, 2) ) / 2  ) );

    self.sliceContainer = new PIXI.Container();
    self.textureContainer = new PIXI.Container();

    self.texture = null;

    // These variables can be varied by the user
    self.slices = config.slices;
    self.speed = config.speed;
    self.reverse = config.reverse;
    self.animate = config.animate;
    self.targetOffset = config.offsetScale;

    self.setup = function() {
        self.radius = Math.round(Math.sqrt ( (Math.pow(self.app.view.width/window.devicePixelRatio, 2) + Math.pow(self.app.view.height/window.devicePixelRatio, 2) ) / 2  ) );

        self.app.stage.addChild(self.sliceContainer);
        self.app.stage.addChild(self.textureContainer);

        self.setupSlices(self.slices);

    }

    self.update = function(delta) {

        if (!self.animate) {
            return;
        }

        var sliceImages = self.textureContainer.children;

        for (var i = 0; i < sliceImages.length; i++) {

            if (self.reverse) {
                sliceImages[i].tilePosition.y += self.speed;
            }
            else {
                sliceImages[i].tilePosition.y -= self.speed;
            }

            if (sliceImages[i].anchor.x !== self.targetOffset) {
                sliceImages[i].anchor.x += (self.targetOffset - sliceImages[i].anchor.x) * 0.1;
                if (Math.abs(sliceImages[i].anchor.x - self.targetOffset) < 0.001) {
                    sliceImages[i].anchor.x = self.targetOffset;
                }
            }
        }
    };

    self.setOffset = function (_offset) {
        self.targetOffset = _offset;
    };

    self.setupSlices = function () {

        self.sliceContainer.removeChildren();
        self.textureContainer.removeChildren();
        var step = self.TWO_PI / self.slices;

        var currentRotation = 0;

        for (var i = 0; i < self.slices; i++) {
            
            currentRotation = i*step;
 
            var slice = new PIXI.Graphics();

            // Setup shape
            slice.beginFill(0);
            slice.moveTo(0, 0);
            slice.arc(0, 0, self.radius, i*step + (step * -0.51), i*step + step * 0.51); // cx, cy, radius, startAngle, endAngle\
            slice.closePath();
            slice.position = {x: self.app.renderer.width/(window.devicePixelRatio * 2), y: self.app.renderer.height/(window.devicePixelRatio * 2)};

            slice.endFill();
            self.sliceContainer.addChild(slice);

            // Setup texture
            var texture = new PIXI.extras.TilingSprite(self.texture, 3*self.texture.width, 3*self.texture.height);
            texture.anchor.x = 0.5;
            texture.anchor.y = 0.5;
            texture.position = {x: self.app.renderer.width/(window.devicePixelRatio * 2), y: self.app.renderer.height/(window.devicePixelRatio * 2)};
            texture.rotation = self.HALF_PI;
            texture.rotation += currentRotation;
            
            texture.mask = slice;

            if (i % 2 === 0) {
                texture.anchor.x = 1;
                texture.anchor.y = 0.5;
                texture.scale.x *= -1;
            }

            texture.anchor.x = self.targetOffset;
            texture.anchor.y = self.targetOffset;

            self.textureContainer.addChild(texture);
        }
        
    }
}

module.exports = Kaleidoscope;