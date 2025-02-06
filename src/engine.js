"use strict"


function main(gl)
{

const fpsMeter = document.getElementById('f1');
const gyro = new OrbitController();

const ctx = gl.canvas;



let touch = new TouchHandler(gl);


let resouceManager = new WebGLResourceManager(gl);
let shaderManager = new ShaderManager(gl);

shaderManager.initialize();

let renderer = new WebGLRenderer(gl,resouceManager,shaderManager);

const ar = gl.canvas.width/gl.canvas.height; //canvas aspect ratio
const dpx = window.devicePixelRatio; // 1 css pixel = how many device physical pixels



//let camera = new OrthographicCamera(-200,200,200,-200,-10,-300,ar );
let camera = new PerspectiveCamera(45,ar,-10,-400 );








let shapeGen = new GeometryGenerator();
const sphere = shapeGen.generateSphere(5,3);//radius,subdivision
const plane = shapeGen.generatePlane(10,50);//div,width
resouceManager.loadMesh(sphere[0],sphere[1],"sphere","shade");
resouceManager.loadMesh(plane[0],plane[1],"plane","shade");




let scene = new Scene();


const gameObject = new GameObject(new Vec3(0,-10,-60));

gameObject.physicsComponent.physicsBody= new PlaneBody(50,50);
gameObject.physicsComponent.physicsBody.fixed =true;
gameObject.physicsComponent.invMass = 1/3;
gameObject.graphicsComponent = new GraphicsComponent("plane",'shade');

scene.add(gameObject);



window.addEventListener('keydown',check,false);

function check(e) {
    switch(e.keyCode){

      case 37:camera.position.x--;

      break;

      case 38:camera.position.z--;
      break;

      case 39:camera.position.x++;
      break;

      case 40:camera.position.z++;
      break;



    }
}





let lastCall = performance.now();
let accum = 0;
let dt = 1 / 30;

const fpsPollingRate = 1;//second per update
let fpsAccum = 0;

function draw(timestamp)
{


  // Figure out how long it's been since the last invocation
  const delta = performance.now() - lastCall; // in milliseconds

  fpsAccum += delta;
if(fpsAccum/1000>=fpsPollingRate){

  fpsAccum =0;
  fpsMeter.textContent=Math.trunc(1000/delta);
}
  //Cache the current timestep so we can figure out the next delta
  lastCall = performance.now();

  // Add the delta to the "accumulator"
  accum += delta;

  // As long as the accumulated time passed is greater than our "timestep"
 // for comparing convert accum from milliseconds to seconds since dt is in seconds
  while (accum/1000 >= dt) {

        scene.update(dt);

        // Subtract one "timestep" from the accumulator
        accum -= dt*1000;
    }





renderer.render(scene,camera);


if(touch.checkPointerMoving()){

  const startPoint =touch.getStartPoint();
  const endPoint = touch.getEndPoint();

  const q = gyro.getQuaternion(startPoint,endPoint);

  camera.changeOrientation(q);




}







if(touch.checkPointerDown()){

const touchCoords = touch.getDownPoint();

//const worldPosition =new Vec3( touchCoords.x*200*ar,touchCoords.y*200,-90);//for OrthographicCamera


/****FOR PERSPECTIVE CAMERA****/
const normTouchX =touchCoords.x;
const normTouchY =touchCoords.y;

 const nZ = camera.near;
 const zConstant = -60;

 const nT = camera.nearTop;

 const camTouchX = nT*normTouchX*ar;
 const camTouchY = nT*normTouchY;
//negate zConstant as we only want the z coordinate magnitude;
 const wX = (-zConstant)*(camTouchX /nZ);
 const wY = (-zConstant)*(camTouchY /nZ);

 const worldPosition =new Vec3( wX,wY,zConstant);//for PerspectiveCamera
/****^^^^^FOR PERSPECTIVE CAMERA^^^^****/



const gameObject = new GameObject(worldPosition);

gameObject.physicsComponent.physicsBody= new SphereBody(5);
gameObject.graphicsComponent = new GraphicsComponent("sphere",'shade');

scene.add(gameObject);

}




requestAnimationFrame(draw);

}
requestAnimationFrame(draw);


}
