class KeyboardController{
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

    leftRacketTouch = null;
    rightRacketTouch = null;

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
            this.gameTableElement = document.getElementsByClassName(gameTableElementClass)[0];

            this.recalculatedGameTableCoordinate();
            this.viewIndex = this.gameView.getRecalculateIndex();

            document.body.addEventListener('keydown', () => {this.leftUpMove()});
            document.body.addEventListener('keyup', () => {this.leftUpStop()});
            document.body.addEventListener('keydown', () => {this.leftDownMove()});
            document.body.addEventListener('keyup', () => {this.leftDownStop()});

            document.body.addEventListener('keydown', () => {this.rightUpMove()});
            document.body.addEventListener('keyup', () => {this.rightUpStop()});
            document.body.addEventListener('keydown', () => {this.rightDownMove()});
            document.body.addEventListener('keyup', () => {this.rightDownStop()});

            this.gameTableElement.addEventListener("touchstart", (EO) => {this.touchStartMove(EO)}, false);
            this.gameTableElement.addEventListener("touchend", (EO) => {this.touchEndMove(EO)}, false);
            this.gameTableElement.addEventListener("touchcancel", (EO) => {this.touchCanselMove(EO)}, false);
            this.gameTableElement.addEventListener("touchmove", (EO) => {this.touchMoveAction(EO)}, { passive: false });
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

    recalculatedGameTableCoordinate() {
        const clientCoord = this.gameTableElement.getBoundingClientRect();
        this.gameTable.setCoordinateOnPage(clientCoord.left + pageXOffset, clientCoord.top + pageYOffset);
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
            this.recalculatedGameTableCoordinate();
            this.viewIndex = this.gameView.getRecalculateIndex();
        }
    }

    touchStartMove(EO) {
        //EO = EO || window.event;
        EO.preventDefault();
        var touches = EO.changedTouches;
        var leftRacketCoord = this.leftTennisRacket.getCoordinate();
        var leftRacketDimensions = this.leftTennisRacket.getDimensions();
        var rightRacketCoord = this.rightTennisRacket.getCoordinate();
        var rightRacketDimensions = this.rightTennisRacket.getDimensions();
        var gameTablePageCoord = this.gameTable.getCoordinateOnPage();
        const extraDistance = 15;
        const sidesNumber = 2;

        var leftRacketData = {x: gameTablePageCoord.x + Math.floor(leftRacketCoord.x * this.viewIndex) - extraDistance,
            y:gameTablePageCoord.y + Math.floor(leftRacketCoord.y * this.viewIndex) - extraDistance,
            width: Math.floor(leftRacketDimensions.width * this.viewIndex) + extraDistance * sidesNumber,
            height: Math.floor(leftRacketDimensions.height * this.viewIndex) + extraDistance * sidesNumber};

        var rightRacketData = {x: gameTablePageCoord.x + Math.floor(rightRacketCoord.x * this.viewIndex) - extraDistance,
            y:gameTablePageCoord.y + Math.floor(rightRacketCoord.y * this.viewIndex) - extraDistance,
            width: Math.floor(rightRacketDimensions.width * this.viewIndex) + extraDistance * sidesNumber,
            height: Math.floor(rightRacketDimensions.height * this.viewIndex) + extraDistance * sidesNumber};

        for (var i = 0; i < touches.length; i++) {
            if(touches[i].pageX > leftRacketData.x && touches[i].pageX < leftRacketData.x + leftRacketData.width &&
                touches[i].pageY > leftRacketData.y && touches[i].pageY < leftRacketData.y + leftRacketData.height) {
                    this.leftRacketTouch = this.copyTouch(touches[i]);
            } else if(touches[i].pageX > rightRacketData.x && touches[i].pageX < rightRacketData.x + rightRacketData.width &&
                touches[i].pageY > rightRacketData.y && touches[i].pageY < rightRacketData.y + rightRacketData.height) {
                    this.rightRacketTouch = this.copyTouch(touches[i]);
            }
        }
    }

    touchMoveAction(EO) {
        if(this.leftRacketTouch || this.rightRacketTouch) {
            //EO = EO || window.event;
            EO.preventDefault();
            var touches = EO.changedTouches;
            var difference;
            var speed = 7;
            var speedZero = 0;
            
            for (var i = 0; i < touches.length; i++) {
                if(this.leftRacketTouch) {
                    if(this.leftRacketTouch.identifier === touches[i].identifier) {
                        difference = touches[i].pageY - this.leftRacketTouch.pageY;
                        if(difference > 0) {
                            this.leftTennisRacket.setSpeed(speed);
                        } else {
                            this.leftTennisRacket.setSpeed(-speed);
                        }
                    }
                } else if(this.rightTennisRacket){
                    if(this.rightRacketTouch.identifier === touches[i].identifier) {
                        difference = touches[i].pageY - this.rightRacketTouch.pageY;
                        if(difference > 0) {
                            this.rightTennisRacket.setSpeed(speed);
                        } else {
                            this.rightTennisRacket.setSpeed(-speed);
                        }
                    }
                } else {
                    if(this.leftRacketTouch) {
                        this.leftTennisRacket.setSpeed(speedZero);
                    } else if(this.rightTennisRacket) {
                        this.rightTennisRacket.setSpeed(-speed);
                    }
                }
            }
        }
    }

    touchEndMove(EO) {
        if(this.leftRacketTouch || this.rightRacketTouch) {
            EO = EO || window.event;
            var touches = EO.changedTouches;
            var speedZero = 0;

            for (var i = 0; i < touches.length; i++) {
                if(this.leftRacketTouch) {
                    if(this.leftRacketTouch.identifier === touches[i].identifier) {
                        this.leftTennisRacket.setSpeed(speedZero);
                        this.leftRacketTouch = null;
                    }
                } else {
                        if(this.rightRacketTouch.identifier === touches[i].identifier) {
                        this.rightTennisRacket.setSpeed(speedZero);
                        this.rightRacketTouch = null;
                    }
                }
            }
        }
    }

    touchCanselMove(EO) {
        if(this.leftRacketTouch || this.rightRacketTouch) {
            EO = EO || window.event;
            var touches = EO.changedTouches;
            var speedZero = 0;

            for (var i = 0; i < touches.length; i++) {
                if(this.leftRacketTouch) {
                    if(this.leftRacketTouch.identifier === touches[i].identifier) {
                        this.leftTennisRacket.setSpeed(speedZero);
                        this.leftRacketTouch = null;
                    }
                } else {
                    if(this.rightRacketTouch.identifier === touches[i].identifier) {
                        this.rightTennisRacket.setSpeed(speedZero);
                        this.rightRacketTouch = null;
                    }
                }
            }
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
        this.stopGameLoop();
    }

    destruct() {
        this.firstGamer = null;
        this.secondGamer = null;
        this.leftTennisRacket = null;
        this.rightTennisRacket = null;
        this.gameBall = null;
        this.gameTable = null;
    }

    copyTouch({ identifier, pageX, pageY }) {
        return { identifier, pageX, pageY };
      }
}