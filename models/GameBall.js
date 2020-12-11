//stores information about game ball
class GameBall{
    coordinateX = 0;
    coordinateY = 0;
    speedX = 0;
    speedY = 0;
    radius = 0;
    fillcolor = 0xF7B53A; //hexadecimal nuber in format 0x000000

    leftBorder = 0;
    topBorder = 0;
    rightBorder = 1200;
    bottomBorder = 0;

    knownTableWidth = 1200;
    requestLink;

    leftTennisRacket;
    rightTennisRacket;

    firstGamer;
    secondGamer;
    gameView;
    
    constructor(gameTableWidth, leftTennisRacket, rightTennisRacket, firstGamer, secondGamer) {
        const typeObject = 'object';
        if(Number.isInteger(gameTableWidth) && typeof(leftTennisRacket) === typeObject && typeof(rightTennisRacket) === typeObject &&
                typeof(firstGamer) === typeObject && typeof(secondGamer) === typeObject) {
            this.knownTableWidth = gameTableWidth;
            this.recalculationParameters(gameTableWidth);
            this.setStartCoordinate(gameTableWidth);
            this.leftTennisRacket = leftTennisRacket;
            this.rightTennisRacket = rightTennisRacket;
            this.firstGamer = firstGamer;
            this.secondGamer = secondGamer;
        } else {
            throw new TypeError('Height and width of the game ball must be integers');
        }
    }

    checkGoal() {
        if(this.coordinateX === leftBorder) {
            secondGamer.setScore(true);
        }
    }
    
    getCoordinate() {
        return {x: this.coordinateX, y: this.coordinateY};
    }
    
    getFillColor() {
        return this.fillcolor;
    }
    
    getRadius() {
        return {radius: this.radius};
    }
    
    getSpeed() {
        return {speedX: this.speedX, speedY: this.speedY};
    }
    
    getView() {
        return this.gameView;
    }

    move() {
        this.coordinateX += this.speedX;
        this.coordinateY += this.speedY;
        if(this.gameView) {
            this.gameView.update;
        }
        this.requestLink = window.requestAnimationFrame(this.move);
    }

    recalculationParameters(gameTableWidth) {
        if(Number.isInteger(gameTableWidth)) {
            const recalculationIndex = this.knownTableWidth / gameTableWidth;
            const heightIndexBorder = 0.66;

            this.leftBorder = 0;
            this.topBorder = 0;
            this.rightBorder = gameTableWidth;
            this.bottomBorder = Math.round(gameTableWidth * heightIndexBorder);

            if(gameTableWidth >=700) {
                this.radius = 50;
            } else {
                this.radius = 25;
            }

            this.coordinateX *= recalculationIndex;
            this.coordinateY *= recalculationIndex;

            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('Height and width of the game ball must be integers');
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

    setStartCoordinate(gameTableWidth) {
        if(Number.isInteger(gameTableWidth)) {
            var heightIndex;
            if(gameTableWidth >=700) {
                heightIndex = 0.66;
            } else if(gameTableWidth >= 500) {
                heightIndex = 0.66; 
            } else {
                heightIndex = 1.3;
            }
            this.coordinateX = Math.round(gameTableWidth / 2);
            this.coordinateY = Math.round(Math.round(gameTableWidth * heightIndex) / 2);
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('Height and width of the game ball must be integers');
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
            throw new TypeError('The coordinates of the game ball must be integers');
        }
    }

    setRadius(ballRadius) {
        if(Number.isInteger(ballRadius)) {
            this.radius = ballRadius;
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('Speed of the game ball must be integers');
        }
    }

    setSpeed(racketSpeedX, racketSpeedY) {
        if(Number.isInteger(racketSpeedX) && Number.isInteger(racketSpeedY)) {
            this.speedX = racketSpeedX;
            this.speedY = racketSpeedY;
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('Speed of the game ball must be integers');
        }
    }

    setFillColor(color = 0xF7B53A) {
        const typeString = 'string';
        if(typeof color === typeString) {
            this.fillcolor = color;
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('The color of the game ball must be hexadecimal nuber in format 0x000000');
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
        this.leftTennisRacket = null;
        this.rightTennisRacket = null;
        this.firstGamer = null;
        this.secondGamer = null;
        this.gameView = null;
    }
}