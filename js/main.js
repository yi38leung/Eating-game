class Game {
  constructor() {
    this.player = null;
    this.obstaclesArr = []; //will store instances of the class Obstacle
  }
  start() {
    this.player = new Player();

    this.attachEventListeners();

    //create new obstacles
    setInterval(() => {
      const myObstacle = new Obstacle();
      this.obstaclesArr.push(myObstacle);
    }, 2000);

    //move all obstacles
    setInterval(() => {
      this.obstaclesArr.forEach((obstacleInstance) => {
        obstacleInstance.moveDown();
        this.detectCollision(obstacleInstance);
      });
    }, 16);
  }
  attachEventListeners() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.player.moveLeft();
      } else if (e.key === "ArrowRight") {
        this.player.moveRight();
      }
    });
  }
  detectCollision(obstacleInstance) {
    if (
      this.player.positionX <
        obstacleInstance.positionX + obstacleInstance.width &&
      this.player.positionX + this.player.width > obstacleInstance.positionX &&
      this.player.positionY <
        obstacleInstance.positionY + obstacleInstance.height &&
      this.player.height + this.player.positionY > obstacleInstance.positionY
    ) {
      //console.log("game over my fren!");
      window.location.href = "./gameover.html";
    }
  }
}

class Player {
  constructor() {
    this.positionX = 0;
    this.positionY = 0;
    this.width = 20;
    this.height = 10;
    this.playerElm = document.getElementById("player");

    this.playerElm.style.width = this.width + "vw";
    this.playerElm.style.height = this.height + "vh";
  }
  moveLeft() {
    this.positionX--;
    this.playerElm.style.left = this.positionX + "vw";
  }
  moveRight() {
    this.positionX++;
    this.playerElm.style.left = this.positionX + "vw";
  }
}

class Obstacle {
  constructor() {
    this.positionX = 50;
    this.positionY = 100;
    this.width = 20;
    this.height = 10;
    this.obstacleElm = null; //will store a dom element

    this.createDomElement();
  }
  createDomElement() {
    // step1: create the element
    this.obstacleElm = document.createElement("div");

    // step2: add content (ex. innerText) and/or modify attributes
    this.obstacleElm.className = "obstacle";
    this.obstacleElm.style.width = this.width + "vw";
    this.obstacleElm.style.height = this.height + "vh";
    this.obstacleElm.style.left = this.positionX + "vw";

    //step3: append to the dom
    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.obstacleElm);
  }
  moveDown() {
    this.positionY--;
    this.obstacleElm.style.bottom = this.positionY + "vh";
  }
}

const game = new Game();
game.start();
