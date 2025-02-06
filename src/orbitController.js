class OrbitController{

  constructor(){

    //need a better way to do this

    this.c = 10000;//distance from origin to screen
    this.scaleFactor = 10000;





  }

  getQuaternion(startPoint,endPoint){

    const c =this.c;
    const scale = this.scaleFactor;

    const vA = new Vec3(startPoint.x,startPoint.y,c).unit();
    const vB = new Vec3(endPoint.x,endPoint.y,c).unit();



    const axis = vA.cross(vB).unit();

    const cosTheta = vA.dot(vB);

    let angle = 0;
    if(cosTheta<-1){angle = Math.PI;}else if(cosTheta> 1){angle = 0;}else{angle = Math.acos(cosTheta);}




    return  Quaternion.axisAngleToQuaternion(scale*angle,axis);





  }



}
