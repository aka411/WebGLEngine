class Light{

  constructor(){
    this.position ;//= { 0.0f, 0.0f, 0.0f, 1.0f };
    this.color;// = { 0.0f, 0.0f, 0.0f, 1.0f };
    this.direction;// = { 0.0f, 0.0f, -1.0f, 1.0f };


  }

  setColor(color){
    this.color = color;

  }
  setPosition(pos){
    this.position = pos;

  }
  setDirection(dir){
    this.direction = dir;

  }



}
