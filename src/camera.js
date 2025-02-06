

/***WEBGL CLIPSPACE USES LEFT HAND COORDINATE SYSTEM,
    WORLD COORDINATES TYPICALLY IN RIGHT HAND COORDINATE SYSTEM***/





class OrthographicCamera
{
  constructor(l,r,t,b,n,f,ar)
  {

    this.ar = ar;

//Cannot arbitarly set r and l as aspect ratio needs to be acounted for else rendered image will stretch along x axis
    const height =Math.abs(t-b);
    this.r =height*this.ar/2;
    this.l = -height*this.ar/2;

    this.t = t;
    this.b = b;

    this.n = n;
    this.f = f;

    this.mx =2/(this.r- this.l);
    this.cx = (this.l+this.r)/(this.l - this.r);

    this.my = 2/(this.t - this.b);
    this.cy = (this.t + this.b)/(this.b - this.t);

/**REMEMBER WEBGL CLIP SPACE IS IN LEFT HAND COORDINATE SYSTEM**/
//So as to convert from right hand to left hand coordinate system we will flip the sign of z coordinates
    this.mz = -2/(this.n - this.f);
    this.cz = (this.n + this.f)/(this.n - this.f);




    this.projectionMatrix= new Mat4x4([this.mx,0,0,this.cx,
                                        0,this.my,0,this.cy,
                                        0,0,this.mz,this.cz,
                                        0,0,0,1 ]);

    this.orientation = new Quaternion( 1,0,0,0);

    this.position = new Vec3(0,0,0);

    this.viewMatrix = new Mat4x4([1,0,0,this.position.x,
                                  0,1,0,this.position.y,
                                  0,0,1,this.position.z,
                                  0,0,0,1 ]);





  }



  changeOrientation(p){

      const pCon = p.conjugate();


      this.orientation = p.mul(this.orientation);

    //  const pos = p.mul(new Quaternion(0,this.position.x,this.position.y,this.position.z)).mul(pCon);
    //  this.position = new Vec3(pos.x,pos.y,pos.z);

      this.orientation=this.orientation.normalize();




  }




   getViewMatrix(){

     this.updateViewMatrix();

     return this.viewMatrix;

   }
   updateViewMatrix(){

     const orientation = this.orientation;
     const orientationConj = orientation.conjugate();


     const pos = orientation.mul(new Quaternion(0,this.position.x,this.position.y,this.position.z)).mul(orientationConj);




   this.viewMatrix = orientation.getRotationMatrix();
   this.viewMatrix.setColumn(3,[pos.x,pos.y,pos.z,1]);


   }


    getProjectionMatrix()
    {

      return this.projectionMatrix;


    }


}











class PerspectiveCamera
{


    constructor(fov,aspectRatio,near,far)
    {
/*
      fov — Camera frustum vertical field of view.
      aspect — Camera frustum aspect ratio.
      near — Camera frustum near plane.
      far — Camera frustum far plane.
*/



      this.tanHlf = Math.tan(fov/2);
      this.near = near;
      this.far = far ;

      this.nearTop = near*this.tanHlf

      this.farTop = far * this.tanHlf;


    /**REMEMBER WEBGL CLIP SPACE IS IN LEFT HAND COORDINATE SYSTEM**/
    //So as to convert from right hand to left hand coordinate system we will need to flip the sign of z coordinates and near and far plane also


      const glNear = - near;
      const glFar = - far;
    //For WEBGL CLIP SPACE glNear maps to -1 and glFar maps to +1

      this.m = 2/(glFar-glNear);
      this.c = -(glFar+glNear)/(glFar-glNear);

      const glNearTop = glNear * this.tanHlf;
      const glFarTop = glFar * this.tanHlf;

      this.x = glNear/glNearTop;
      this.y = glFar/glFarTop;





      this.ar = aspectRatio;


      this.projectionMatrix = new Mat4x4([this.x*(1/this.ar),0,0,0,
                                            0,this.y,0,0,
                                            0,0,this.m,this.c,
                                            0,0,-1,0 ]);//after matrix multiplication we will negate z coordinate and put it into w component
//webgl does perspective divide internally using w component of resulting vec4 vector
//so we set w as -z coordinate(note the negative to flip z axis to left hand coordinate system)


      this.orientation = new Quaternion( 1,0,0,0);

      this.position = new Vec3(0,0,0);

      this.viewMatrix = new Mat4x4([1,0,0,this.position.x,
                                    0,1,0,this.position.y,
                                    0,0,1,this.position.z,
                                    0,0,0,1 ]);



  }

  changeOrientation(p){

      const pCon = p.conjugate();


      this.orientation = p.mul(this.orientation);

    //  const pos = p.mul(new Quaternion(0,this.position.x,this.position.y,this.position.z)).mul(pCon);
    //  this.position = new Vec3(pos.x,pos.y,pos.z);

      this.orientation=this.orientation.normalize();




  }




   getViewMatrix(){

     this.updateViewMatrix();

     return this.viewMatrix;

   }
   updateViewMatrix(){

     const orientation = this.orientation;
     const orientationConj = orientation.conjugate();


     const pos = orientation.mul(new Quaternion(0,this.position.x,this.position.y,this.position.z)).mul(orientationConj);




   this.viewMatrix = orientation.getRotationMatrix();
   this.viewMatrix.setColumn(3,[pos.x,pos.y,pos.z,1]);


   }


    getProjectionMatrix()
    {

      return this.projectionMatrix;


    }





}
