var Kaleidoscope = function () {
    var self = this;

    self.HALF_PI = Math.PI / 2;
    self.TWO_PI = Math.PI * 2;

    self.parentElement = null;

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
}

module.exports = Kaleidoscope;