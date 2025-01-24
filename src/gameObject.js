'use strict'

class GameObject
{
  constructor(position)
  {

    this.id = 0;
    this.position = position || new Vec2(0,0);





    this.physicsComponent = new PhysicsComponent();
    this.graphicsComponent = new GraphicsComponent();
  //  this.collisionComponent = new CollisionComponent();



  }


  update(dt)
  {
    //input check here
    this.physicsComponent.update(dt,this);

    this.graphicsComponent.updateModel(this);

  }






}
