export default class Ball {
  constructor(gameHeight, gameWidth) {
    this.imgBall = document.getElementById("gameball");
    this.baseVel = 5;
    this.position = {
      x: gameWidth / 2 - Math.random() * 40,
      y: gameHeight / 2 - Math.random() * 40,
    };
    this.speed = {
      x: Math.random() * 3 + this.baseVel,
      y: Math.random() * 3 + this.baseVel,
    };
    this.gameHeight = gameHeight;
    this.gameWidth = gameWidth;
    this.size = 24;
  }

  checkCollision(box) {
    if (
      box.position.x <= this.position.x &&
      this.position.x <= box.position.x + box.width &&
      box.position.y <= this.position.y &&
      this.position.y <= box.position.y + box.height
    ) {
      console.log(
        "collision occur ",
        box.position,
        this.position,
        box.position.y <= box.position.y + box.height
      );
      return true;
    }
    return false;
  }
  normalize(vec) {
    let mag = Math.sqrt(Math.pow(vec.x, 2) + Math.pow(vec.x, 2));
    return [{ x: vec.x / mag, y: vec.y / mag }, mag];
  }
  reflect(xspeed = 0, ncap = { x: 0, y: 1 }) {
    let rcap = { x: 0, y: 0 };
    let [dcap, mag] = this.normalize(this.speed);
    let ddotn = dcap.x * ncap.x + dcap.y * ncap.y;
    rcap.x = dcap.x - 2 * ddotn * ncap.x;
    rcap.y = dcap.y - 2 * ddotn * ncap.y;
    this.speed = { x: rcap.x * mag, y: rcap.y * mag };
    this.speed.x += xspeed;
  }
  draw(ctx) {
    ctx.drawImage(
      this.imgBall,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
  checkIsOver() {
    if (this.position.y < 0) {
      return 1;
    }
    if (this.position.y > this.gameHeight) {
      return 2;
    }
    return 0;
  }
  update() {
    if (this.speed.x > 2 * this.baseVel) {
      this.speed.x = 2 * this.baseVel;
    }
    if (this.speed.y > 2 * this.baseVel) {
      this.speed.y = 2 * this.baseVel;
    }
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
  }
}
