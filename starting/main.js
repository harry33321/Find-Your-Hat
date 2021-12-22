const prompt = require('prompt-sync')({ sigint: true });

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let playing = true
let x = 0
let y = 0

class Field {
  constructor() {
    this.fieldArray = []
    // this.playing = true
  }

  print() {
    for (let i = 0; i < this.fieldArray.length; i++)
      console.log(this.fieldArray[i].join(''))
  }

  checkWinLoss() {
    if (myField.fieldArray[y][x] == hole) {
      console.log(`Sorry, you fell down a hole`);
      this.playing = false
    } else if (myField.fieldArray[y][x] == hat) {
      console.log(`Congrats, you found your hat`);
      this.playing = false
    } else if (myField.fieldArray[y][x] == fieldCharacter) {
      myField.fieldArray[y][x] = pathCharacter
    }
  }

  // playGame() {
  //   while (this.playing) {
  //     this.print()
  //     let way = prompt('Which way? ');
  //     try {
  //       if (way == "U") {
  //         y -= 1
  //         if (myField.fieldArray[y][x] == hole) {
  //           console.log(`Sorry, you fell down a hole`);
  //           this.playing = false
  //         } else if (myField.fieldArray[y][x] == hat) {
  //           console.log(`Congrats, you found your hat`);
  //           this.playing = false
  //         } else if (myField.fieldArray[y][x] == fieldCharacter) {
  //           myField.fieldArray[y][x] = pathCharacter
  //         } else {
  //           console.log(`Out of bounds instruction`);
  //           this.playing = false
  //         }
  //       } else if (way == "D") {
  //         y += 1
  //         if (myField.fieldArray[y][x] == hole) {
  //           console.log(`Sorry, you fell down a hole`);
  //           this.playing = false
  //         } else if (myField.fieldArray[y][x] == hat) {
  //           console.log(`Congrats, you found your hat`);
  //           this.playing = false
  //         } else if (myField.fieldArray[y][x] == fieldCharacter) {
  //           myField.fieldArray[y][x] = pathCharacter
  //         } else {
  //           console.log(`Out of bounds instruction`);
  //           this.playing = false
  //         }
  //       } else if (way == "L") {
  //         x -= 1
  //         if (myField.fieldArray[y][x] == hole) {
  //           console.log(`Sorry, you fell down a hole`);
  //           this.playing = false
  //         } else if (myField.fieldArray[y][x] == hat) {
  //           console.log(`Congrats, you found your hat`);
  //           this.playing = false
  //         } else if (myField.fieldArray[y][x] == fieldCharacter) {
  //           myField.fieldArray[y][x] = pathCharacter
  //         } else {
  //           console.log(`Out of bounds instruction`);
  //           this.playing = false
  //         }
  //       } else if (way == "R"){
  //         x += 1
  //         if (myField.fieldArray[y][x] == hole) {
  //           console.log(`Sorry, you fell down a hole`);
  //           this.playing = false
  //         } else if (myField.fieldArray[y][x] == hat) {
  //           console.log(`Congrats, you found your hat`);
  //           this.playing = false
  //         } else if (myField.fieldArray[y][x] == fieldCharacter) {
  //           myField.fieldArray[y][x] = pathCharacter
  //         } else {
  //           console.log(`Out of bounds instruction`);
  //           this.playing = false
  //         }
  //       } else {
  //         console.log(`Wrong input, exit the game.`)
  //         this.playing = false
  //       }
  //     } catch(e) {
  //       console.log(`Out of bounds instruction`);
  //       this.playing = false
  //     }
  //   }
  // }

  generateField(x, y) {
    const mapObject = [hole, fieldCharacter]
    let checkMap = 0
    let randomField = []
    while (checkMap < y) {
      let randomXField = []
      for (let j = 0; j < x; j++) {
        let randomObject = mapObject[Math.floor(Math.random() * mapObject.length)]
        randomXField.push(randomObject)
      }
      const checkArray = randomXField.filter(el => el === fieldCharacter);
      if (checkArray.length / randomXField.length >= 0.7) {
        this.fieldArray.push(randomXField)
        checkMap++
      }
    }
    this.fieldArray[0][0] = pathCharacter
    this.fieldArray[y - 2][x - 2] = hat
  }
}

const myField = new Field();
myField.generateField(10, 5)
// myField.playGame()

while (playing) {
  myField.print()
  let way = prompt('Which way? ');
  try {
    if (way == "U") {
      y -= 1
      if (myField.fieldArray[y][x] == hole) {
        console.log(`Sorry, you fell down a hole`);
        playing = false
      } else if (myField.fieldArray[y][x] == hat) {
        console.log(`Congrats, you found your hat`);
        playing = false
      } else if (myField.fieldArray[y][x] == fieldCharacter) {
        myField.fieldArray[y][x] = pathCharacter
      } else {
        console.log(`Out of bounds instruction`);
        playing = false
      }
    } else if (way == "D") {
      y += 1
      if (myField.fieldArray[y][x] == hole) {
        console.log(`Sorry, you fell down a hole`);
        playing = false
      } else if (myField.fieldArray[y][x] == hat) {
        console.log(`Congrats, you found your hat`);
        playing = false
      } else if (myField.fieldArray[y][x] == fieldCharacter) {
        myField.fieldArray[y][x] = pathCharacter
      } else {
        console.log(`Out of bounds instruction`);
        playing = false
      }
    } else if (way == "L") {
      x -= 1
      if (myField.fieldArray[y][x] == hole) {
        console.log(`Sorry, you fell down a hole`);
        playing = false
      } else if (myField.fieldArray[y][x] == hat) {
        console.log(`Congrats, you found your hat`);
        playing = false
      } else if (myField.fieldArray[y][x] == fieldCharacter) {
        myField.fieldArray[y][x] = pathCharacter
      } else {
        console.log(`Out of bounds instruction`);
        playing = false
      }
    } else if (way == "R") {
      x += 1
      if (myField.fieldArray[y][x] == hole) {
        console.log(`Sorry, you fell down a hole`);
        playing = false
      } else if (myField.fieldArray[y][x] == hat) {
        console.log(`Congrats, you found your hat`);
        playing = false
      } else if (myField.fieldArray[y][x] == fieldCharacter) {
        myField.fieldArray[y][x] = pathCharacter
      } else {
        console.log(`Out of bounds instruction`);
        playing = false
      }
    } else {
      console.log(`Wrong input, exit the game.`)
      playing = false
    }
  } catch (e) {
    console.log(`Out of bounds instruction`);
    playing = false
  }
}