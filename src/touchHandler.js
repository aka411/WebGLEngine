

class TouchHandler{
constructor(gl){


  this.canvas = gl.canvas;

  this.wasPointerDown = false;

  this.wasPointerDownChecked =false ;
  this.wasPointerMovingChecked = false;

  this.isPointerDown = false;
  this.ispointerMoving = false;


  this.pointerDownPoint = new Vec2(0,0);

  this.pointerStartPoint = new Vec2(0,0);
  this.pointerEndPoint = new Vec2(0,0);

  this.width = gl.canvas.width;
  this.height = gl.canvas.height;




this.canvas.onmousedown = (event) => {

             this.pointerDown(event);

          };

this.canvas.onmousemove = (event) => {
             this.pointerMove(event);
          };

this.canvas.onmouseup= (event) => {
               this.pointerUp(event);
          };

/*
this.canvas.addEventListener('mousedown',function(evt){ this.pointerDown(evt);},false);
this.canvas.addEventListener('mousemove',function(evt){ this.pointerMoving(evt);},false);//need to add condion
this.canvas.addEventListener('mouseup',function(evt){ this.pointerUp(evt);},false);
*/






}

checkPointerMoving(){

if(this.wasPointerMovingChecked) return false;
  this.wasPointerMovingChecked = true;

  return  this.ispointerMoving;

}

getStartPoint(){
  return this.pointerStartPoint;
}

getEndPoint(){
  return this.pointerEndPoint;
}


getDownPoint(){

  return this.pointerDownPoint;

}



checkPointerDown(){

if(this.wasPointerDownChecked) return false;
  this.wasPointerDownChecked = true ;

  return this.isPointerDown ;


}


normalize(e){

  const w = this.width/2;
  const h = this.height/2;

  const x = (e.x/w)-1;
  const y = 1-(e.y/h);

  return new Vec2(x,y);

}


getMousePos(evt) {
   const rect = this.canvas.getBoundingClientRect();
   return {
     x: evt.clientX - rect.left,
     y: evt.clientY - rect.top
   };
 }



pointerDown(evt){

  this.isPointerDown = true;
  this.wasPointerDown = true;
  this.wasPointerDownChecked = false ;

  const coord = this.getMousePos(evt);
  const touch = this.normalize(coord);


    this.pointerDownPoint =touch;

    this.pointerStartPoint =touch;

    this.pointerEndPoint = touch;//for correctly assigning first start point in pointer moving function




}


pointerMove(evt){

  if(!this.isPointerDown) return;

  this.ispointerMoving = true;

  const coord = this.getMousePos(evt);
  const touch = this.normalize(coord);

  this.pointerStartPoint =this.pointerEndPoint;

  this.pointerEndPoint = touch;

  this.wasPointerMovingChecked = false;

}


pointerUp (evt){

  this.ispointerMoving = false;
  this.isPointerDown = false;

  const coord = this.getMousePos(evt);
  const touch = this.normalize(coord);



}





}
