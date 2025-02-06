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
  let vao =  this.resourceManager.meshList[name];
  this.gl.bindVertexArray(vao);

  }


  setUpShader(object,cam)
  {

     this.shader.setTransform(object.physicsComponent.modelMatrix.transpose().m);
    // console.log(scene.list[i].physicsComponent.modelMatrix.transpose().m);
     this.shader.setCameraView(cam.getViewMatrix().transpose().m );

  //  console.log(cam.getViewMatrix().transpose().m );
     this.shader.SetProjection(cam.getProjectionMatrix().transpose().m);
     this.shader.setLight([-60,100,-30,1],[0,0,1,1],[1,1,0,1]);


     this.shader.useShader();












  }

  render(scene,camera)
  {

    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.clearColor(0.330, 0.330, 0.330, 1.0);

    //this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.clearDepth(1.0);


     this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);



    for (let i = 0; i < scene.list.length; i++)
    {
      //frutsum culling could save some time

      const object = scene.list[i];

      this.useMesh( object.graphicsComponent.mesh);
      this.setUpShader( object,camera);
      this.setUpBuffers( object.graphicsComponent.mesh);



    //  this.gl.drawElements(primitiveType, count, indexType, offset);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.cullFace(this.gl.BACK);
    this.gl.drawElements(this.gl.TRIANGLES, this.count, this.gl.UNSIGNED_SHORT, 0);

    }



  }


}
