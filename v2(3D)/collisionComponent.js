class BroadPhase {
//sphere for now
//box also
  constructor(){

    this.radius;
    this.position;
    //what happens if origin is not inside mesh
    this.originDiff; // difference between model origin and sphere origin


  }

  computeBoundingSphere(vertexPositionArray){


    let prevLX=0;prevLY=0;prevLZ=0;
    let prevHX=0;prevHY=0;prevHZ=0;


//O(n) time complexity
    for(let i = 0; i<vertexPositionArray.length;i+=3){

      if(prevHX < vertexPositionArray[i] ) prevHX = vertexPositionArray[i] ;
      if(prevHY < vertexPositionArray[i+1] ) prevHX = vertexPositionArray[i+1] ;
      if(prevHZ < vertexPositionArray[i+2] ) prevHX = vertexPositionArray[i+2] ;

      if(prevLX > vertexPositionArray[i] ) prevLX = vertexPositionArray[i] ;
      if(prevLY > vertexPositionArray[i+1] ) prevLX = vertexPositionArray[i+1] ;
      if(prevLZ > vertexPositionArray[i+2] ) prevLX = vertexPositionArray[i+2] ;


    }

    let lowestPoint = new Vec3(prevLX,prevLY,prevLZ);
    let highestPoint = new Vec3(prevHX,prevHY,prevHZ);




  }






}




class NarrowPhase {
//tight fitting mesh?
constructor(){


}


}




class CollisionComponent
{
  constructor()
  {


  }




}
