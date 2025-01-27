"use strict"


function main(gl)
{

let resouceManager = new WebGLResourceManager(gl);
let renderer = new WebGLRenderer(gl,resouceManager);



resouceManager.loadShader(vert,frag,"shade");

let shapeGen = new GeometryGenerator();
const circle = shapeGen.generateSphere(10,2);

resouceManager.loadMesh(circle[0],circle[1],"circle","shade");



const ar = gl.canvas.width/gl.canvas.height;
const dpx = window.devicePixelRatio;

let scene = new Scene(ar *dpx );

//console.log(ar);


//const gameObject = new GameObject(new Vec2(0,1000));

//gameObject.graphicsComponent = new GraphicsComponent("circle",'shade');





//gameobject.physicsComponent = new PhysicsComponent();

//scene.add(gameObject);

//console.log(gl.canvas.width+' '+gl.canvas.height);


/*
function getMousePos(canvas, evt) {
   var rect = canvas.getBoundingClientRect();
   return {
     x: evt.clientX - rect.left,
     y: evt.clientY - rect.top
   };
 }
 gl.canvas.addEventListener('mousedown', function(evt) {
   var mousePos = getMousePos(gl.canvas, evt);
   //console.log('Mouse position: ' + mousePos.x+ ',' + mousePos.y);
  // console.log('Mouse position: ' + (((mousePos.x/gl.canvas.width)*4000)-2000)+ ',' + (((mousePos.y/gl.canvas.height)*-4500)+1500));

		//engine.createCircle(DEFAULT_RADIUS, );


  //  const gameObject = new GameObject(new Vec2((((mousePos.x/gl.canvas.width)*400)-200)*ar, (((mousePos.y/gl.canvas.height)*-450)+150)));
const gameObject = new GameObject(new Vec3(0,0,0));
    gameObject.graphicsComponent = new GraphicsComponent("circle",'shade');

    scene.add(gameObject);

}, false);

*/



let t = new TouchHandler(gl);
t.initialize();










let lastCall = performance.now();
let accum = 0;
let dt = 1 / 60;
function draw(timestamp)
{



  // Figure out how long it's been since the last invocation
  const delta = performance.now() - lastCall;

  //Cache the current timestep so we can figure out the next delta
  lastCall = performance.now();

  // Add the delta to the "accumulator"
  accum += delta;

  // As long as the accumulated time passed is greater than your "timestep"
//console.log("new frame");
  while (accum/1000 >= dt) {
//console.log(accum);
scene.update(dt);

        // Subtract one "timestep" from the accumulator
        accum -= dt*1000;
    }

renderer.render(scene);

if(t.checkInput()){
const gameObject = new GameObject(new Vec3(t.x*200*ar*dpx,t.y*300,-30));
    gameObject.graphicsComponent = new GraphicsComponent("circle",'shade');

    scene.add(gameObject);

}
requestAnimationFrame(draw);

}
requestAnimationFrame(draw);


}
