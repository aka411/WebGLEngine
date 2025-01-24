'use strict'


class Vec2
{
  constructor(x,y)
  {

    this.x = x || 0;
    this.y = y || 0;


  }

  add(b)
  {
    return new Vec2(this.x+b.x,this.y+b.y);
  }

  sub(b)
  {
    return new Vec2(this.x-b.x,this.y-b.y);
  }

  mag()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  scale(s)
  {
    return new Vec2(this.x*s,this.y*s);
  }

  dot(b)
  {
    return this.x * b.x + this.y * b.y;
  }

  unit(){
    const s = this.mag();
    return new Vec2(this.x*1/s,this.y*1/s);
  }

}



class Vec3
{
  constructor(x,y,z)
  {

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;


  }

  add(b)
  {
    return new Vec2(this.x+b.x,this.y+b.y,this.z+b.z);
  }

  sub(b)
  {
    return new Vec2(this.x-b.x,this.y-b.y,this.z-b.z);
  }

  mag()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y+ this.z * this.z);
  }

  scale(s)
  {
    return new Vec2(this.x*s,this.y*s,this.z*s);
  }

  dot(b)
  {
    return this.x * b.x + this.y * b.y+ this.z * b.z;
  }

}

function lerp(a,b,t)
{
  return a+(b-a)*t;


}
