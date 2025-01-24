

class GraphicsComponent
{
  constructor(meshName,shaderName)
    {
      this.mesh = meshName;
      this.shader = shaderName;

      this.modelMatrix = [1,0 ,0, 0,
                          0 ,1 ,0 ,0,
                          0 ,0 ,1 ,0,
                          0 ,0 ,0 ,1];

    }



    updateModel(body){

      this.modelMatrix = [1 ,0 ,0 ,body.position.x,
                          0 ,1 ,0 ,body.position.y,
                          0 ,0 ,1 ,-50,
                          0 ,0 ,0 ,1];


    }







}
