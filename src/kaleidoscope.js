var PIXI = require('pixi.js');

var Kaleidoscope = function (pixiApp) {
    var self = this;

    self.app = pixiApp;

    self.HALF_PI = Math.PI / 2;
    self.TWO_PI = Math.PI * 2;

    self.parentElement = null;

    self.texture = null;
    self.tilingSprite = null;

    self.sliceContainer = new PIXI.Container();
    self.textureContainer = new PIXI.Container();

    // self.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // self.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    self.variables = {
        offsetRotation: 0.0,
        offsetScale: 0.8,
        offsetX: 0.0,
        offsetY: 0.0,
        // radius: Math.round(Math.sqrt( (self.viewportWidth* self.viewportWidth) + (self.viewportHeight * self.viewportHeight) ) / 2),
        slices: 8,
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


        for (var i = 0; i < self.variables.slices; i++) {
            var slice = new PIXI.Graphics();

            // Setup shape
            slice.beginFill(0);
            slice.lineStyle(2, 0xffffff);
            slice.position = {x: window.innerWidth/2, y: window.innerHeight/2};
            slice.moveTo(0, 0);
            slice.arc(0, 0, 500, i*step, i*step + step); // cx, cy, radius, startAngle, endAngle\

            slice.endFill();
            self.sliceContainer.addChild(slice);

            // Setup texture
            var texture = new PIXI.extras.TilingSprite(self.texture, 2000, 2000);
            texture.position = {x: window.innerWidth/2, y: window.innerHeight/2};
            texture.anchor.x = 0;
            texture.anchor.y = 0;
            texture.mask = slice;
            texture.rotation = i*step;

            if (i % 2 !== 0) {
                texture.anchor.x = 0;
                texture.anchor.y = 1;
                // texture.scale.x *= -1;
                texture.scale.y *= -1;
                // texture.position
            }

            self.textureContainer.addChild(texture);
        }
    }

    self.update = function(delta) {
        var sliceImages = self.textureContainer.children;
        for (var i = 0; i < sliceImages.length; i++) {
            // sliceImages[i].x += 0.1;
        }
    };
}

module.exports = Kaleidoscope;