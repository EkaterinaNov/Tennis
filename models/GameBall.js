    //stores information about game ball
    class GameBall{
        coordinateX = 0;
        coordinateY = 0;
        speedX = 0;
        speedY = 0;
        radius = 0;
        fillcolor = 0xF7B53A; //hexadecimal nuber in format 0x000000
        gameView;

        constructor(gameTableWidth) {
            this.recalculationParameters(gameTableWidth);
            this.setStartCoordinate(gameTableWidth);
        }

        recalculationParameters(gameTableWidth) {
            if(Number.isInteger(gameTableWidth)) {
                if(gameTableWidth >=700) {
                    this.radius = 50;
                } else {
                    this.radius = 25;
                }
                if(this.gameView) {
                    this.gameView.update;
                }
            } else {
                throw new TypeError('Height and width of the game ball must be integers');
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

        move() {
            this.coordinateX += this.speedX;
            this.coordinateY += this.speedY;
            if(this.gameView) {
                this.gameView.update;
            }
        }

        setView(view) {
            if(view) {
                this.gameView = view;
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
    }