'use strict'

class Collision {
  constructor(idA,idB){

    this.idA = idA;
    this.idB = idB;

    this.normal = new vec3();
    this.penetrationDepth = 0;

    //this.pointOfCollision = 0; //dont use for not,must be in model Space and two of these will be there for two bodies
    //penetration depth and point of collision?

  }

  setnormal(x,y,z){
    this.normal.x =x;
    this.normal.y =y;
    this.normal.z =z;


  }

  setPenetrationDepth(d){
    this.penetrationDepth = d;


  }





}

class CollisionEngine{


  constructor(){



  }

  checkCollision(scene){

    for (let i = 0; i < scene.list.length; i++) {
      for (let k = 0; k < scene.list.length; k++) {
        if (i == k) continue;

        let bodyA = scene.list[i];
        let bodyB =scene.list[k];

        let diff = bodyA.position.sub(bodyB.position);
        let dist = diff.mag();

        if (dist < bodyA.physicsComponent.radius + bodyB.physicsComponent.radius) {

          let penetrationDepth =  bodyB.physicsComponent.radius+bodyA.physicsComponent.radius-dist;





          /*
          let t = diff.scale(1 / dist);
          let delta = bodyA.physicsComponent.radius + bodyB.physicsComponent.radius - dist;
          bodyA.position = bodyA.position.add(t.scale(0.5 * delta));
          bodyB.position = bodyB.position.add(t.scale(-0.5 * delta));
       */



       /*impulse based approach*/

       let vr = bodyA.physicsComponent.velocity.sub(bodyB.physicsComponent.velocity);
       let normal = bodyA.position.sub(bodyB.position).unit();
       let contactVel = vr.dot(normal);
       //if(contactVel > 0) continue;

       let invMassSum = bodyA.physicsComponent.invMass + bodyB.physicsComponent.invMass;

       const  k_slop = 0.05; // Penetration allowance
       const  percent = 0.4; // Penetration percentage to correct
 let correction = normal.scale((Math.max( penetrationDepth - k_slop, 0.0 ) / (invMassSum)) * percent);



bodyA.position = bodyA.position.add(correction.scale(  bodyA.physicsComponent.invMass));
bodyB.position = bodyB.position.sub( correction.scale( bodyB.physicsComponent.invMass));

       // Calculate impulse scalar
       const e = 0.9; // tweak?
       let j = -(1.0 + e) * contactVel;
       j /= invMassSum;
  // j /= (real)contact_count;

      let impulse = normal.scale(j);


  //applying impulse
bodyA.physicsComponent.velocity=  bodyA.physicsComponent.velocity.add( impulse.scale(bodyA.physicsComponent.invMass));
bodyB.physicsComponent.velocity=  bodyB.physicsComponent.velocity.add( impulse.scale(-bodyB.physicsComponent.invMass));

//console.log(bodyA.physicsComponent.velocity);








    }
  }
}



  }




}
