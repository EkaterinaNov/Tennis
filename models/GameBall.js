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
    additionalAcceleration;
    maxSpeedX;
    maxSpeedY;
    minSpeedY;

    knownTableWidth;

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
            this.setRandomSpeed();
            this.additionalAcceleration = 1.07;
            this.maxSpeedX = 7;
            this.maxSpeedY = 8;
            this.minSpeedY = 4;
            return this;
        } else {
            throw new TypeError('All parameters must be objects');
        }
    }

    checkGoal() {
        if(this.coordinateX - this.radius <= this.leftBorder) {
            this.coordinateX = this.leftBorder + this.radius;
            this.playGoalScored();
            this.speedX = -this.speedX;
            this.secondGamer.increaseScore();
        } else if(this.coordinateX + this.radius >= this.rightBorder) {
            this.coordinateX = this.rightBorder - this.radius;
            this.playGoalScored();
            this.speedX = -this.speedX;
            this.firstGamer.increaseScore();
        }
    }

    checkCollision() {
        const edgeBorderY = 10;
        //const edgeBorderX = 10;
        var coordLeftRacket = this.leftTennisRacket.getCoordinate();
        var dimensionsLeftRacket = this.leftTennisRacket.getDimensions();

        var coordRightRacket = this.rightTennisRacket.getCoordinate();
        var dimensionsRightRacket = this.rightTennisRacket.getDimensions();

        if ((this.coordinateX - this.radius <= coordLeftRacket.x + dimensionsLeftRacket.width) &&
                (this.coordinateX - this.radius >= coordLeftRacket.x) && 
                (((this.coordinateY - this.radius <= coordLeftRacket.y + dimensionsLeftRacket.height) && (this.coordinateY - this.radius >= coordLeftRacket.y)) || 
                ((this.coordinateY + this.radius <= coordLeftRacket.y + dimensionsLeftRacket.height) &&(this.coordinateY + this.radius >= coordLeftRacket.y)))) {

            this.playImpactSound();
            this.coordinateX = coordLeftRacket.x + dimensionsLeftRacket.width + this.radius;

            if(this.coordinateX - this.radius <= coordLeftRacket.x + dimensionsLeftRacket.width &&
                (this.coordinateY + this.radius <= coordLeftRacket.y + edgeBorderY || 
                this.coordinateY - this.radius >= coordLeftRacket.y + dimensionsLeftRacket.height - edgeBorderY)) {
                    
                    if(this.coordinateY + this.radius <= coordLeftRacket.y + edgeBorderY) {
                        this.coordinateY = coordLeftRacket.y - this.radius;
                    } else {
                        this.coordinateY = coordLeftRacket.y + dimensionsLeftRacket.height + this.radius;
                    }

                    this.speedX = -this.speedX;
                    if(this.speedY < this.maxSpeedY) {
                        this.speedY = -this.speedY * this.additionalAcceleration;
                    } else {
                        this.speedY = -this.speedY;
                    }
                } else {
                    if(this.speedX < this.maxSpeedX) {
                        this.speedX = -this.speedX * this.additionalAcceleration;
                    } else {
                        this.speedX = -this.speedX;
                    }
                    if(this.speedY > this.minSpeedY) {
                        this.speedY = this.speedY / this.additionalAcceleration;
                    }
                }
        } else if ((this.coordinateX + this.radius <= coordRightRacket.x + dimensionsRightRacket.width) &&
                    (this.coordinateX + this.radius >= coordRightRacket.x) &&
                    (((this.coordinateY - this.radius <= coordRightRacket.y + dimensionsRightRacket.height) && (this.coordinateY - this.radius >= coordRightRacket.y)) || 
                ((this.coordinateY + this.radius <= coordRightRacket.y + dimensionsRightRacket.height) &&(this.coordinateY + this.radius >= coordRightRacket.y)))) {

            this.playImpactSound();
            this.coordinateX = coordRightRacket.x - this.radius;
            
            if(this.coordinateX + this.radius >= coordRightRacket.x && 
                (this.coordinateY + this.radius <= coordRightRacket.y + edgeBorderY ||
                this.coordinateY - this.radius >= coordRightRacket.y + dimensionsRightRacket.height - edgeBorderY)) {

                    if(this.coordinateY + this.radius <= coordRightRacket.y + edgeBorderY ) {
                        this.coordinateY = coordRightRacket.y - this.radius;
                    } else {
                        this.coordinateY = coordRightRacket.y + dimensionsRightRacket.height + this.radius;
                    }

                    this.speedX = -this.speedX;
                    if(this.speedY < this.maxSpeedY) {
                        this.speedY = -this.speedY * this.additionalAcceleration;
                    } else {
                        this.speedY = -this.speedY;
                    }
                } else {
                    if(this.speedX < this.maxSpeedX) {
                        this.speedX = -this.speedX * this.additionalAcceleration;
                    } else {
                        this.speedX = -this.speedX;
                    }
                    if(this.speedY > this.minSpeedY) {
                        this.speedY = this.speedY / this.additionalAcceleration;
                    }
                }
        } else if (this.coordinateY - this.radius <= this.topBorder) {
            this.coordinateY = this.topBorder + this.radius;
            this.playImpactSound();
            this.speedY = -this.speedY;
        } else if (this.coordinateY + this.radius >= this.bottomBorder) {
            this.coordinateY = this.bottomBorder - this.radius;
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

    getRandomIntInclusive(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    move() {
        if(this.gameView) {
            this.gameView.update();
        }
        this.checkGoal();
        this.checkCollision();
        this.coordinateX += this.speedX;
        this.coordinateY += this.speedY;
    }

    playGoalScored(){
        this.soundGoalScored.currentTime = 0;
        this.soundGoalScored.play();
    }

    playImpactSound() {
        this.impactSound.currentTime = 0;
        this.impactSound.play();
    }
    
    setRandomSpeed() {
        var bound = 0.5;
        var dice = Math.random();
        if (dice < bound) {
            this.speedX = 5;
        } else {
            this.speedX = -5;
        }

        dice = Math.random();
        if(dice < bound) {
            this.speedY = -(this.getRandomIntInclusive(3, 5));
        } else {
            this.speedY = this.getRandomIntInclusive(3, 5);
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

    destruct() {
        this.leftTennisRacket = null;
        this.rightTennisRacket = null;
        this.firstGamer = null;
        this.secondGamer = null;
        this.gameView = null;
    }
}