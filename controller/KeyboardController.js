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

    constructor(firstGamer, secondGamer, leftTennisRacket, rightTennisRacket, gameBall, gameTable, gameView) {
        this.firstGamer = firstGamer;
        this.secondGamer = secondGamer;
        this.leftTennisRacket = leftTennisRacket;
        this.rightTennisRacket = rightTennisRacket;
        this.gameBall = gameBall;
        this.gameTable = gameTable;
        this.gameView = gameView;
        window.addEventListener("resize",() => {this.whenResize()}, true);
    }

    startGameLoop(){
        document.body.addEventListener('keypress', this.shiftMove());
        document.body.addEventListener('keyup', this.shiftStop());
        document.body.addEventListener('keydown', this.ctrlMove());
        document.body.addEventListener('keyup', this.ctrlStop());

        document.body.addEventListener('keydown', this.upMove());
        document.body.addEventListener('keyup', this.upStop());
        document.body.addEventListener('keydown', this.downMove());
        document.body.addEventListener('keyup', this.downStop());

        if(this.leftTennisRacket) {
            this.leftTennisRacket.startMove();
            console.log(this.leftTennisRacket);
        }
        if(this.rightTennisRacket) {
            this.rightTennisRacket.startMove();
            console.log(this.rightTennisRacket);
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

    whenResize() {
        if(this.isTimerStart) {
            this.startTime = new Date().getTime();
        } else {
            this.startTime = new Date().getTime();
            this.timeOut = setInterval(() => {this.checkResizePeriod()}, 1000/3);
            this.isTimerStart = true;
        }
    }

    startRecalculate() {
        if(this.gameView) {
            this.gameView.recalculateSize();
        }
    }

    shiftMove(EO) {
        debugger;
        EO = EO || window.event;
        const keyCodeShift = '16';
        const speed = -2;
        if(EO.key === keyCodeShift)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    shiftStop(EO) {
        debugger;
        EO = EO || window.event;
        const nameShift = 'Shift';
        const speed = 0;
        if(EO.key === nameShift)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    ctrlMove(EO) {
        EO = EO || window.event;
        const nameCtrl = 'Control';
        const speed = 2;
        if(EO.key === nameCtrl)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    ctrlStop(EO) {
        EO = EO || window.event;
        const nameCtrl = 'Control';
        const speed = 0;
        if(EO.key === nameCtrl)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    upMove(EO) {
        EO = EO || window.event;
        const nameShift = 'ArrowUp';
        const speed = -2;
        if(EO.key === nameShift)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    upStop(EO) {
        EO = EO || window.event;
        const nameShift = 'ArrowUp';
        const speed = 0;
        if(EO.key === nameShift)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    downMove(EO) {
        EO = EO || window.event;
        const nameCtrl = 'ArrowDown';
        const speed = 2;
        if(EO.key === nameCtrl)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    downStop(EO) {
        EO = EO || window.event;
        const nameCtrl = 'ArrowDown';
        const speed = 0;
        if(EO.key === nameCtrl)
        {
            this.leftTennisRacket.setSpeed(speed);
        }
    }

    destruct() {
        if(true){
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