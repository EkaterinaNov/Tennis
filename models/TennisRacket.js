(function() {
    class TennisRacket{
        coordinateX = 0;
        coordinateY = 0;
        speedY = 0;
        width = 0;
        height = 0;
        fillcolor = 'rgb(0, 0, 0)';

        constructor(x = 0, y = 200, racketWidth = 250, racketHeight = 20) {
            if(Number.isInteger(x) && Number.isInteger(y) && Number.isInteger(racketWidth) && Number.isInteger(racketHeight)) {
                this.coordinateX = x;
                this.coordinateY = y;
                this.height = racketHeight;
                this.width = racketWidth;
            } else {
                throw new TypeError('Height and width of the tennis racket must be integers');
            }
        }

        setDimensions(racketWidth, racketHeight) {
            if(Number.isInteger(racketWidth) && Number.isInteger(racketHeight)) {
                this.width = racketWidth;
                this.height = racketHeight;
            } else {
                throw new TypeError('Height and width of the tennis racket must be integers');
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
            } else {
                throw new TypeError('The coordinates of the tennis racket must be integers');
            }
        }

        setFillColor(color = 'rgb(0, 0, 0)') {
            const typeString = 'string';
            if(typeof color === typeString) {
                this.fillcolor = color;
            } else {
                throw new TypeError('The color of the tennis racket must be string');
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

        move() {
            this.coordinateY += this.speedY;
        }
    }
})()