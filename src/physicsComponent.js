'use strict'

const BodyType = {

  SPHERE : 0,
  PLANE : 1,
  CUBOID  : 2

};



class PhysicsBody
{
  constructor(bodyType){

    this.bodyType  = bodyType;
    this.fixed = false;
    //this.relativePosCOM = ;   store position of center of mass as a relative position from object position


  }



}


class SphereBody extends PhysicsBody{

  constructor(radius){

    super(BodyType.SPHERE);

    this.radius = radius;


  }






}

class PlaneBody extends PhysicsBody{

  constructor(l,b){

    super(BodyType.PLANE);



    this.length = l;
    this.breadth = b;

  }

}



class CuboidBody extends PhysicsBody{

  constructor(l,b,h){

    super(BodyType.CUBOID);

    this.length = l;
    this.breadth = b;
    this.height = h;
  }

}







class PhysicsComponent
{


  constructor()
  {

    this.physicsBody = new PhysicsBody();



    this.orientation = new Quaternion(0,0,1,0);


    this.invMass = 1; // use later


    this.acceleration = new Vec3(0,0,0);
    this.velocity = new Vec3(0,0,0);
    this.previousPosition = new Vec3(0,0,0);

//will need to use force accumulator in aply force
//for large objects point of force will be needed in model space and rotation will come into effect
//for small objects just add forces
//this.forceAccumulator = new Array();

    this.modelMatrix = new Mat4x4([1 ,0 ,0 ,0,
                                   0 ,1 ,0 ,0,
                                   0 ,0 ,1 ,0,
                                   0 ,0 ,0 ,1]);





  }






  update(dt,body)
  {

    if(body.physicsComponent.physicsBody.fixed==true){this.updateModel(body);return;}

    //
    //update physics
this.applyForce(new Vec3(0,-9.8,0).scale(1/this.invMass));

    this.previousPosition = body.position;
    //body.position = body.position.add(velocity).add(body.acceleration.scale(dt * dt));


let u = this.velocity;
let ut = u.scale(dt);

let accel = this.acceleration;
let at = accel.scale(dt*dt*0.5);

//s = ut + 0.5 at^2
//v = u + at;

 body.position = this.previousPosition.add(ut.add(at));
 this.velocity = this.velocity.add(accel.scale(dt));

this.updateModel(body);



  }

  applyForce(f)
  {


    this.acceleration = f.scale(this.invMass);




  }

  updateModel(body){




    const rotMatrix = this.orientation.getRotationMatrix();

    const pX = body.position.x;
    const pY = body.position.y;
    const pZ = body.position.z;



    this.modelMatrix =rotMatrix;
    this.modelMatrix.setColumn(3,[pX,pY,pZ,1]);



  }




}
