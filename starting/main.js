const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
  constructor() {
    this.fieldArray = []
    this.playing = true
    this.x = 0
    this.y = 0
    this.hardMode = false
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
      console.log(this.fieldArray[i].join(''))
  }

  move() {
    let way = prompt('Which way? ');
    switch (way) {
      case "w":
        this.y -= 1
        break
      case "s":
        this.y += 1
        break
      case "a":
        this.x -= 1
        break
      case "d":
        this.x += 1
        break
      default:
        console.log("Wrong Input, end the game!")
        this.playing = false
    }
    if (this.hardMode == true) {
      this.hardMove()
    }
  }

  hardMove() {
    let randomYIndex = Math.floor(Math.random() * this.fieldArray.length)
    let randomXIndex = Math.floor(Math.random() * this.fieldArray[randomYIndex].length)
    this.fieldArray[randomYIndex][randomXIndex] = hole
  }

  checkWinLoss() {
    if (this.y < 0 || this.x < 0 || this.y >= this.fieldArray.length || this.x >= this.fieldArray[this.y].length) {
      console.log(`Out of bounds instruction`);
      this.playing = false
    } else if (this.fieldArray[this.y][this.x] == hole) {
      console.log(`Sorry, you fell down a hole`);
      this.playing = false
    } else if (this.fieldArray[this.y][this.x] == hat) {
      console.log(`Congrats, you found your hat`);
      this.playing = false
    } else if (this.fieldArray[this.y][this.x] == fieldCharacter) {
      this.fieldArray[this.y][this.x] = pathCharacter
    }
  }

  generateField(x, y, percentage) {
    this.fieldArray = new Array(y).fill(0).map(i => new Array(x))
    for (let i = 0; i < y; i++) {
      for (let j = 0; j < x; j++) {
        percentage > Math.random() ?
          this.fieldArray[i][j] = fieldCharacter :
          this.fieldArray[i][j] = hole
      }
    }
    let a = Math.floor(Math.random() * x)
    let b = Math.floor(Math.random() * y)
    this.x = a
    this.y = b
    this.fieldArray[b][a] = pathCharacter
    this.fieldArray[y - 2][x - 2] = hat
    // generateField(x, y, percentage) {
    //   const mapObject = [hole, fieldCharacter]
    //   let checkMap = 0
    //   while (checkMap < y) {
    //     let randomXField = []
    //     for (let j = 0; j < x; j++) {
    //       let randomObject = mapObject[Math.floor(Math.random() * mapObject.length)]
    //       randomXField.push(randomObject)
    //     }
    //     const checkArray = randomXField.filter(el => el === fieldCharacter);
    //     if (checkArray.length / randomXField.length >= percentage) {
    //       this.fieldArray.push(randomXField)
    //       checkMap++
    //     }
    //   }
    //   this.fieldArray[0][0] = pathCharacter
    //   this.fieldArray[y - 2][x - 2] = hat
    }
  }

  // const myField = new Field(Field.generateField(6, 4, 0.8));
  const myField = new Field();
  myField.generateField(6, 4, 0.8)
  myField.playGame()