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

    // self.viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    // self.viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

    self.variables = {
        offsetRotation: 0.0,
        offsetScale: 0.8,
        offsetX: 0.0,
        offsetY: 0.0,
        radius: 500, // TO BE CHANGED
        // radius: Math.round(Math.sqrt( (self.viewportWidth* self.viewportWidth) + (self.viewportHeight * self.viewportHeight) ) / 2),
        slices: 8,
        zoom: 1.0
    };

    self.setParent = function(element) {
        self.parentElement = element;
    };

    self.setup = function() {

        // self.sprites = [];
        // self.pieces = [];
        // self.arcs = [];

        // self.app.stage.removeChildren();

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
            slice.arc(0, 0, self.variables.radius, i*step, i*step + step); // cx, cy, radius, startAngle, endAngle\

            slice.endFill();
            self.sliceContainer.addChild(slice);

            // Setup texture
            var texture = new PIXI.extras.TilingSprite(self.texture, 2048, 2048);
            texture.position = {x: window.innerWidth/2, y: window.innerHeight/2};
            texture.anchor.x = 0.5;
            texture.anchor.y = 0.5;
            texture.mask = slice;
            // texture.tileScale.x *= -1;
            // texture.rotation = i*step;
            // texture.rotation = (i*step + (i*step + step))/2;

            if (i ===0) {
                // texture.tileScale.y *= -1;
                // texture.tileScale.x *= -1;
                // texture.tileScale.y *= -1;
            }

            if (i % 2 !== 0) {
                texture.anchor.x = 0.5;
                texture.anchor.y = 0.5;
                // texture.rotation = self.TWO_PI - (i*step + (i*step + step))/2;
                // texture.tileScale.y *= -1;
                // console.log(texture.tileScale);
                // texture.tileScale.x *= -1;
                // texture.tileScale.y *= -1;
                // texture.scale.x *= -1;
                // texture.scale.y *= -1;
                // texture.position
            }

            self.textureContainer.addChild(texture);
        }
    }

    self.update = function(delta) {
        var sliceImages = self.textureContainer.children;
        var step = self.TWO_PI / self.variables.slices;

        for (var i = 0; i < sliceImages.length; i++) {
            // sliceImages[i].tilePosition.x += Math.cos((i*step + (i*step + step))/2) * 0.1;
            // sliceImages[i].tilePosition.y += Math.sin((i*step + (i*step + step))/2) * 0.1;

            // sliceImages[i].tilePosition.y += Math.sin(i*step) * 0.1;
            // sliceImages[i].tilePosition.x += 1;//Math.cos(sliceImages[i].rotation);
            // sliceImages[i].tilePosition.y += 1; //Math.sin(sliceImages[i].rotation);
            // sliceImages[i].rotation += 0.001;
            // console.log("index: " + i + ", x: " + sliceImages[i].x );
            // if (sliceImages[i].x < 200) {
            //     self.textureContainer.removeChildAt(i);
            //     var texture = new PIXI.extras.TilingSprite(self.texture, 2000, 2000);
            //     texture.position = {x: window.innerWidth/2, y: window.innerHeight/2};
            //     texture.anchor.x = 0.5;
            //     texture.anchor.y = 0.5;
            //     texture.mask = self.sliceContainer.getChildAt(i);
            //     texture.rotation = i*step;
            //     self.textureContainer.addChild(texture);
            // }
        }
        // self.context.translate(self.variables.offsetX - cx, self.variables.offsetY);
        // console.log(sliceImages[0].x);
    };
}

module.exports = Kaleidoscope;