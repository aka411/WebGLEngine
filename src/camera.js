
class OrthographicCamera
{
  constructor(r,l,t,b,n,f,ar)
  {
    this.r = r;
    this.l = l;

    this.t = t;
    this.b = b;

    this.n = n; //minus ?
    this.f = f;// minus ? camera at origin?

    this.mx = 2/(this.r- this.l);
    this.cx = (this.l+this.r)/(this.l - this.r);

    this.my = 2/(this.t - this.b);
    this.cy = (this.t + this.b)/(this.b - this.t);

    this.mz = 2/(this.n - this.f);
    this.cz = (this.n + this.f)/(this.f - this.n);

    this.ar = ar;


    this.camera = [this.mx/this.ar,0,0,this.cx,
                   0,this.my,0,this.cy,
                   0,0,this.mz,this.cz,
                   0,0,0,1 ];

  }

  getCameraMatrix()
  {

    return this.camera;


  }

  setAspectRatio(aspectRatio)
  {

    this.ar = aspectRatio;

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
      this.n = near;
      this.f = far ;

      this.nT = near*tanHlf

      this.fT = far * tanHlf;

      this.m = -2/(far-near);

      this.c = 1+(near*-(this.m));





      this.ar = aspectRatio;


      this.camera = [this.n/this.nT*(1/this.ar),0,0,0,
                     0,this.n/this.nT,0,0,
                     0,0,this.m,this.c,
                     0,0,-1,0 ];


  }




}
