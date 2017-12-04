# Kaleidoscope in WebGL

## Overview

This repo is the code for the kaleidoscope made with Pixi.js.

A node.js app.

## Setup

Clone this repo, change to the project directory and run 

`npm install`

## Structure

Key components:

- `/src` - Contains the source and configuration files for the animation. There are two configuraton files - `/src/config/default.js` is for dev, and `/src/config/prd.js` is used for the production build. The main difference in production config file is the image paths being passed in through `localStorage`, for integration with the Shopify store.

- `/assets` - Image assets used for the kaleidoscope. When you click on 'Next Image' in the kaleidoscope, these are the images the animation will cycle through.

## Development  

To run the local development environment run

`npm run dev`

This build will use the config values in `/src/config/default.js`. 

## Building for deployment

### Build Jobs

There are two jobs to perform a production build:

- `build` - Performs an unminified production build  
- `build-min` - Perform a minified production build. Also enables compression to reduce the final bundle size.  

### Configuring for build

Before running the build, make sure the image asset paths (specified in `/src/config/prd.js`) are correct. The kaleidoscope is initialised with the first image in this list.

```
images: [
    './assets/bg--alt-01.jpg',
    './assets/bg--alt-02.jpg',
    './assets/bg--alt-03.jpg',
    './assets/bg--alt-04.jpg',
    './assets/bg--alt-05.jpg',
    './assets/bg--alt-06.jpg',
    './assets/bg--alt-07.jpg',
    './assets/bg--main-bertrand.jpg',
    './assets/bg--main-geza.jpg',
    './assets/bg--main-mark.jpg'
]
```

These paths should be relative to the location of the webpage with the canvas element or absolute paths.

### Running the build

To perform a build, use the npm script:  
`npm run build`  or `npm run build-min`  

You can also run both builds with one command:  
`npm run build-all` 

This will produce two files `kal.js` and `kal.min.js` in the `/dist` directory of the project.

### Deployment

The application looks for a canvas element with the id `kaleidoscope` in the HTML document. Before deployment, please make sure this element exists.