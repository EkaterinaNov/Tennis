//stores information about game ball
class GameBall{
    coordinateX = 0;
    coordinateY = 0;
    speedX = 0;
    speedY = 0;
    radius = 0;
    fillcolor = '#F7B53A';
    leftBorder = 0;
    topBorder = 0;
    rightBorder;
    bottomBorder;

    knownTableWidth;
    requestLink;

    leftTennisRacket;
    rightTennisRacket;

    firstGamer;
    secondGamer;
    gameView;

    soundGoalScored;
    impactSound;
    
    constructor(gameTable, leftTennisRacket, rightTennisRacket, firstGamer, secondGamer, soundGoalScored, impactSound) {
        const typeObject = 'object';
        if(typeof(gameTable) === typeObject && typeof(leftTennisRacket) === typeObject && typeof(rightTennisRacket) === typeObject &&
                typeof(firstGamer) === typeObject && typeof(secondGamer) === typeObject) {
            this.knownTableWidth = gameTable.getWidth();
            this.rightBorder = this.knownTableWidth;
            this.bottomBorder = gameTable.getHeight();
            this.radius = 14;
            this.setStartCoordinate(this.knownTableWidth);
            this.leftTennisRacket = leftTennisRacket;
            this.rightTennisRacket = rightTennisRacket;
            this.firstGamer = firstGamer;
            this.secondGamer = secondGamer;
            this.soundGoalScored = soundGoalScored;
            this.impactSound = impactSound;
            return this;
        } else {
            throw new TypeError('Height and width of the game ball must be integers');
        }
    }

    checkGoal() {
        if(this.coordinateX <= this.leftBorder + this.radius) {
            this.playGoalScored;
            this.speedX = -this.speedX;
            secondGamer.increaseScore();
        } else if(this.coordinateX >= this.rightBorder - this.radius) {
            this.playGoalScored;
            this.speedX = -this.speedX;
            firstGamer.increaseScore();
        }
    }

    checkCollision() {
        var coordLeftRacket = this.leftTennisRacket.getCoordinate();
        var dimensionsLeftRacket = this.leftTennisRacket.getDimensions();

        var coordRightRacket = this.rightTennisRacket.getCoordinate();
        var dimensionsRightRacket = this.rightTennisRacket.getDimensions();

        if ((this.coordinateX - this.radius <= coordLeftRacket.x + dimensionsLeftRacket.width) &&
                (this.coordinateX - this.radius >= coordLeftRacket.x) && (this.coordinateY <= coordLeftRacket.y + dimensionsLeftRacket.height) &&
                (this.coordinateY >= coordLeftRacket.y)) {
            this.playImpactSound();
            this.speedX = -this.speedX;
        } else if ((this.coordinateX + this.radius <= coordRightRacket.x + dimensionsRightRacket.width) &&
                    (this.coordinateX + this.radius >= coordRightRacket.x) && (this.coordinateY <= coordRightRacket.y + dimensionsRightRacket.height) &&
                    (this.coordinateY >= coordRightRacket.y)) {
            this.playImpactSound();
            this.speedX = -this.speedX;
        } else if (this.coordinateY - this.radius <= this.topBorder) {
            this.playImpactSound();
            this.speedY = -this.speedY;
        } else if (this.coordinateY + this.radius >= this.bottomBorder) {
            this.playImpactSound();
            this.speedY = -this.speedY;
        }
    }
    
    getCoordinate() {
        return {x: this.coordinateX, y: this.coordinateY};
    }
    
    getFillColor() {
        return this.fillcolor;
    }
    
    getRadius() {
        return this.radius;
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
            this.gameView.update();
        }
        this.requestLink = window.requestAnimationFrame(this.move);
        this.checkGoal();
        this.checkCollision();
    }

    playGoalScored(){
        this.soundGoalScored.currentTime = 0;
        this.soundGoalScored.play();
    }

    playImpactSound() {
        this.impactSound.currentTime = 0;
        this.impactSound.play();
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
        this.coordinateX = Math.floor(this.rightBorder / 2);
        this.coordinateY = Math.floor(this.bottomBorder / 2);
        if(this.gameView) {
            this.gameView.update();
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
            throw new TypeError('The coordinates of the game ball must be integers');
        }
    }

    setSpeed(speedX, speedY) {
        if(Number.isInteger(speedX) && Number.isInteger(speedY)) {
            this.speedX = speedX;
            this.speedY = speedY;
            if(this.gameView) {
                this.gameView.update();
            }
        } else {
            throw new TypeError('Speed of the game ball must be integers');
        }
    }

    setFillColor(color ='#F7B53A') {
        const typeString = 'string';
        if(typeof color === typeString) {
            this.fillcolor = color;
            if(this.gameView) {
                this.gameView.update();
            }
        } else {
            throw new TypeError('The color of the game ball must be string in format #000000');
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