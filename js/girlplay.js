const board = document.getElementById("game-board");

class Game {
  constructor() {
    this.player = null;
    this.foodArr = [];
    this.foodInstance = [];
  }
  start() {
    this.player = new Player();

    this.attachEventListeners();

    //create new obstacles
    setInterval(() => {
      const myfood = new food();
      this.foodArr.push(myfood);
    }, 2000);

    //move all obstacles
    setInterval(() => {
      this.foodArr.forEach((foodInstance) => {
        foodInstance.moveDown();
        this.detectCollision(foodInstance);
        this.removeFoodIfOutside(foodInstance);
      });
    }, 100);
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
  detectCollision(foodInstance) {
    if (
      this.player.positionX < foodInstance.positionX + foodInstance.width &&
      this.player.positionX + this.player.width > foodInstance.positionX &&
      this.player.positionY < foodInstance.positionY + foodInstance.height &&
      this.player.height + this.player.positionY > foodInstance.positionY
    ) {
      //console.log("game over my fren!");
      window.location.href = "./gameover.html";
    }
  }
  removeFoodIfOutside(foodInstance) {
    if (foodInstance.positionY < 0) {
      foodInstance.foodElm.remove();
      this.foodsArr.shift();
    }
  }
}

class Player {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 0;
    this.positionY = 0;
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

class food {
  constructor() {
    this.width = 20;
    this.height = 10;
    this.positionX = 50 - this.width / 2;
    this.positionY = 100;
    this.foodElm = null; //will store a dom element

    this.createDomElement();
  }
  createDomElement() {
    this.foodElm = document.createElement("div");

    this.foodElm.className = "food";
    this.foodElm.style.width = this.width + "vw";
    this.foodElm.style.height = this.height + "vh";
    this.foodElm.style.left = this.positionX + "vw";

    const boardElm = document.getElementById("board");
    boardElm.appendChild(this.foodElm);
  }
  moveDown() {
    this.positionY--;
    this.foodElm.style.bottom = this.positionY + "vh";
  }
}

const game = new Game();
game.start();
