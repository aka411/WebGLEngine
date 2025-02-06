'use strict'

class CollisionManifold {
  constructor(){

    //this.idA = 0; object ids for identifying objects
   // this.idB = 0;

    this.contactBool = false;

    this.collisionNormal = new Vec3();
    this.penetrationDepth = 0;

    this.contactVelocity = new Vec3();

    }


}

const ContactFunc = {

  SphereToSphere: 0,
  SphereToPlane : 1
};


class CollisionEngine{


  constructor(){

  }



  FindContactFunc (bodyTypeA,bodyTypeB)
	{

    const ContactFuncTable = [[ContactFunc.SphereToSphere,ContactFunc.SphereToPlane],

                              [ContactFunc.SphereToPlane,null  ]];

    return ContactFuncTable[bodyTypeA][bodyTypeB];



	}

  checkCollision(scene){

    for (let i = 0; i < scene.list.length; i++) {
      for (let k = 0; k < scene.list.length; k++) {

        if (i == k) continue;

        let bodyA = scene.list[i];
        let bodyB =scene.list[k];

        const bodyTypeA = bodyA.physicsComponent.physicsBody.bodyType;
        const bodyTypeB = bodyB.physicsComponent.physicsBody.bodyType;





        if(bodyTypeB < bodyTypeA ){
          const temp = bodyA; // usage of const may cause reference problems need to check
          bodyA = bodyB;
          bodyB = temp;


        }

        let collisionManifold = new CollisionManifold();

        const contactFunction =   this.FindContactFunc( bodyTypeA, bodyTypeB);



        switch(contactFunction )
        {

          case ContactFunc.SphereToSphere:
            collisionManifold = this.sphereToSphereTest(  bodyA ,  bodyB );
            break;

          case ContactFunc.SphereToPlane:
            collisionManifold = this.sphereToPlaneTest(  bodyA ,  bodyB );
            break;

          default : break ;

        }

        if(collisionManifold==null)  continue;

        this.collisionSolver(collisionManifold,bodyA ,  bodyB);












       //if(contactVel > 0) continue;


/******POSITIONAL CORRECTION******/







        }
    }



  }


  sphereToSphereTest(bodyA,bodyB){

    const pA = bodyA.position;
    const pB = bodyB.position;


    const relativePosition = pA.sub(pB);
    const relativeDistance = relativePosition.mag();

    const rA = bodyA.physicsComponent.physicsBody.radius ;
    const rB = bodyB.physicsComponent.physicsBody.radius;









   if (relativeDistance < rA+ rB) {

     const vA = bodyA.physicsComponent.velocity;
     const vB = bodyB.physicsComponent.velocity;



     const penetrationDepth =  rA+rB-relativeDistance;

     const vRelative = vA.sub(vB);

     const collisionNormal = relativePosition.unit();


     const contactVel = vRelative.dot(collisionNormal);

     let collisionManifold = new CollisionManifold();

     collisionManifold.collisionNormal = collisionNormal;
     collisionManifold.contactVelocity = contactVel;
     collisionManifold.penetrationDepth =  penetrationDepth;


     return collisionManifold;






    }
   return null;
  }



  sphereToPlaneTest(sphereObject,planeObject){

      const pA = sphereObject.position;//Sphere
      const pB = planeObject.position;//Plane

      const radius =sphereObject.physicsComponent.physicsBody.radius;
      const length = planeObject.physicsComponent.physicsBody.length;

      const planeOrientation = planeObject.physicsComponent.orientation;
      const planeNormal =new Vec3( planeOrientation.x,planeOrientation.y,planeOrientation.z).unit();//need to check

      //console.log( "plane Normal ",planeNormal  );



      const d = planeNormal.dot(pB);


      const relativeDistance = pA.dot(planeNormal)-d;

      const sphereProjectionPoint = pA.sub(planeNormal.scale(relativeDistance));

      const relativeVector = sphereProjectionPoint.sub(pB);
      if(relativeVector.mag()>length/2)return null;

      if(Math.abs(relativeDistance) < radius){

        const normalSign = (relativeDistance<0)? -1:1;
        const collisionNormal = planeNormal.scale(normalSign);

        const vA = sphereObject.physicsComponent.velocity;
        const vB = planeObject.physicsComponent.velocity;
      //  console.log( "velSphere: ", vA );
        //console.log( "velplane: ", vB );

        const vRelative = vA.sub(vB);
        //  console.log( "vRelative: ", vRelative  );

        const contactVel = vRelative.dot(collisionNormal);

        const  penetrationDepth = radius-Math.abs(relativeDistance)

        let collisionManifold = new CollisionManifold();

        collisionManifold.collisionNormal = collisionNormal;
        collisionManifold.contactVelocity = contactVel;
        collisionManifold.penetrationDepth =  penetrationDepth;


        return collisionManifold;


      }


      return null;











  }










  correctPosition(collisionManifold,bodyA,bodyB){


    const invMassSum = bodyA.physicsComponent.invMass + bodyB.physicsComponent.invMass;

    const  k_slop = 0.05; // Penetration allowance
    const  percent = 0.4; // Penetration percentage to correct

    const collisionNormal = collisionManifold.collisionNormal;
    const penetrationDepth = collisionManifold.penetrationDepth;

    const correction = collisionNormal.scale((Math.max( penetrationDepth - k_slop, 0.0 ) / (invMassSum)) * percent);



    if(bodyA.physicsComponent.physicsBody.fixed!=true)  bodyA.position = bodyA.position.add(correction.scale(  bodyA.physicsComponent.invMass));
    if(bodyB.physicsComponent.physicsBody.fixed!=true) bodyB.position = bodyB.position.sub( correction.scale( bodyB.physicsComponent.invMass));



  }


    collisionSolver(collisionManifold,bodyA,bodyB){

      const contactVel = collisionManifold.contactVelocity;



    this.correctPosition(collisionManifold,bodyA,bodyB);
    if (contactVel >=0 ) return;






    const collisionNormal = collisionManifold.collisionNormal;

    const invMassSum = bodyA.physicsComponent.invMass+bodyB.physicsComponent.invMass;



    // Calculate impulse scalar
    const e = 0.9; // tweak?
    let j = -(1.0 + e) * contactVel;
    j /= invMassSum;

   // j /= (real)contact_count;

    let impulse = collisionNormal.unit().scale(j);
  //  console.log("impulse : " ,impulse);
  //  console.log( "cont-vel: ",contactVel);
  //  console.log( "body",bodyA.physicsComponent.velocity);


   //applying impulse
    if(bodyA.physicsComponent.physicsBody.fixed!=true)bodyA.physicsComponent.velocity= bodyA.physicsComponent.velocity.add( impulse.scale(bodyA.physicsComponent.invMass));//impulse.scale(bodyA.physicsComponent.invMass);
    if(bodyB.physicsComponent.physicsBody.fixed!=true) bodyB.physicsComponent.velocity= bodyB.physicsComponent.velocity.add( impulse.scale(-bodyB.physicsComponent.invMass));//impulse.scale(bodyB.physicsComponent.invMass); //




  }






}
