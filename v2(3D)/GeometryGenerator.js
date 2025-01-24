'use strict'


class GeometryGenerator
{
  cosntructor()
  {

  }

  generateCircle(r,minAngle)
  {

    let vertices = new Array ();
    vertices.push(0,0,0);
    for (let i = 0 ; i < 6.28 ; i+=minAngle)
    {
      vertices.push(r*Math.sin(i),r*Math.cos(i),0);


    }

    const numTris = Math.floor(6.28/minAngle); // will this always return number less than the actual;


    let index = new Array();

let i = 0;
    for ( i = 1; i< numTris; i++ )
    {
      index.push(0);
      index.push(i);
      index.push(i+1);
    }

    index.push(0);
    index.push(i);
    index.push(1);

    return [vertices,index];
  }






}
