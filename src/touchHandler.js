

class TouchHandler{
constructor(gl){

  this.gl = gl;

  this.x = 0;
  this.y = 0;

  this.touch = false;



}



checkInput(){
if(this.touch == true){

  this.touch = false;
  return true;
}
else {return false;}


}






initialize(){

const gl = this.gl;
const ctx = this;
  function normalize(e){

    const w = gl.canvas.width/2;
    const h = gl.canvas.height/2;



    const x = (e.x/w)-1;
    const y = 1-(e.y/h);

    ctx.x = x;
    ctx.y = y;
    ctx.touch = true;




  }


  function getMousePos(evt) {
     const rect = gl.canvas.getBoundingClientRect();
     return {
       x: evt.clientX - rect.left,
       y: evt.clientY - rect.top
     };
   }


function  handleTouch(evt){

 const coord = getMousePos(evt);
normalize(coord);

 }





this.gl.canvas.addEventListener('mousedown',function(evt){ handleTouch(evt);},false);




}
}
