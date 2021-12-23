const prompt = require('prompt-sync')({ sigint: true });

class Field {
  constructor() {
    this.hat = '^';
    this.hole = 'O';
    this.fieldCharacter = '░';
    this.pathCharacter = '*';
    this.fieldArray = [];
    this.playing = true;
    this.x = 0;
    this.y = 0;
    this.hardMode = false;
  }

  playGame() {
    let mode = prompt('Which mode? ');
    mode == "hard" ? this.hardMode = true : console.log('Easy mode on');
    while (this.playing) {
      this.printMap();
      this.move();
      this.checkWinLoss();
    }
  }

  printMap() {
    for (let i = 0; i < this.fieldArray.length; i++)
      console.log(this.fieldArray[i].join(''));
  }

  move() {
    let way = prompt('Which way? ');
    switch (way) {
      case "w":
        this.y -= 1;
        break;
      case "s":
        this.y += 1;
        break;
      case "a":
        this.x -= 1;
        break;
      case "d":
        this.x += 1;
        break;
      default:
        console.log("Wrong Input, end the game!");
        this.playing = false;
    }
    if (this.hardMode == true) {
      this.hardMove();
    }
  }

  hardMove() {
    let randomYIndex = Math.floor(Math.random() * this.fieldArray.length);
    let randomXIndex = Math.floor(Math.random() * this.fieldArray[randomYIndex].length);
    this.fieldArray[randomYIndex][randomXIndex] = this.hole;
  }

  checkWinLoss() {
    if (this.y < 0 || this.x < 0 || this.y >= this.fieldArray.length || this.x >= this.fieldArray[this.y].length) {
      console.log(`Out of bounds instruction`);
      this.playing = false;
    } else if (this.fieldArray[this.y][this.x] == this.hole) {
      console.log(`Sorry, you fell down a hole`);
      this.playing = false;
    } else if (this.fieldArray[this.y][this.x] == this.hat) {
      console.log(`You win, you found your hat`);
      this.playing = false;
    } else if (this.fieldArray[this.y][this.x] == this.fieldCharacter) {
      this.fieldArray[this.y][this.x] = this.pathCharacter;
    }
  }

  generateField(x, y, percentage) {
    this.fieldArray = new Array(y).fill(0).map(i => new Array(x))
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        percentage > Math.random() ?
          this.fieldArray[i][j] = this.fieldCharacter :
          this.fieldArray[i][j] = this.hole;
      }
    }
    let hatX = Math.floor(Math.random() * x);
    let hatY = Math.floor(Math.random() * y);
    this.fieldArray[hatY][hatX] = this.hat;
    
    let pathX = Math.floor(Math.random() * x);
    let pathY = Math.floor(Math.random() * y);
    this.x = pathX;
    this.y = pathY;
    this.fieldArray[pathY][pathX] = this.pathCharacter;
    // generateField(x, y, percentage) {
    //   const mapObject = [this.hole, this.fieldCharacter];
    //   let checkMap = 0;
    //   while (checkMap < y) {
    //     let randomXField = [];
    //     for (let j = 0; j < x; j++) {
    //       let randomObject = mapObject[Math.floor(Math.random() * mapObject.length)];
    //       randomXField.push(randomObject);
    //     }
    //     const checkArray = randomXField.filter(el => el === this.fieldCharacter);
    //     if (checkArray.length / randomXField.length >= percentage) {
    //       this.fieldArray.push(randomXField);
    //       checkMap++;
    //     }
    //   }
    //   this.fieldArray[0][0] = this.pathCharacter;
    //   this.fieldArray[y - 2][x - 2] = this.hat;
  }
}

const myField = new Field();
myField.generateField(6, 4, 0.8);
myField.playGame();