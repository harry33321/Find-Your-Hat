module.exports = class{
    constructor(col, row, percentage) {
        this.hat = '^';
        this.hole = 'O';
        this.road = '░';
        this.footprint = '*';
        this.mapArray;

        this.generateField(col, row, percentage)
    }

    generateField(x, y, percentage) {
        let mapArray = new Array(y).fill(null).map(i => new Array(x))
        for (let i = 0; i < y; i++) {
          for (let j = 0; j < x; j++) {
            percentage > Math.random() ?
              mapArray[i][j] = this.road :
              mapArray[i][j] = this.hole;
          }
        }
        this.mapArray = mapArray
    }

    generateFieldObject() {
        let hatY = Math.floor(Math.random() * this.mapArray.length);
        let hatX = Math.floor(Math.random() * this.mapArray[hatY].length);
        this.mapArray[hatY][hatX] = this.hat;
    }

    generatePlayerPosition(player){
        let pathY = Math.floor(Math.random() * this.mapArray.length);
        let pathX = Math.floor(Math.random() * this.mapArray[pathY].length);
        this.mapArray[pathY][pathX] = this.footprint;
        
        player.x = pathX;
        player.y = pathY;
        return player;
    }
}