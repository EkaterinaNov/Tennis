class CanvasView {
    gameTable;
    leftTennisRacket;
    rightTennisRacket;
    gameBall;

    firstGamer;
    secondGamer;

    reculculateIndex;

    elementForInsertView;
    widthElementForInsertView;
    elementForInsertScore;
    winnerPanelElement;
    forInsertWinnerNameElement;
    canvasElement;
    canvasContext;

    constructor(gameTable, leftTennisRacket, rightTennisRacket, gameBall, firstGamer, secondGamer, elementForInsertScore, elementForInsertView,
                    winnerPanelElement, forInsertWinnerNameElement) {
        this.gameTable = gameTable;
        this.leftTennisRacket = leftTennisRacket;
        this.rightTennisRacket = rightTennisRacket;
        this.gameBall = gameBall;
        this.firstGamer = firstGamer;
        this.secondGamer = secondGamer;
        this.elementForInsertScore = elementForInsertScore;
        this.elementForInsertView = elementForInsertView;
        this.winnerPanelElement = winnerPanelElement;
        this.forInsertWinnerNameElement = forInsertWinnerNameElement;

        const canvasClass = 'canvas';
        const setCanvasClass = 'tennisGame';
        const canvasContextStr = '2d';
        this.canvasElement = document.createElement(canvasClass);
        this.canvasElement.classList.add(setCanvasClass);
        elementForInsertView.appendChild(this.canvasElement);
        this.canvasContext = this.canvasElement.getContext(canvasContextStr);
        this.recalculateSize();
    }

    getViewCoordinate() {
        var viewCoordinate = this.canvasElement.getBoundingClientRect();
        return {
            x: viewCoordinate.left + window.pageXOffset,
            y: viewCoordinate.top + window.pageYOffset
        };
    }

    recalculateSize() {
        var tableSize = this.gameTable.getDimensions();
        this.widthElementForInsertView = this.elementForInsertView.clientWidth;
        this.reculculateIndex = this.widthElementForInsertView / tableSize.width;
        this.canvasElement.setAttribute('width', Math.floor(tableSize.width * this.reculculateIndex));
        this.canvasElement.setAttribute('height', Math.floor(tableSize.height * this.reculculateIndex));
        this.update();
    }

    showWinner() {
        this.updateScore();
        var winnerName;
        if(this.firstGamer.isWinner) {
            winnerName = this.firstGamer.getName();
        } else {
            winnerName = this.secondGamer.getName();
        }
        if(this.winnerPanelElement) {
            this.winnerPanelElement.style.visibility = 'visible';
            this.forInsertWinnerNameElement.textContent = winnerName;
        }
    }

    updateScore() {
        if(this.firstGamer && this.secondGamer) {
            this.elementForInsertScore.textContent = this.firstGamer.getScore() + ' : ' + this.secondGamer.getScore();
        }
    }

    update() {
        var tableCoord = this.gameTable.getCoordinate();
        var tableSize = this.gameTable.getDimensions();
        this.canvasContext.fillStyle = this.gameTable.getFillColor();
        this.canvasContext.fillRect(Math.floor(tableCoord.x * this.reculculateIndex), Math.floor(tableCoord.y * this.reculculateIndex),
            Math.floor(tableSize.width * this.reculculateIndex), Math.floor(tableSize.height * this.reculculateIndex));
            
        var leftRacketCoord = this.leftTennisRacket.getCoordinate();
        var leftRacketSize = this.leftTennisRacket.getDimensions();
        this.canvasContext.fillStyle = this.leftTennisRacket.getFillColor();
        this.canvasContext.fillRect(Math.floor(leftRacketCoord.x * this.reculculateIndex), Math.floor(leftRacketCoord.y * this.reculculateIndex),
            Math.floor(leftRacketSize.width * this.reculculateIndex), Math.floor(leftRacketSize.height * this.reculculateIndex));
        
        var rightRacketCoord = this.rightTennisRacket.getCoordinate();
        var rightRacketSize = this.rightTennisRacket.getDimensions();
        this.canvasContext.fillStyle = this.rightTennisRacket.getFillColor();
        this.canvasContext.fillRect(Math.floor(rightRacketCoord.x * this.reculculateIndex), Math.floor(rightRacketCoord.y * this.reculculateIndex),
            Math.floor(rightRacketSize.width * this.reculculateIndex), Math.floor(rightRacketSize.height * this.reculculateIndex));

        var ballCoord = this.gameBall.getCoordinate();
        var ballRadius = this.gameBall.getRadius();
        this.canvasContext.fillStyle = this.gameBall.getFillColor();
        this.canvasContext.beginPath();
        this.canvasContext.arc(Math.floor(ballCoord.x * this.reculculateIndex), Math.floor(ballCoord.y * this.reculculateIndex),
            Math.floor(ballRadius * this.reculculateIndex), 0, 2 * Math.PI);
        this.canvasContext.fill();
    }
}