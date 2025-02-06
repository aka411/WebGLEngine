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
    return new Vec3(this.x+b.x,this.y+b.y,this.z+b.z);
  }

  sub(b)
  {
    return new Vec3(this.x-b.x,this.y-b.y,this.z-b.z);
  }

  mag()
  {
    return Math.sqrt(this.x * this.x + this.y * this.y+ this.z * this.z);
  }

  scale(s)
  {
    return new Vec3(this.x*s,this.y*s,this.z*s);
  }

  cross(b){

    const a1 = this.x, a2 =this.y ,a3 = this.z;
    const b1 = b.x, b2 =b.y ,b3 = b.z;

    return new Vec3((a2*b3-a3*b2),-(a1*b3-a3*b1),(a1*b2-a2*b1));
  }

  dot(b)
  {
    return this.x * b.x + this.y * b.y+ this.z * b.z;
  }

  unit(){
    const length = this.mag();

    return this.scale(1/length);
  }


  normalize(){
    const length = this.mag();

    return this.scale(1/length);
  }


}






class Vec4{

  constructor(x,y,z,w)
  {

    this.x = x || 0;
    this.y = y || 0;
    this.z = z || 0;
    this.w = w || 0;


  }

  dot(b){

    return this.x * b.x + this.y * b.y+ this.z * b.z+this.w*b.w;
  }




}







class Mat4x4{

constructor(e){
  if(e === undefined){e = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ];

    }

  this.m = [
  e[0], e[1], e[2], e[3],
  e[4], e[5], e[6], e[7],
  e[8], e[9], e[10], e[11],
  e[12], e[13], e[14], e[15] ];


}


getColumn(n){
  let e = this.m;

  return new Vec4(e[n],e[n+4],e[n+8],e[n+12]);

}

setColumn(n,col){
  let e = this.m;

  e[n]   = col[0];
  e[n+4] = col[1];
  e[n+8] = col[2];
  e[n+12]= col[3];

  this.m = e;


}

setDiagonal(e){

this.m =[e[0], 0, 0, 0,
         0, e[1], 0, 0,
         0, 0, e[3], 0,
         0, 0, 0, e[4] ];

}


transpose() {
  let result =  new Mat4x4();
  let m = this.m, r = result.m;
  r[0] = m[0]; r[1] = m[4]; r[2] = m[8]; r[3] = m[12];
  r[4] = m[1]; r[5] = m[5]; r[6] = m[9]; r[7] = m[13];
  r[8] = m[2]; r[9] = m[6]; r[10] = m[10]; r[11] = m[14];
  r[12] = m[3]; r[13] = m[7]; r[14] = m[11]; r[15] = m[15];
  return result;
}

mul (right){
  let  result =  new Mat4x4();
  let a = this.m, b = right.m, r = result.m;

  r[0] = a[0] * b[0] + a[1] * b[4] + a[2] * b[8] + a[3] * b[12];
  r[1] = a[0] * b[1] + a[1] * b[5] + a[2] * b[9] + a[3] * b[13];
  r[2] = a[0] * b[2] + a[1] * b[6] + a[2] * b[10] + a[3] * b[14];
  r[3] = a[0] * b[3] + a[1] * b[7] + a[2] * b[11] + a[3] * b[15];

  r[4] = a[4] * b[0] + a[5] * b[4] + a[6] * b[8] + a[7] * b[12];
  r[5] = a[4] * b[1] + a[5] * b[5] + a[6] * b[9] + a[7] * b[13];
  r[6] = a[4] * b[2] + a[5] * b[6] + a[6] * b[10] + a[7] * b[14];
  r[7] = a[4] * b[3] + a[5] * b[7] + a[6] * b[11] + a[7] * b[15];

  r[8] = a[8] * b[0] + a[9] * b[4] + a[10] * b[8] + a[11] * b[12];
  r[9] = a[8] * b[1] + a[9] * b[5] + a[10] * b[9] + a[11] * b[13];
  r[10] = a[8] * b[2] + a[9] * b[6] + a[10] * b[10] + a[11] * b[14];
  r[11] = a[8] * b[3] + a[9] * b[7] + a[10] * b[11] + a[11] * b[15];

  r[12] = a[12] * b[0] + a[13] * b[4] + a[14] * b[8] + a[15] * b[12];
  r[13] = a[12] * b[1] + a[13] * b[5] + a[14] * b[9] + a[15] * b[13];
  r[14] = a[12] * b[2] + a[13] * b[6] + a[14] * b[10] + a[15] * b[14];
  r[15] = a[12] * b[3] + a[13] * b[7] + a[14] * b[11] + a[15] * b[15];

  return result;
}




inverse() {
  let  result =  new Mat4x4();
  let m = this.m, r = result.m;

  r[0] = m[5]*m[10]*m[15] - m[5]*m[14]*m[11] - m[6]*m[9]*m[15] + m[6]*m[13]*m[11] + m[7]*m[9]*m[14] - m[7]*m[13]*m[10];
  r[1] = -m[1]*m[10]*m[15] + m[1]*m[14]*m[11] + m[2]*m[9]*m[15] - m[2]*m[13]*m[11] - m[3]*m[9]*m[14] + m[3]*m[13]*m[10];
  r[2] = m[1]*m[6]*m[15] - m[1]*m[14]*m[7] - m[2]*m[5]*m[15] + m[2]*m[13]*m[7] + m[3]*m[5]*m[14] - m[3]*m[13]*m[6];
  r[3] = -m[1]*m[6]*m[11] + m[1]*m[10]*m[7] + m[2]*m[5]*m[11] - m[2]*m[9]*m[7] - m[3]*m[5]*m[10] + m[3]*m[9]*m[6];

  r[4] = -m[4]*m[10]*m[15] + m[4]*m[14]*m[11] + m[6]*m[8]*m[15] - m[6]*m[12]*m[11] - m[7]*m[8]*m[14] + m[7]*m[12]*m[10];
  r[5] = m[0]*m[10]*m[15] - m[0]*m[14]*m[11] - m[2]*m[8]*m[15] + m[2]*m[12]*m[11] + m[3]*m[8]*m[14] - m[3]*m[12]*m[10];
  r[6] = -m[0]*m[6]*m[15] + m[0]*m[14]*m[7] + m[2]*m[4]*m[15] - m[2]*m[12]*m[7] - m[3]*m[4]*m[14] + m[3]*m[12]*m[6];
  r[7] = m[0]*m[6]*m[11] - m[0]*m[10]*m[7] - m[2]*m[4]*m[11] + m[2]*m[8]*m[7] + m[3]*m[4]*m[10] - m[3]*m[8]*m[6];

  r[8] = m[4]*m[9]*m[15] - m[4]*m[13]*m[11] - m[5]*m[8]*m[15] + m[5]*m[12]*m[11] + m[7]*m[8]*m[13] - m[7]*m[12]*m[9];
  r[9] = -m[0]*m[9]*m[15] + m[0]*m[13]*m[11] + m[1]*m[8]*m[15] - m[1]*m[12]*m[11] - m[3]*m[8]*m[13] + m[3]*m[12]*m[9];
  r[10] = m[0]*m[5]*m[15] - m[0]*m[13]*m[7] - m[1]*m[4]*m[15] + m[1]*m[12]*m[7] + m[3]*m[4]*m[13] - m[3]*m[12]*m[5];
  r[11] = -m[0]*m[5]*m[11] + m[0]*m[9]*m[7] + m[1]*m[4]*m[11] - m[1]*m[8]*m[7] - m[3]*m[4]*m[9] + m[3]*m[8]*m[5];

  r[12] = -m[4]*m[9]*m[14] + m[4]*m[13]*m[10] + m[5]*m[8]*m[14] - m[5]*m[12]*m[10] - m[6]*m[8]*m[13] + m[6]*m[12]*m[9];
  r[13] = m[0]*m[9]*m[14] - m[0]*m[13]*m[10] - m[1]*m[8]*m[14] + m[1]*m[12]*m[10] + m[2]*m[8]*m[13] - m[2]*m[12]*m[9];
  r[14] = -m[0]*m[5]*m[14] + m[0]*m[13]*m[6] + m[1]*m[4]*m[14] - m[1]*m[12]*m[6] - m[2]*m[4]*m[13] + m[2]*m[12]*m[5];
  r[15] = m[0]*m[5]*m[10] - m[0]*m[9]*m[6] - m[1]*m[4]*m[10] + m[1]*m[8]*m[6] + m[2]*m[4]*m[9] - m[2]*m[8]*m[5];

  const det = m[0]*r[0] + m[1]*r[4] + m[2]*r[8] + m[3]*r[12];
  for (let i = 0; i < 16; i++) r[i] /= det;
  return result;
}
}


class Quaternion {

constructor(w,x,y,z){

  this.x = x || 0;
  this.y = y || 0;
  this.z = z || 0;
  this.w = w || 0;


}

static fromVector(w,n){

  return new Quaternion(w,n.x,n.y,n.z);
}



scale(s){

  return new Quaternion(this.w*s,this.x*s,this.y*s,this.z*s);
}


mag(){

   return Math.sqrt(this.w**2+this.x**2+this.y**2+this.z**2);
}

conjugate(){

  return new Quaternion (this.w,-this.x,-this.y,-this.z)
}

normalize(){
const mag = this.mag();
  return this.scale(1/mag);
}

inverse(){
const magSqr = (this.w**2+this.x**2+this.y**2+this.z**2);

const conjQuat = new Quaternion (this.w,-this.x,-this.y,-this.z)

  return conjQuat.scale(1/magSqr);
}


mul(q2){

const w1 = this.w,x1=this.x,y1=this.y,z1=this.z ;
const w2 = q2.w,x2=q2.x,y2=q2.y,z2=q2.z ;
  return new Quaternion((w1*w2-x1*x2-y1*y2-z1*z2),
                        (w1*x2+x1*w2+y1*z2-z1*y2),
                        (w1*y2-x1*z2+y1*w2+z1*x2),
                        (w1*z2+x1*y2-y1*x2+z1*w2));



}

getRotationMatrix(){
//normalize?!!!

  const qw = this.w;
  const qx = this.x;
  const qy = this.y;
  const qz = this.z;

  return new Mat4x4([
    1.0 - 2.0*qy*qy - 2.0*qz*qz, 2.0*qx*qy - 2.0*qz*qw, 2.0*qx*qz + 2.0*qy*qw, 0.0,
    2.0*qx*qy + 2.0*qz*qw, 1.0 - 2.0*qx*qx - 2.0*qz*qz, 2.0*qy*qz - 2.0*qx*qw, 0.0,
    2.0*qx*qz - 2.0*qy*qw, 2.0*qy*qz + 2.0*qx*qw, 1.0 - 2.0*qx*qx - 2.0*qy*qy, 0.0,
    0.0, 0.0, 0.0, 1.0]);

}



static eulerToQuaternion(yaw, pitch, roll){

        const qx = Math.sin(roll/2) * Math.cos(pitch/2) * Math.cos(yaw/2) - Math.cos(roll/2) * Math.sin(pitch/2) * Math.sin(yaw/2);
        const qy = Math.cos(roll/2) * Math.sin(pitch/2) * Math.cos(yaw/2) + Math.sin(roll/2) * Math.cos(pitch/2) * Math.sin(yaw/2);
        const qz = Math.cos(roll/2) * Math.cos(pitch/2) * Math.sin(yaw/2) - Math.sin(roll/2) * Math.sin(pitch/2) * Math.cos(yaw/2);
        const qw = Math.cos(roll/2) * Math.cos(pitch/2) * Math.cos(yaw/2) + Math.sin(roll/2) * Math.sin(pitch/2) * Math.sin(yaw/2);

        return new Quaternion(qw ,qx, qy, qz);


}

static fromVectors(v1,v2){



const a = v1.cross(v2);

const m1 = v1.mag();
const m2 = v2.mag();
const com = v1.dot(v2)/(m1*m2);
let angle = 0;
if(com <-1){angle = Math.PI;}else if(com > 1){angle = 0;}else{angle = Math.acos(com);}


return Quaternion.axisAngleToQuaternion(angle,a);




}



static axisAngleToQuaternion(angleRad,axis){

  const unitAxis = axis.normalize();

  const sinHlf = Math.sin(angleRad/2);
  const cosHlf = Math.cos(angleRad/2);
  const qx =axis.x *sinHlf , qy=axis.y*sinHlf , qz = axis.z*sinHlf,qw = cosHlf;

  return new Quaternion(qw,qx,qy,qz);




}

}












function lerpS(a,b,t)
{
  return a+(b-a)*t;


}



function lerpV(a,b,t){

return a.add(b.sub(a).scale(t));

}
