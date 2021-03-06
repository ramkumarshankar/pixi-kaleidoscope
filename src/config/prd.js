// Kaleidoscope settings
// Used in Dat.gui for control

var config = {
  bGui: true,
  speed: 0.5,
  reverse: false,
  animate: true,
  offsetScale: 0.5, // safe values are between 0.20 and 0.80
  slices: 6,
  images: JSON.parse(localStorage.getItem('presetImages'))
}

module.exports = config;