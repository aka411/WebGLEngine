'use strict'

class WebGLResourceManager
{
  constructor(gl)
  {
    this.gl = gl;


    this.meshList = new Map();
    this.indexList=new Map();
    this.verticeList = new Map();
    this.countList = new Map();



  }


  loadMesh(positions,index,name)
  {

//var positionAttributeLocation = this.gl.getAttribLocation(program, "a_position");//remove

// Create a buffer and put three 2d clip space points in it
let positionBuffer = this.gl.createBuffer();

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
this.gl.enableVertexAttribArray(0);

// Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
var size = 3;          // 2 components per iteration
var type = this.gl.FLOAT;   // the data is 32bit floats
var normalize = false; // don't normalize the data
var stride = 6 * 4;        // 0 = move forward size * sizeof(type) each iteration to get the next position
var offset = 0;        // start at the beginning of the buffer
this.gl.vertexAttribPointer(
    0, size, type, normalize, stride, offset);


    this.gl.enableVertexAttribArray(1);

    // Tell the attribute how to get data out of positionBuffer (ARRAY_BUFFER)
    var size = 3;          // 2 components per iteration
    var type = this.gl.FLOAT;   // the data is 32bit floats
    var normalize = false; // don't normalize the data
    var stride = 6 * 4;        // 0 = move forward size * sizeof(type) each iteration to get the next position
    var offset = 3 * 4;        // start at the beginning of the buffer
    this.gl.vertexAttribPointer(
        1, size, type, normalize, stride, offset);


this.meshList[name] = vao;
this.indexList[name] = indexBuffer;
this.verticeList[name] = positionBuffer ;
this.countList[name] = index.length;

  }










}
