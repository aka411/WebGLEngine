'use strict'

class WebGLRenderer
{

  constructor(gl,res,shaderManager){
    this.gl = gl;
    this.resourceManager=res;
    this.count = 0 ;
    this.shader = shaderManager;


  }



  setUpBuffers(name)
  {

    const indexBuffer = this.resourceManager.indexList[name];
    const positionBuffer = this.resourceManager.verticeList[name];

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, positionBuffer);
    this.count = this.resourceManager.countList[name];




  }

  useMesh(name)
  {
    //webgl specific mesh setup code
  const vao =  this.resourceManager.meshList[name];
  this.gl.bindVertexArray(vao);

  }

  setUpGlobalUniforms(scene,cam){


    this.shader.setCameraView(cam.getViewMatrix().transpose().m );
    this.shader.SetProjection(cam.getProjectionMatrix().transpose().m);
    this.shader.setCameraEye([cam.position.x,cam.position.y,cam.position.z,1]);//may need change

    this.shader.addLight(scene.lightList[0].position,scene.lightList[0].color);






  }


  setUpObjectUniforms(object,cam)
  {

     this.shader.setTransform(object.physicsComponent.modelMatrix.transpose().m);
     this.shader.setBaseColor(object.graphicsComponent.baseColor);

    // console.log(scene.list[i].physicsComponent.modelMatrix.transpose().m);

this.shader.useShader();



  }

  render(scene,camera)
  {

    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clearColor(77/255,117/255,154/255, 1.0);

    //this.gl.clear(this.gl.COLOR_BUFFER_BIT);
     this.gl.clearDepth(1.0);
     this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

     this.gl.enable(this.gl.CULL_FACE);
     this.gl.cullFace(this.gl.BACK);

     this.setUpGlobalUniforms(scene,camera);


    for (let i = 0; i < scene.list.length; i++)
    {
      //frutsum culling could save some time

      const object = scene.list[i];

      this.useMesh( object.graphicsComponent.mesh);
      this.setUpObjectUniforms( object,camera);
      this.setUpBuffers( object.graphicsComponent.mesh);



    //  this.gl.drawElements(primitiveType, count, indexType, offset);

    this.gl.drawElements(this.gl.TRIANGLES, this.count, this.gl.UNSIGNED_SHORT, 0);

    }



  }


}
