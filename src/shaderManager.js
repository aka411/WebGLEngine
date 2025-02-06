'use strict'


class ShaderManager
{
  constructor(gl)
  {
    this.gl = gl;

        this.bufferList = new Map();
        this.shaderList = new Map();








//screen  variables
    this.CameraView;
    this.Projection;//mat4
    
  //  this.CameraEye;// vec4
  /*
    vec4 FogColor;
    float FogNear;
    float FogFar;
*/

//object variables
    this.Transform;//mat4


  /*vec2 TexOffset;
    vec2 TexScale;
    vec4 Scale;

    vec4 BaseColor;
    vec4 Emission;
    float SpecularMix;
    float DiffuseMix;
    float Metallic;
    float DiffuseRoughness;
    float SpecularPower;
    float IncidentSpecular;

    int ColorReplace;
    int Lit;
*/


    this.Position ;//= { 0.0f, 0.0f, 0.0f, 1.0f };
    this.Color;// = { 0.0f, 0.0f, 0.0f, 1.0f };
    this.Direction;// = { 0.0f, 0.0f, -1.0f, 1.0f };

    //float Attenuation0 = 0.0f;
    //float Attenuation1 = 0.0f;
    //int FalloffEnabled = 1;
    //int Active = 0;


  }


  initialize(){

    this.loadShader(vert,frag,"DefaultShader");
    const program = this.shaderList["DefaultShader"];
     //program, uniformBlockName
    const screenBlockIndex =  this.gl.getUniformBlockIndex(program, "ScreenVariables");
    const objectBlockIndex = this.gl.getUniformBlockIndex(program, "ObjectVariables");
    const lightBlockIndex = this.gl.getUniformBlockIndex(program, "Lighting");

    this.createUBO(200,screenBlockIndex,"ScreenVariables");
    this.createUBO(100,objectBlockIndex ,"ObjectVariables");
    this.createUBO(100,lightBlockIndex,"Lighting");


//UniformBlockIndex  , dont know what it is
gl.uniformBlockBinding(program,screenBlockIndex ,0);
gl.uniformBlockBinding(program,objectBlockIndex,1);
gl.uniformBlockBinding(program,lightBlockIndex,2);

  }



  useShader(){






    this.gl.bindBuffer(gl.UNIFORM_BUFFER, this.bufferList["ScreenVariables"]);

    // Push some data to our Uniform Buffer

    this.gl.bufferData( gl.UNIFORM_BUFFER,this.getScreenBuffer(),gl.DYNAMIC_READ);
//console.log(this.getScreenBuffer());

    this.gl.bindBuffer(gl.UNIFORM_BUFFER, null);






    this.gl.bindBuffer(gl.UNIFORM_BUFFER, this.bufferList["ObjectVariables"]);

    // Push some data to our Uniform Buffer

    this.gl.bufferData( gl.UNIFORM_BUFFER,this.getObjectBuffer(),gl.DYNAMIC_READ);


    this.gl.bindBuffer(gl.UNIFORM_BUFFER, null);



    this.gl.bindBuffer(gl.UNIFORM_BUFFER, this.bufferList["Lighting"]);

    // Push some data to our Uniform Buffer

    this.gl.bufferData( gl.UNIFORM_BUFFER,this.getLightbuffer(),gl.DYNAMIC_READ);


    this.gl.bindBuffer(gl.UNIFORM_BUFFER, null);



  }











  setCameraView(mat){
    this.CameraView= new Float32Array(mat);


  }
  SetProjection(mat){
    this.Projection = new Float32Array(mat);
  }

  setTransform(mat){
    this.Transform =  new Float32Array(mat);
  }

  setLight(position,color,direction,){

    const pos = new Float32Array(position);
    const col =  new Float32Array(color);
    const dir = new Float32Array(direction);


    this.Position =pos;
    this.Color=col;
    this.Direction=dir;

  }

  getLightbuffer(){


  //  let lightBuffer = new ArrayBuffer(16*3);

    let lightBuffer = this.appendBuffer(this.Position.buffer,this.Color.buffer);
    lightBuffer = this.appendBuffer(lightBuffer, this.Direction.buffer);




    return lightBuffer;
  }

  getScreenBuffer(){
  //  let screenBuffer = new ArrayBuffer(4*4*4*2);

    let screenBuffer = this.appendBuffer(this.CameraView.buffer,this.Projection.buffer);





    return new Float32Array(screenBuffer);
  }

  getObjectBuffer(){
  //  let objBuffer = new ArrayBuffer(4*4*4);

    let objBuffer =this.Transform.buffer;


    return new Float32Array(objBuffer);


  }

appendBuffer(buffer1,buffer2){

  let temp = new Uint8Array(buffer1.byteLength+buffer2.byteLength);
  temp.set(new Uint8Array(buffer1),0);
  temp.set(new Uint8Array(buffer2),buffer1.byteLength);

  return temp.buffer;




}

loadShader(VertCode,FragCode,name)
{




  const Vert_Shader = this.gl.createShader(this.gl.VERTEX_SHADER);
  this.gl.shaderSource(Vert_Shader,VertCode);
  this.gl.compileShader(Vert_Shader);

  const messagev = this.gl.getShaderInfoLog(Vert_Shader);

  const Frag_Shader=this.gl.createShader(this.gl.FRAGMENT_SHADER);
  this.gl.shaderSource(Frag_Shader,FragCode);
  this.gl.compileShader(Frag_Shader);

  const messagef = this.gl.getShaderInfoLog(Frag_Shader);

  const Shader_Program= this.gl.createProgram();
  this.gl.attachShader(Shader_Program,Vert_Shader);
  this.gl.attachShader(Shader_Program,Frag_Shader);

  this.gl.linkProgram(Shader_Program);//why
  this.gl.useProgram(Shader_Program);


  console.log(messagev);
  this.shaderList[name] = Shader_Program;

}



createUBO(blockSize,uniformBlockIndex,name){

  const uboBuffer = gl.createBuffer();

    // Bind it to tell WebGL we are working on this buffer
    gl.bindBuffer(gl.UNIFORM_BUFFER, uboBuffer);

    // Allocate memory for our buffer equal to the size of our Uniform Block
    // We use dynamic draw because we expect to respecify the contents of the buffer frequently
    gl.bufferData(gl.UNIFORM_BUFFER, blockSize, gl.DYNAMIC_DRAW);



    // Unbind buffer when we're done using it for now
    // Good practice to avoid unintentionally working on it
    gl.bindBuffer(gl.UNIFORM_BUFFER, null);
    // Bind the buffer to a binding point
   // Think of it as storing the buffer into a special UBO ArrayList
   // The second argument is the index you want to store your Uniform Buffer in
   // Let's say you have 2 unique UBO, you'll store the first one in index 0 and the second one in index 1
   gl.bindBufferBase(gl.UNIFORM_BUFFER, uniformBlockIndex, uboBuffer);

   gl.bindBuffer(gl.UNIFORM_BUFFER, null);//????
   this.bufferList[name] = uboBuffer;


}





}
