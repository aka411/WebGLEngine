'use strict'


class PhysicsComponent
{


  constructor()
  {

    this.invMass = 1; // use later
    this.radius = 10;

    this.acceleration = new Vec2(0,0);
    this.velocity = new Vec2(0,0);
    this.previousPosition = new Vec2(0,0);

//will need to use force accumulator in aply force
//for large objects point of force will be needed in model space and rotation will come into effect
//for small objects just add forces
//this.forceAccumulator = new Array();

  }






  update(dt,body)
  {
    //s = ut + 0.5 at^2
    //v = u + at;
    //
    //update physics
this.applyForce(1);

    this.previousPosition = body.position;
    //body.position = body.position.add(velocity).add(body.acceleration.scale(dt * dt));


let u = this.velocity;
let ut = u.scale(dt);
//body.position = body.velocity.scale(dt).add(body.acceleration.scale(dt * dt*0.5));
let a = this.acceleration;
let at = a.scale(dt*dt*0.5);

 body.position = this.previousPosition.add(ut.add(at));
 this.velocity = this.velocity.add(this.acceleration.scale(dt));





  }

  applyForce(f)
  {
   let  fd = new Vec2(0,-9.8);

    this.acceleration = fd.scale(1/this.invMass);




  }




}
