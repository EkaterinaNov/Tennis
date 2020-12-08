(function() {
    class GameBall{
        coordinateX = 0;
        coordinateY = 0;
        speedX = 0;
        speedY = 0;
        radius = 0;
        fillcolor = 'rgb(0, 0, 0)';

        constructor(x, y, ballRadius) {
            if(Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(ballRadius)) {
                this.coordinateX = x;
                this.coordinateY = y;
                this.radius = ballRadius;
            } else {
                throw new TypeError('Height and width of the game ball must be integers');
            }
        }

        setCoordinate(x,y) {
            if(Number.isInteger(x) && Number.isInteger(y)) {
                this.coordinateX = x;
                this.coordinateY = y;
            } else {
                throw new TypeError('The coordinates of the game ball must be integers');
            }
        }

        setRadius(ballRadius) {
            if(Number.isInteger(ballRadius)) {
                this.radius = ballRadius;
            } else {
                throw new TypeError('Speed of the game ball must be integers');
            }
        }

        setSpeed(racketSpeedX, racketSpeedY) {
            if(Number.isInteger(racketSpeedX) && Number.isInteger(racketSpeedY)) {
                this.speedX = racketSpeedX;
                this.speedY = racketSpeedY;
            } else {
                throw new TypeError('Speed of the game ball must be integers');
            }
        }

        setFillColor(color = 'rgb(0, 0, 0)') {
            const typeString = 'string';
            if(typeof color === typeString) {
                this.fillcolor = color;
            } else {
                throw new TypeError('The color of the game ball must be string');
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

        move() {
            this.coordinateX += this.speedX;
            this.coordinateY += this.speedY;
        }
    }
})()