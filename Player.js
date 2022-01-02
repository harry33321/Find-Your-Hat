const prompt = require('prompt-sync')({ sigint: true });

module.exports = class {
    constructor(x, y, field) {
        this.x = x;
        this.y = y;
        this.field = field;
        this.hardMode = false;
    }

    action() {
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
                return false;
        }
        if (this.hardMode == true) {
            this.hardMove();
        }
        return true;
    }

    hardMove() {
        let randY = Math.floor(Math.random() * this.field.mapArray.length);
        let randX = Math.floor(Math.random() * this.field.mapArray[randY].length);
        while (this.field.mapArray[randY][randX] == this.field.hat || this.field.mapArray[randY][randX] == this.field.hole) {
            randY = Math.floor(Math.random() * this.field.mapArray.length);
            randX = Math.floor(Math.random() * this.field.mapArray[randY].length);
        }
        this.field.mapArray[randY][randX] = this.field.hole;
    }
}
