const prompt = require('prompt-sync')({ sigint: true });

class Character {
  constructor() {
    this.hat = '^';
    this.hole = 'O';
    this.fieldCharacter = '░';
    this.pathCharacter = '*';
  }
}

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class FindYourHat {
  constructor(fieldArray) {
    this.char = new Character()
    this.pos = new Position(0, 0)
    this.fieldArray = fieldArray;
    this.playing = true;
    this.hardMode = false;
  }

  playGame() {
    this.createChar()
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

  createChar() {
    let hatY = Math.floor(Math.random() * this.fieldArray.length);
    let hatX = Math.floor(Math.random() * this.fieldArray[hatY].length);
    this.fieldArray[hatY][hatX] = this.char.hat;

    let pathY = Math.floor(Math.random() * this.fieldArray.length);
    let pathX = Math.floor(Math.random() * this.fieldArray[pathY].length);
    this.pos.x = pathX;
    this.pos.y = pathY;
    this.fieldArray[pathY][pathX] = this.char.pathCharacter;
  }

  move() {
    let way = prompt('Which way? ');
    switch (way) {
      case "w":
        this.pos.y -= 1;
        break;
      case "s":
        this.pos.y += 1;
        break;
      case "a":
        this.pos.x -= 1;
        break;
      case "d":
        this.pos.x += 1;
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
    while (this.fieldArray[randomYIndex][randomXIndex] == this.char.hat || this.fieldArray[randomYIndex][randomXIndex] == this.char.hole) {
      randomYIndex = Math.floor(Math.random() * this.fieldArray.length);
      randomXIndex = Math.floor(Math.random() * this.fieldArray[randomYIndex].length);
    }
    this.fieldArray[randomYIndex][randomXIndex] = this.char.hole;
  }

  checkWinLoss() {
    if (this.pos.y < 0 || this.pos.x < 0 || this.pos.y >= this.fieldArray.length || this.pos.x >= this.fieldArray[this.pos.y].length) {
      console.log(`Out of bounds instruction`);
      this.playing = false;
    } else if (this.fieldArray[this.pos.y][this.pos.x] == this.char.hole) {
      console.log(`Sorry, you fell down a hole`);
      this.playing = false;
    } else if (this.fieldArray[this.pos.y][this.pos.x] == this.char.hat) {
      console.log(`You win, you found your hat`);
      this.playing = false;
    } else if (this.fieldArray[this.pos.y][this.pos.x] == this.char.fieldCharacter) {
      this.fieldArray[this.pos.y][this.pos.x] = this.char.pathCharacter;
    }
  }
}

class Field {
  static generateField(x, y, percentage, char) {
    let mapArray = new Array(y).fill(0).map(i => new Array(x))
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        percentage > Math.random() ?
          mapArray[i][j] = char.fieldCharacter :
          mapArray[i][j] = char.hole;
      }
    }
    return mapArray
  }
  // generateField(x, y, percentage) {
  //   this.fieldArray = new Array(y).fill(0).map(i => new Array(x))
  //   for (let i = 0; i < y; i++) {
  //     for (let j = 0; j < x; j++) {
  //       percentage > Math.random() ?
  //         this.fieldArray[i][j] = this.fieldCharacter :
  //         this.fieldArray[i][j] = this.hole;
  //     }
  //   }
  // }
  //   generateField(x, y, percentage) {
  //     const mapObject = [this.hole, this.fieldCharacter];
  //     let checkMap = 0;
  //     while (checkMap < y) {
  //       let randomXField = [];
  //       for (let j = 0; j < x; j++) {
  //         let randomObject = mapObject[Math.floor(Math.random() * mapObject.length)];
  //         randomXField.push(randomObject);
  //       }
  //       const checkArray = randomXField.filter(el => el === this.fieldCharacter);
  //       if (checkArray.length / randomXField.length >= percentage) {
  //         this.fieldArray.push(randomXField);
  //         checkMap++;
  //       }
  //     }
  // }
}

const char = new Character();
const genField = Field.generateField(6, 4, 0.8, char)
const myGame = new FindYourHat(genField);
// myField.generateField(6, 4, 0.8);
myGame.playGame();