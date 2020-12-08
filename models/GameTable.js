(function() {
    class GameTable {
    coordinateX = 0;
    coordinateY = 0;
    width = 0;
    height = 0;
    fillcolor = 'rgb(255, 255, 255)';

    constructor(gameTableWidth = 1200, gameTableHeight = 800) {
        if(Number.isInteger(gameTableWidth) && Number.isInteger(gameTableHeight)) {
            this.width = gameTableWidth;
            this.height = gameTableHeight;
        } else {
            throw new TypeError('Height and width of the game table must be integers');
        }
    }

    setDimensions(gameTableWidth, gameTableHeight) {
        if(Number.isInteger(gameTableWidth) && Number.isInteger(gameTableHeight)) {
            this.width = gameTableWidth;
            this.height = gameTableHeight;
        } else {
            throw new TypeError('Height and width of the game table must be integers');
        }
    }

    setCoordinate(x,y) {
        if(Number.isInteger(x) && Number.isInteger(y)) {
            this.coordinateX = x;
            this.coordinateY = y;
        } else {
            throw new TypeError('The coordinates of the game table must be integers');
        }
    }

    setFillColor(color = 'rgb(255, 255, 255)') {
        const typeString = 'string';
        if(typeof color === typeString) {
            this.fillcolor = color;
        } else {
            throw new TypeError('The color of the game table must be string');
        }
    }

    getCoordinate() {
        return {x: this.coordinateX, y: this.coordinateY};
    }

    getFillColor() {
        return this.fillcolor;
    }

    getDimensions() {
        return {width: this.width, height: this.height};
    }
}
})()