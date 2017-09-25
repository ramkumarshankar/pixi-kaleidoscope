//Create the renderer
var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Create a container object called the `stage`
var stage = new PIXI.Container();

//Use Pixi's built-in `loader` object to load an image
PIXI.loader
  .add("assets/bg--main-bertrand.jpg")
  .load(setup);

//This `setup` function will run when the image has loaded
function setup() {
    
  //Create the `cat` sprite from the texture
  var kaleidoscope = new PIXI.Sprite(
      PIXI.loader.resources["assets/bg--main-bertrand.jpg"].texture
  );

  //Add the cat to the stage
  stage.addChild(kaleidoscope);

  //Render the stage   
  renderer.render(stage);
}
