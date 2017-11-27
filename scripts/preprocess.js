var pp = require('preprocess');
var path = require('path');
var NODE_ENV = process.env.NODE_ENV;

pp.preprocessFileSync(path.join(__dirname, "../src/app.js"), path.join(__dirname, "../src/app-out.js"), process.env);