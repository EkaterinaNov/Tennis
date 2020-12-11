(function(){
    //color for al elements
    var colors = {tableColor: 0x9EBFC6, leftRacketColor: 0x1E7392, rightRacketColor: 0x9D2225, ballColor: 0xF7B53A};
    //create two gamers
    const firstGamerNameClass = 'firstPlayerName';
    const secondGamerNameClass = 'secondPlayerName';
    const buttonOnEntryPanelClass = 'button.formField';
    const buttonOnEntryPanelElement = document.querySelector(buttonOnEntryPanelClass);
    
    var firstGamerElement = document.getElementsByClassName(firstGamerNameClass)[0];
    var secondGamerElement = document.getElementsByClassName(secondGamerNameClass)[0];
    var firstGamer = new Gamer(firstGamerElement.textContent);
    buttonOnEntryPanelElement.addEventListener('click', ()=>{firstGamer.setName(firstGamerElement.textContent)});
    var secondGamer = new Gamer(secondGamerElement.textContent);
    buttonOnEntryPanelElement.addEventListener('click', ()=>{secondGamer.setName(secondGamerElement.textContent)});

    //create two tennis racket
    const gamePanelClass = 'gamePanel';
    const gamePanelElement = document.getElementsByClassName(gamePanelClass)[0];
    const gamePanelElementWidth = parseInt(gamePanelElement.clientWidth);
    var leftTennisRacket = new TennisRacket(gamePanelElementWidth, true);
    var rightTennisRacket = new TennisRacket(gamePanelElementWidth, false);
    rightTennisRacket.setFillColor(colors.rightRacketColor);

    //create gameBall
    var gameBall = new GameBall(gamePanelElementWidth, leftTennisRacket, rightTennisRacket, firstGamer, secondGamer);

    //create game table
    var gameTable = new GameTable(gamePanelElementWidth);

    //create view
    var gameView = new CanvasView(gameTable, leftTennisRacket, rightTennisRacket, gameBall);

    //set view all game objects
    gameTable.setView(gameView);
    gameBall.setView(gameView);

    leftTennisRacket.setView(gameView);
    rightTennisRacket.setView(gameView);

    firstGamer.setView(gameView);
    secondGamer.setView(gameView);
    
    firstGamer.setTennisRacket(leftTennisRacket, true);
    firstGamer.setTennisRacket(rightTennisRacket, false);
    secondGamer.setTennisRacket(leftTennisRacket, true);
    secondGamer.setTennisRacket(rightTennisRacket, false);
    firstGamer.setGameBall(gameBall);
    secondGamer.setGameBall(gameBall);

    if (Modernizr.touch){
        // можем использовать rollover/rollouts события
    } else {
        //create game controller
        var gameController = new KeyboardController(firstGamer, secondGamer, leftTennisRacket, rightTennisRacket, gameBall, gameTable);
    }
})()