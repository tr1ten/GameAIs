export default class Car {
  constructor(gameWidth, gameHeight,h,w,position) {
    this.gameWidth = gameWidth;
    this.width = w;
    this.height = h;
    this.speed = 0;
    this.acc = 0.5;
    this.position = position;
  }
  draw(ctx) {
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  moveRight()
  {
    this.acc = Math.abs(this.acc);
    this.speed = 5 + this.acc ;
  }
  moveLeft()
  {
      this.acc = Math.abs(this.acc)*-1;
      this.speed = -5 + this.acc;

  }
  stop()
  {
      this.speed = 0;
  }
  update(dt)
  {
      if(!dt) return;
      
      this.position.x +=this.speed;
      if(this.position.x<0) this.position.x=0;
      if(this.position.x+this.width>this.gameWidth) this.position.x=this.gameWidth-this.width;
  }
}
