'use strict'

class WebGLRenderer
{

  constructor(gl,res){
    this.gl = gl;
    this.resourceManager=res;
    this.count = 0 ;


  }

 drawCircle(radius,postion,color)
  {


  }

  setUpBuffers(name)
  {

    const indexBuffer = this.resourceManager.indexList[name];
    const positionBuffer = this.resourceManager.verticeList[name];

    this.gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.count = this.resourceManager.countList[name];




  }

  useMesh(name)
  {
    //webthis.gl specific mesh setup code
  let vao =  this.resourceManager.meshList[name];
  this.gl.bindVertexArray(vao);

  }


  useShader(name,scene,i)
  {

    let modelMatrix = scene.list[i].graphicsComponent.modelMatrix;


    //add error handling
    this.gl.useProgram(this.resourceManager.shaderList[name]);
    let model = this.gl.getUniformLocation(this.resourceManager.shaderList[name], "modelMatrix");
    let camera = this.gl.getUniformLocation(this.resourceManager.shaderList[name], "cameraMatrix");

    let cameraMatrix = scene.camera.getCameraMatrix();

    this.gl.uniformMatrix4fv(model,true,modelMatrix);
    this.gl.uniformMatrix4fv(camera,true,cameraMatrix);





  }

  render(scene)
  {
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
    this.gl.clear(gl.COLOR_BUFFER_BIT);

    for (let i = 0; i < scene.list.length; i++)
    {

      this.useMesh(scene.list[i].graphicsComponent.mesh);
      this.useShader(scene.list[i].graphicsComponent.shader,scene,i);
      this.setUpBuffers(scene.list[i].graphicsComponent.mesh);

    //  this.gl.drawElements(primitiveType, count, indexType, offset);

      this.gl.drawElements(this.gl.TRIANGLES, this.count, this.gl.UNSIGNED_SHORT, 0);

    }



  }


}
