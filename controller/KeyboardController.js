class KeyboardController{
    firstGamer;
    secondGamer;
    leftTennisRacket;
    rightTennisRacket;
    gameBall;
    gameTable;
    gameView;

    elementForInsertView;
    timeOut;
    isTimerStart = false;

    constructor(firstGamer, secondGamer, leftTennisRacket, rightTennisRacket, gameBall, gameTable, gameView, elementForInsertView) {
        this.firstGamer = firstGamer;
        this.secondGamer = secondGamer;
        this.leftTennisRacket = leftTennisRacket;
        this.rightTennisRacket = rightTennisRacket;
        this.gameBall = gameBall;
        this.gameTable = gameTable;
        this.gameView = gameView;
        this.elementForInsertView = elementForInsertView;
    }

    startGameLoop(){
        document.body.addEventListener('keydown', this.shiftMoove());
        document.body.addEventListener('keyup', this.shiftStop());
        document.body.addEventListener('keydown', this.ctrlMoove());
        document.body.addEventListener('keyup', this.ctrlStop());

        document.body.addEventListener('keydown', this.upMoove());
        document.body.addEventListener('keyup', this.upStop());
        document.body.addEventListener('keydown', this.downMoove());
        document.body.addEventListener('keyup', this.downStop());

        window.addEventListener("resize", this.whenResize, false);
    }

    checkResizePeriod() {
        const timeNow = new Date().getTime();
        const period = this.startTime - timeNow;
        const checkPeriod = 800;
        if(period >= checkPeriod) {
            this.startRecalculate;
            this.startTime = 0;
            clearInterval(this.timeOut);
            this.timeOut = null;
            isTimerStart = false;
        }
    }

    whenResize() {
        if(isTimerStart) {
            this.startTime = new Date().getTime();
        } else {
            this.startTime = new Date().getTime();
            this.timeOut = setInterval(this.checkResizePeriod, 1000/3);
            isTimerStart = true;
        }
    }

    startRecalculate() {
        const gameTableWidth = elementForInsertView.clientWidth;
        this.gameTable.recalculationParameters(gameTableWidth);
        this.leftTennisRacket.recalculationParameters(gameTableWidth);
        this.rightTennisRacket.recalculationParameters(gameTableWidth);
        this.gameBall.recalculationParameters(gameTableWidth);
    }

    shiftMoove(EO) {
        const nameShift = 'Shift';
        const speed = -2;
        if(EO.key === nameShift)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    shiftStop(EO) {
        const nameShift = 'Shift';
        const speed = 0;
        if(EO.key === nameShift)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    ctrlMoove(EO) {
        const nameCtrl = 'Control';
        const speed = 2;
        if(EO.key === nameCtrl)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    ctrlStop(EO) {
        const nameCtrl = 'Control';
        const speed = 0;
        if(EO.key === nameCtrl)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    upMoove(EO) {
        const nameShift = 'ArrowUp';
        const speed = -2;
        if(EO.key === nameShift)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    upStop(EO) {
        const nameShift = 'ArrowUp';
        const speed = 0;
        if(EO.key === nameShift)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    downMoove(EO) {
        const nameCtrl = 'ArrowDown';
        const speed = 2;
        if(EO.key === nameCtrl)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    downStop(EO) {
        const nameCtrl = 'ArrowDown';
        const speed = 0;
        if(EO.key === nameCtrl)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    destruct() {
        this.firstGamer.destruct();
        this.secondGamer.destruct();
        this.leftTennisRacket.destruct();
        this.rightTennisRacket.destruct();
        this.gameBall.destruct();
        this.gameTable.destruct();

        this.firstGamer = null;
        this.secondGamer = null;
        this.leftTennisRacket = null;
        this.rightTennisRacket = null;
        this.gameBall = null;
        this.gameTable = null;
    }
}