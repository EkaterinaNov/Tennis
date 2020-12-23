//stores information about racket of the gamer
class TennisRacket{
    coordinateX = 0;
    coordinateY = 0;
    speedY = 0;
    width = 0;
    height = 0;
    fillcolor = '#D96826';

    leftBorder = 0;
    topBorder = 0;
    rightBorder;
    bottomBorder;
    knownTableWidth;

    gameView;
    isLeft;

    constructor(gameTable, isLeft = true) {
        const typeObject = 'object';
        if(typeof(gameTable) === typeObject){
            this.knownTableWidth = gameTable.getWidth();
            this.rightBorder = this.knownTableWidth;
            this.bottomBorder = gameTable.getHeight();
            this.isLeft = isLeft;
            this.width = 28;
            this.height = 120;
            this.setStartCoordinate();
            return this;
        } else {
            throw new TypeError('Game table must be object type of GameTable');
        }
    }

    getCoordinate() {
        return {x: this.coordinateX, y: this.coordinateY};
    }

    getCoordinateY() {
        return this.coordinateY;
    }

    getFillColor() {
        return this.fillcolor;
    }

    getDimensions() {
        return {width: this.width, height: this.height};
    }

    getSpeed() {
        return {speedY: this.speedY};
    }

    getView() {
        return this.gameView;
    }

    move() {
        if (this.coordinateY < this.topBorder) {
            this.speedY = 0;
            this.coordinateY = this.topBorder + 1;
        } else if (this.coordinateY > this.bottomBorder - this.height) {
            this.speedY = 0;
            this.coordinateY = this.bottomBorder - this.height - 1;
        } else {
            this.coordinateY += this.speedY;
        }
        if(this.gameView) {
            this.gameView.update();
        }
    }

    setView(view) {
        const typeObject = 'object';
        if(typeof(view) === typeObject){
            this.gameView = view;
        } else {
            throw new TypeError('View must be object type of someView');
        }
    }

    setStartCoordinate() {
        if(this.isLeft) {
            this.coordinateX = 0;
        } else {
            this.coordinateX = this.knownTableWidth - this.width;
        }
        this.coordinateY = Math.floor(this.bottomBorder / 2 - this.height / 2);
        if(this.gameView) {
            this.gameView.update();
        }
    }

    setSpeed(racketSpeed) {
        if(Number.isInteger(racketSpeed)) {
            this.speedY = racketSpeed;
        } else {
            throw new TypeError('Speed of the tennis racket must be integers');
        }
    }

    setCoordinate(x,y) {
        if(Number.isInteger(x) && Number.isInteger(y)) {
            this.coordinateX = x;
            this.coordinateY = y;
            if(this.gameView) {
                this.gameView.update();
            }
        } else {
            throw new TypeError('The coordinates of the tennis racket must be integers');
        }
    }

    setCoordinateY(y) {
        if(Number.isInteger(y)) {
            this.coordinateY = y;
            if(this.gameView) {
                this.gameView.update();
            }
        } else {
            throw new TypeError('The coordinates of the tennis racket must be integers');
        }
    }

    setFillColor(color = '#D96826') {
        const typeString = 'string';
        if(typeof color === typeString) {
            this.fillcolor = color;
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('The color of the tennis racket must be string in format #000000');
        }
    }

    destruct() {
        this.gameView = null;
    }
}