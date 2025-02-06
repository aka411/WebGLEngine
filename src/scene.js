'use strict'


class Scene
{
  constructor()
  {
    this.list = new Array();

    this.collision = new CollisionEngine();



  }

  add(item)
  {
    item.id = this.list.length;
    this.list.push(item);

  }

  checkCollisions()
  {

    //send scene graph to collsion engine?
     this.collision.checkCollision(this);

  }


  update(dt)
  {

    for (let i = 0; i<this.list.length; i++)
    {

      this.list[i].update(dt);

    }

    this.checkCollisions();


  }






}
