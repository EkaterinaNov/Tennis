(function(){
    //color for al elements
    var colors = {tableColor: '#9EBFC6', leftRacketColor: '#D96826', rightRacketColor: '#9D2225', ballColor: '#F7B53A'};
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

    //create game table
    var gameTable = new GameTable();

    //create two tennis racket
    const gamePanelClass = 'gamePanel';
    const gamePanelElement = document.getElementsByClassName(gamePanelClass)[0];
    const gamePanelElementWidth = parseInt(gamePanelElement.clientWidth);
    var leftTennisRacket = new TennisRacket(gameTable, true);
    var rightTennisRacket = new TennisRacket(gameTable, false);
    rightTennisRacket.setFillColor(colors.rightRacketColor);

    //create gameBall
    var gameBall = new GameBall(gameTable, leftTennisRacket, rightTennisRacket, firstGamer, secondGamer);

    //looking for an element containing the game score
    var scoreElementClass = 'gameScore';
    var scoreElement = document.getElementsByClassName(scoreElementClass)[0];

    //create view
    var gameView = new CanvasView(gameTable, leftTennisRacket, rightTennisRacket, gameBall, firstGamer, secondGamer, scoreElement);

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
        // create game controller with use touch
        var gameController = new TouchController(firstGamer, secondGamer, leftTennisRacket, rightTennisRacket, gameBall, gameTable);
    } else {
        //create game controller with use keyboard
        var gameController = new KeyboardController(firstGamer, secondGamer, leftTennisRacket, rightTennisRacket, gameBall, gameTable, gameView, gamePanelElement);
    }
})()