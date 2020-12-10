    //stores information about racket of the gamer
    class TennisRacket{
        coordinateX = 0;
        coordinateY = 0;
        speedY = 0;
        width = 0;
        height = 0;
        fillcolor = 0x1E7392; //hexadecimal nuber in format 0x000000
        gameView;

        constructor(gameTableWidth, isLeft = true) {
            this.recalculationParameters(gameTableWidth);
            this.setStartCoordinate(gameTableWidth, isLeft);
            return this;
        }

        recalculationParameters(gameTableWidth) {
            if(Number.isInteger(gameTableWidth)) {
                if(gameTableWidth >= 700) {
                    const heightIndex = 0.15;
                    const widthIndex = 0.02;
                    this.height = Math.round(gameTableWidth * heightIndex);
                    this.width = Math.round(gameTableWidth * widthIndex);
                } else {
                    this.height = 120;
                    this.width = 25;
                }
                if(this.gameView) {
                    this.gameView.update;
                }
            } else {
                throw new TypeError('Height and width of the tennis racket must be integers');
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

        move() {
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
    
        getDimensions() {
            return {width: this.width, height: this.height};
        }

        getSpeed() {
            return {speedY: this.speedY};
        }

        getView() {
            return this.gameView;
        }
    }