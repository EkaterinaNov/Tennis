class KeyboardController{
    firstGamer;
    secondGamer;
    leftTennisRacket;
    rightTennisRacket;
    gameBall;
    gameTable;
    gameView;

    timeOut;
    isTimerStart = false;

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

            document.body.addEventListener('keydown', () => {this.leftUpMove()});
            document.body.addEventListener('keyup', () => {this.leftUpStop()});
            document.body.addEventListener('keydown', () => {this.leftDownMove()});
            document.body.addEventListener('keyup', () => {this.leftDownStop()});

            document.body.addEventListener('keydown', () => {this.rightUpMove()});
            document.body.addEventListener('keyup', () => {this.rightUpStop()});
            document.body.addEventListener('keydown', () => {this.rightDownMove()});
            document.body.addEventListener('keyup', () => {this.rightDownStop()});
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

    leftDownMove(EO) {
        EO = EO || window.event;
        const codeS = 'KeyS';
        const speed = 4;
        if(EO.code === codeS)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    leftDownStop(EO) {
        EO = EO || window.event;
        const codeS = 'KeyS';
        const speed = 0;
        if(EO.code === codeS)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    leftUpMove(EO) {
        EO = EO || window.event;
        const codeW = 'KeyW';
        const speed = -4;
        if(EO.code === codeW)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    leftUpStop(EO) {
        EO = EO || window.event;
        const codeW = 'KeyW';
        const speed = 0;
        if(EO.code === codeW)
        {
            this.leftTennisRacket.setSpeed(speed);
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

    rightDownMove(EO) {
        EO = EO || window.event;
        const nameArrowDown = 'ArrowDown';
        const speed = 4;
        if(EO.key === nameArrowDown)
        {
            this.rightTennisRacket.setSpeed(speed);
        }
    }

    rightDownStop(EO) {
        EO = EO || window.event;
        const nameArrowDown = 'ArrowDown';
        const speed = 0;
        if(EO.key === nameArrowDown)
        {
            this.rightTennisRacket.setSpeed(speed);
        }
    }
    
    rightUpMove(EO) {
        EO = EO || window.event;
        const nameArrowUp = 'ArrowUp';
        const speed = -4;
        if(EO.key === nameArrowUp)
        {
            this.rightTennisRacket.setSpeed(speed);
        }
    }

    rightUpStop(EO) {
        EO = EO || window.event;
        const nameArrowUp = 'ArrowUp';
        const speed = 0;
        if(EO.key === nameArrowUp)
        {
            this.rightTennisRacket.setSpeed(speed);
        }
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

    startGameLoop(){
        var zeroScore = 0;
        if(this.firstGamer.isWinner || this.secondGamer.isWinner) {
            this.resetGameScore();
        }
        if(this.firstGamer.getScore() === zeroScore && this.secondGamer.getScore() === zeroScore) {
            this.setStartScene();
        }
        
        this.isStartGame = true;

        this.startMove();
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

    stopStartGameLoop(EO) {
        EO = EO || window.event;
        const keyName = 'Control';
        if(EO.key === keyName)
        {
            if(this.isStartGame) {
                this.stopGameLoop();
            } else {
                this.startGameLoop();
            }
        }
    }

    startRecalculate() {
        if(this.gameView) {
            this.gameView.recalculateSize();
        }
    }
    
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