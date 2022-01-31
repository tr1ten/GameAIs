import Car from "../src/car.js";
import InputHandler from "../src/inputhandler.js";
import Ball from "./ball.js";
import Computer from "./computer.js";
let gamescreen = document.getElementById("gamescreen");
let infoTag = document.getElementById("info");
let compScore = document.getElementById("computer")
let userScore = document.getElementById("user")

let ctx = gamescreen.getContext("2d");

const GAME_WIDTH = 600;
const GAME_HEIGHT = 500;
let carH = 20;
let carW = 100;
let car = new Car(GAME_WIDTH, GAME_HEIGHT, carH, carW, {
  x: GAME_WIDTH / 2 - carW / 2,
  y: GAME_HEIGHT - carH - 10,
});
let oppCar = new Car(GAME_WIDTH, GAME_HEIGHT, carH, carW, {
  x: GAME_WIDTH / 2 - carW / 2,
  y: 10,
});
let oppCarComp = new Computer(oppCar);
let lastTime = 0;
new InputHandler(car);
let isStarted = false;
function showInfo(message)
{
  infoTag.innerText = message;
}
// new InputHandler(oppCar,{right:"d",left:"a"})
let ball = new Ball(GAME_HEIGHT, GAME_WIDTH);
function restart() {
  showInfo("Press any key to start!")
  isStarted = false;
  document.addEventListener("keydown", (e) => {
    console.log("keydown ", e.key);
    showInfo("");
    isStarted = true;
    document.onkeydown = null;
  });
  car.speed = 0;
  oppCar.speed = 0;
  ball.position = {
    x: (Math.random() + 0.1) * GAME_WIDTH,
    y: 40,
  };
  ball.speed = {
    x: Math.random() * ball.baseVel + 3,
    y: Math.random() * 3 + ball.baseVel,
  };
}
function gameLoop(timestamp) {
  if (isStarted) {
    switch (ball.checkIsOver()) {
      case 1:
        userScore.innerText = parseInt(userScore.innerText) + 1;
        restart();
        break;
    case 2:
      compScore.innerText = parseInt(compScore.innerText) + 1;
      restart();
      break;
      default:
        break;
    }
    if (ball.checkCollision(car)) {
      ball.reflect(car.speed * 0.1);
    }
    if (ball.checkCollision(oppCar)) {
      ball.reflect(oppCar.speed * 0.1, { x: 0, y: -1 });
    }
    if (ball.position.x > GAME_WIDTH) {
      ball.reflect(0, { x: -1, y: 0 });
    }
    if (ball.position.x < 0) {
      ball.reflect(0, { x: 1, y: 0 });
    }

    let dt = timestamp - lastTime;
    lastTime = timestamp;
    ball.update();
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ball.draw(ctx);
    oppCar.draw(ctx);
    oppCarComp.update(ball.position.x);
    oppCar.update(ctx);
    car.draw(ctx);
    car.update(dt);
  }
  requestAnimationFrame(gameLoop);
}
restart();
requestAnimationFrame(gameLoop);
