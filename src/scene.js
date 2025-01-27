'use strict'


class Scene
{
  constructor(ar)
  {
    this.list = new Array();
    this.camera = new OrthographicCamera(200,-200,300,-300,10,-200,ar);
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
