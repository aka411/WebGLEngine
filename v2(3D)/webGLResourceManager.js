'use strict'

class WebGLResourceManager
{
  constructor(gl)
  {
    this.gl = gl;

    this.shaderList = new Map();
    this.meshList = new Map();
    this.indexList=new Map();
    this.verticeList = new Map();
    this.countList = new Map();

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

  loadMesh(positions,index,name,shaderName)
  {
    const program = this.shaderList[shaderName];
var positionAttributeLocation = this.gl.getAttribLocation(program, "a_position");

// Create a buffer and put three 2d clip space points in it
var positionBuffer = this.gl.createBuffer();

// Bind it to ARRAY_BUFFER (think of it as ARRAY_BUFFER = positionBuffer)
this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);


this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

// create the buffer
const indexBuffer = gl.createBuffer();

// make this buffer the current 'ELEMENT_ARRAY_BUFFER'
gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

// Fill the current element array buffer with data

gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(index),
    gl.STATIC_DRAW
);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);


    // loading mesh and creation of vaos etc
    var vao = this.gl.createVertexArray();

// and make it the one we're currently working with
this.gl.bindVertexArray(vao);

// Turn on the attribute
this.gl.enableVertexAttribArray(positionAttributeLocation);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 3;          // 2 components per iteration
var type = this.gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer
this.gl.vertexAttribPointer(
    positionAttributeLocation, size, type, normalize, stride, offset);


this.meshList[name] = vao;
this.indexList[name] = indexBuffer;
this.verticeList[name] = positionBuffer ;
this.countList[name] = index.length;

  }




}
