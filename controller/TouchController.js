class TouchController {
    firstGamer;
    secondGamer;
    leftTennisRacket;
    rightTennisRacket;
    gameBall;
    gameTable;
    gameView;

    gameTableElement;
    viewIndex;

    timeOut;
    isTimerStart = false;

    leftRacketTouch;
    rightRacketTouch;

    requestLink;
    isStartGame;

    constructor(firstGamer, secondGamer, leftTennisRacket, rightTennisRacket, gameBall, gameTable, gameView) {
        const typeObject = 'object';
        if(typeof(firstGamer) === typeObject && typeof(secondGamer) === typeObject && typeof(leftTennisRacket) === typeObject &&
             typeof(rightTennisRacket) === typeObject && typeof(gameBall) === typeObject && typeof(gameTable) === typeObject &&
             typeof(gameView) === typeObject){
            this.firstGamer = firstGamer;
            this.secondGamer = secondGamer;
            this.leftTennisRacket = leftTennisRacket;
            this.rightTennisRacket = rightTennisRacket;
            this.gameBall = gameBall;
            this.gameTable = gameTable;
            this.gameView = gameView;

            window.addEventListener("resize",() => {this.whenResize()}, false);
            this.isStartGame = false;

            const gameTableElementClass = 'tennisGame';
            this.gameTableElement = document.getElementsByClassName(gameTableElementClass);

            this.recalculatedGameTableCoordinate();
            this.viewIndex = this.gameView.getRecalculateIndex();
        } else {
            throw new TypeError('All parameters must be objects');
        }
    }

    checkResizePeriod() {
        const timeNow = new Date().getTime();
        const period = timeNow - this.startTime;
        const checkPeriod = 100;
        if(period >= checkPeriod) {
            this.startRecalculate();
            this.startTime = 0;
            clearInterval(this.timeOut);
            this.timeOut = null;
            this.isTimerStart = false;
        }
    }

    move() {
        if(this.firstGamer.isWinner || this.secondGamer.isWinner)
        {
            this.stopGameLoop();
            this.gameBall.setStartCoordinate();
            return;
        }
        if(this.leftTennisRacket) {
            this.leftTennisRacket.move();
        }

        if(this.rightTennisRacket) {
            this.rightTennisRacket.move();
        }

        if(this.gameBall) {
            this.gameBall.move();
        }
        this.requestLink = window.requestAnimationFrame(() => {this.move()});
    }

    resetGameScore() {
        if(this.firstGamer && this.secondGamer) {
            this.firstGamer.resetScore();
            this.firstGamer.isWinner = false;
            this.secondGamer.resetScore();
            this.secondGamer.isWinner = false;
            this.gameView.updateScore();
        }
    }

    recalculatedGameTableCoordinate() {
        const clientCoord = this.gameTableElement.getBoundingClientRect();
        this.gameTable.setCoordinate(clientCoord.left + pageXOffset, clientCoord.top + pageYOffset);
    }

    setStartScene() {
        if(this.leftTennisRacket) {
            this.leftTennisRacket.setStartCoordinate();
        }

        if(this.rightTennisRacket) {
            this.rightTennisRacket.setStartCoordinate();
        }

        if(this.gameBall) {
            this.gameBall.setStartCoordinate();
            this.gameBall.setRandomSpeed();
        }
    }

    startMove() {
        this.requestLink = window.requestAnimationFrame(() => {this.move()});
    }

    stopGameLoop() {
        window.cancelAnimationFrame(this.requestLink);

        this.isStartGame = false;
    }

    startRecalculate() {
        if(this.gameView) {
            this.gameView.recalculateSize();
            this.recalculatedGameTableCoordinate();
            this.viewIndex = this.gameView.getRecalculateIndex();
        }
    }

    touchStartMove() {}

    touchEndMove() {}

    touchCanselMove() {}

    touchMove() {}
    
    whenResize() {
        if(this.isTimerStart) {
            this.startTime = new Date().getTime();
        } else {
            this.startTime = new Date().getTime();
            this.timeOut = setInterval(() => {this.checkResizePeriod()}, 1000/3);
            this.isTimerStart = true;
        }
    }

    destruct() {
        if(this.firstGamer && this.secondGamer && this.leftTennisRacket && this.rightTennisRacket && this.gameBall && this.gameTable){
            this.firstGamer.destruct();
            this.secondGamer.destruct();
            this.leftTennisRacket.destruct();
            this.rightTennisRacket.destruct();
            this.gameBall.destruct();
            this.gameTable.destruct();
        }

        this.firstGamer = null;
        this.secondGamer = null;
        this.leftTennisRacket = null;
        this.rightTennisRacket = null;
        this.gameBall = null;
        this.gameTable = null;
    }
}