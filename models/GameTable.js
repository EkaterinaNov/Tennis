//store information about game table element(div, canvas, svg etc.)
    class GameTable {
    coordinateX = 0;
    coordinateY = 0;
    width = 0;
    height = 0;
    fillcolor = '#9EBFC6';
    gameView;

    constructor() {
        this.width = 800;
        this.height = 600;
    }
    
    getCoordinate() {
        return {x: this.coordinateX, y: this.coordinateY};
    }

    getFillColor() {
        return this.fillcolor;
    }

    getHeight() {
        return this.height;
    }

    getWidth() {
        return this.width;
    }

    getDimensions() {
        return {width: this.width, height: this.height};
    }

    getView() {
        return this.gameView;
    }

    setView(view) {
        const typeObject = 'object';
            if(typeof(view) === typeObject){
                this.gameView = gameView;
            } else {
                throw new TypeError('View must be object type of someView');
            }
    }

    setCoordinate(x,y) {
        if(Number.isInteger(x) && Number.isInteger(y)) {
            this.coordinateX = x;
            this.coordinateY = y;
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('The coordinates of the game table must be integers');
        }
    }

    setFillColor(color = '#9EBFC6') {
        const typeString = 'string';
        if(typeof color === typeString) {
            this.fillcolor = color;
        } else {
            throw new TypeError('The color of the tennis racket must be string in format #000000');
        }
    }

    destruct() {
        this.gameView = null;
    }
}