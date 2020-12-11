//stores information about racket of the gamer
class TennisRacket{
    coordinateX = 0;
    coordinateY = 0;
    speedY = 0;
    width = 0;
    height = 0;
    fillcolor = 0x1E7392; //hexadecimal nuber in format 0x000000
    leftBorder = 0;
    topBorder = 0;
    rightBorder = 1200;
    bottomBorder = 0;
    knownTableWidth = 1200;
    requestLink;
    gameView;

    constructor(gameTableWidth, isLeft = true) {
        if(Number.isInteger(gameTableWidth)) {
            this.knownTableWidth = gameTableWidth;
            this.recalculationParameters(gameTableWidth);
            this.setStartCoordinate(gameTableWidth, isLeft);
        } else {
            throw new TypeError('Height and width of the game ball must be integers');
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

    getSpeed() {
        return {speedY: this.speedY};
    }

    getView() {
        return this.gameView;
    }

    move() {
        if (this.coordinateY < this.topBorder) {
            this.speedY = 0;
            this.coordinateY = this.topBorder;
        } else if (this.coordinateY > this.bottomBorder - this.height) {
            this.speedY = 0;
            this.coordinateY = this.bottomBorder;
        } else {
            this.coordinateY += this.speedY;
        }
        if(this.gameView) {
            this.gameView.update;
        }
        this.requestLink = window.requestAnimationFrame(this.move);
    }

    recalculationParameters(gameTableWidth) {
        if(Number.isInteger(gameTableWidth)) {
            const heightIndexBorder = 0.66;

            this.leftBorder = 0;
            this.topBorder = 0;
            this.rightBorder = gameTableWidth;
            this.bottomBorder = Math.round(gameTableWidth * heightIndexBorder);

            if(gameTableWidth >= 700) {
                const heightIndex = 0.15;
                const widthIndex = 0.02;
                this.height = Math.round(gameTableWidth * heightIndex);
                this.width = Math.round(gameTableWidth * widthIndex);
            } else {
                this.height = 120;
                this.width = 25;
            }

            this.coordinateX *= recalculationIndex;
            this.coordinateY *= recalculationIndex;
            
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('Height and width of the tennis racket must be integers');
        }
    }

    setView(view) {
        const typeObject = 'object';
        if(typeof(view) === typeObject){
            this.gameView = gameView;
        } else {
            throw new TypeError('View must be object type of someView');
        }
    }

    setStartCoordinate(gameTableWidth, isLeft = true) {
        if(Number.isInteger(gameTableWidth)) {
            if(gameTableWidth >= 700) {
                const coordinateYIndex = 0.25;
                this.coordinateY = Math.round(gameTableWidth * coordinateYIndex);
                if(isLeft) {
                    this.coordinateX = 0;
                } else {
                    this.coordinateX = gameTableWidth - this.width;
                }
            } else {
                const coordinateYIndex = 0.35;
                this.coordinateY = Math.round(gameTableWidth * coordinateYIndex);
                if(isLeft) {
                    this.coordinateX = 0;
                } else {
                    this.coordinateX = gameTableWidth - this.width;
                }
            }
        } else {
            throw new TypeError('Height and width of the tennis racket must be integers');
        }
    }

    setDimensions(racketWidth, racketHeight) {
        if(Number.isInteger(racketWidth) && Number.isInteger(racketHeight)) {
            this.width = racketWidth;
            this.height = racketHeight;
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('Height and width of the tennis racket must be integers');
        }
    }

    setSpeed(racketSpeed) {
        if(Number.isInteger(racketSpeed)) {
            this.speedY = racketSpeed;
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('Speed of the tennis racket must be integers');
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
            throw new TypeError('The coordinates of the tennis racket must be integers');
        }
    }

    setFillColor(color = 0x1E7392) {
        if(Number.isInteger(color)) {
            this.fillcolor = color;
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('The color of the tennis racket must be hexadecimal nuber in format 0x000000');
        }
    }
    
    startMoove() {
        this.requestLink = window.requestAnimationFrame(this.move);
    }

    stopMove() {
        window.cancelAnimationFrame(this.requestLink);
    }

    destruct() {
        this.stopMove;
        this.gameView = null;
    }
}