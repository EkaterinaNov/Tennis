//store information about game table element(div, canvas, svg etc.)
    class GameTable {
    coordinateX = 0;
    coordinateY = 0;
    width = 0;
    height = 0;
    fillcolor = 0x9EBFC6; //hexadecimal nuber in format 0x000000
    gameView;

    constructor(gameTableWidth) {
        if(Number.isInteger(gameTableWidth)) {
            this.recalculationParameters(gameTableWidth);
        } else {
            throw new TypeError('The game table width must be integer');
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

    getView() {
        return this.gameView;
    }

    recalculationParameters(gameTableWidth) {
        if(Number.isInteger(gameTableWidth)) {
            var heightIndex;
            if(gameTableWidth >= 500) {
                heightIndex = 0.66;
            } else {
                heightIndex = 1.3;
            }
            this.width = gameTableWidth;
            this.height = Math.round(gameTableWidth * heightIndex);
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('Height and width of the game table must be integers');
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

    setDimensions(gameTableWidth, gameTableHeight) {
        if(Number.isInteger(gameTableWidth) && Number.isInteger(gameTableHeight)) {
            this.width = gameTableWidth;
            this.height = gameTableHeight;
            if(this.gameView) {
                this.gameView.update;
            }
        } else if(Number.isInteger(gameTableWidth)) {
            const heightIndex = 0.66;
            this.width = gameTableWidth;
            this.height = Math.round(gameTableWidth * heightIndex);
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('Height and width of the game table must be integers');
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

    setFillColor(color = 0x9EBFC6) {
        if(Number.isInteger(color)) {
            this.fillcolor = color;
            if(this.gameView) {
                this.gameView.update;
            }
        } else {
            throw new TypeError('The color of the game table must be hexadecimal nuber in format 0x000000');
        }
    }

    destruct() {
        this.gameView = null;
    }
}