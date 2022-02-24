const prompt = require('prompt-sync')({ sigint: true });
const Field = require('./Field.js');
const Player = require('./Player.js');

class FindYourHat {

  constructor(field) {
    this.field = field;
    this.player = new Player(0, 0, field);
    this.fieldArray = field.mapArray;
    this.gameStatus = true;

    this.gameStart();
  }

  gameStart() {
    this.field.generateFieldObject();
    this.player = this.field.generatePlayerPosition(this.player);

    let mode = prompt('Which mode? ');
    mode == "hard" ? this.player.hardMode = true : console.log('Easy mode on');
    while (this.gameStatus) {
      this.printMap();
      this.gameStatus = this.player.action();
      this.checkWinLoss();
    }
  }

  printMap() {
    for (let i = 0; i < this.fieldArray.length; i++)
      console.log(this.fieldArray[i].join(''));
  }

  checkWinLoss() {
    if (this.player.y < 0 || this.player.x < 0 || this.player.y >= this.fieldArray.length || this.player.x >= this.fieldArray[this.player.y].length) {
      console.log(`Out of bounds instruction`);
      this.gameStatus = false;
    } else if (this.fieldArray[this.player.y][this.player.x] == this.field.hole) {
      console.log(`Sorry, you fell down a hole`);
      this.gameStatus = false;
    } else if (this.fieldArray[this.player.y][this.player.x] == this.field.hat) {
      console.log(`You win, you found your hat`);
      this.gameStatus = false;
    } else if (this.fieldArray[this.player.y][this.player.x] == this.field.road) {
      this.fieldArray[this.player.y][this.player.x] = this.field.footprint;
    }
  }
}

const myGame = new FindYourHat(new Field(6, 4, 0.7));