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
      const myfood = new Food();
      this.foodArr.push(myfood);
    }, 2000);

    //move all obstacles
    setInterval(() => {
      this.foodArr.forEach((foodInstance) => {
        foodInstance.moveDown();
        this.detectCollision(foodInstance);
        this.removeFoodIfOutside(foodInstance);
        this.createFood(foodInstance);
      });
    }, 20);
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
    if (foodInstance.positionY <= 0) {
      foodInstance.foodElm.remove();

      this.foodArr.shift(foodInstance);
    }
  }
}

class Player {
  constructor() {
    this.width = 20;
    this.height = 27;
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

class Food {
  constructor() {
    this.width = 9;
    this.height = 19;
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
  /*createFood() {
    return Math.floor(Math.random() * 4);
  }*/
}

const game = new Game();
game.start();
