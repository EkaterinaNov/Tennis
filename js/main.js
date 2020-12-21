(function(){
    var wasPlayed = false;

    //color for al elements
    var colors = {tableColor: '#9EBFC6', leftRacketColor: '#D96826', rightRacketColor: '#9D2225', ballColor: '#F7B53A'};
    //create two gamers
    const firstGamerNameClass = 'firstPlayerName';
    const secondGamerNameClass = 'secondPlayerName';
    const buttonOnEntryPanelId = 'enterGamers';
    const buttonOnEntryPanelElement = document.getElementById(buttonOnEntryPanelId);
    
    var firstGamerElement = document.getElementsByClassName(firstGamerNameClass)[0];
    var secondGamerElement = document.getElementsByClassName(secondGamerNameClass)[0];
    var firstGamer = new Gamer(firstGamerElement.textContent);
    buttonOnEntryPanelElement.addEventListener('click', ()=>{firstGamer.setName(firstGamerElement.textContent)});
    var secondGamer = new Gamer(secondGamerElement.textContent);
    buttonOnEntryPanelElement.addEventListener('click', ()=>{secondGamer.setName(secondGamerElement.textContent)});

    //create audio
    var soundGoalScored = new Audio;
    soundGoalScored.src = "./audio/soundGoalScored.mp3";
    var impactSound = new Audio;
    impactSound.src = "./audio/impactSound.mp3";

    //create game table
    var gameTable = new GameTable();

    //create two tennis racket
    const gamePanelClass = 'gamePanel';
    const gamePanelElement = document.getElementsByClassName(gamePanelClass)[0];
    //const gamePanelElementWidth = parseInt(gamePanelElement.clientWidth);
    var leftTennisRacket = new TennisRacket(gameTable, true);
    var rightTennisRacket = new TennisRacket(gameTable, false);
    rightTennisRacket.setFillColor(colors.rightRacketColor);

    //create gameBall
    var gameBall = new GameBall(gameTable, leftTennisRacket, rightTennisRacket, firstGamer, secondGamer, soundGoalScored, impactSound);

    //looking for an element containing the game score
    const scoreElementClass = 'gameScore';
    const scoreElement = document.getElementsByClassName(scoreElementClass)[0];

    //looking for an element show winner
    const winnerPanelElementClass = 'winnerPanel';
    const winnerPanelElement = document.getElementsByClassName(winnerPanelElementClass)[0];

    //looking for an element include winner name
    const forInsertWinnerNameId = 'winnerName';
    const forInsertWinnerNameElement = document.getElementById(forInsertWinnerNameId);

    //looking for a button for hige winner panel
    const buttonWinnerPanelSelector = 'button#infoField';
    const buttonWinnerPanelElement = document.querySelector(buttonWinnerPanelSelector);

    //create view
    var gameView = new CanvasView(gameTable, leftTennisRacket, rightTennisRacket, gameBall, firstGamer, secondGamer, scoreElement, gamePanelElement,
        winnerPanelElement, forInsertWinnerNameElement);

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


    //looking for a button start
    const startButtonElementSelector = 'button.start';
    const startButtonElement = document.querySelector(startButtonElementSelector);

    //looking for a button start
    const stopButtonElementSelector = 'button.stop';
    const stopButtonElement = document.querySelector(stopButtonElementSelector);

    //looking for a button reset score
    const resetScoreButtonElementSelector = 'button.resetScore';
    const resetScoreButtonElement = document.querySelector(resetScoreButtonElementSelector);


    //add events for touch
    //looking for a button for show rules for touch
    const buttonShowGameRulesTouchSelector = 'button.showRulesTouch';
    const buttonShowGameRulesTouchElement = document.querySelector(buttonShowGameRulesTouchSelector);

    //looking for a  game rules panel
    const gameRulesTouchPanelId = 'touchRules';
    const gameRulesTouchPanelElement = document.getElementById(gameRulesTouchPanelId);

    //looking for a button for hide rules panel
    const buttonGameTouchRulesPanelId = 'touchRule';
    const buttonGameTouchRulesPanelElement = document.getElementById(buttonGameTouchRulesPanelId);

    buttonGameTouchRulesPanelElement.addEventListener('touchstart', () => {hideElement(gameRulesTouchPanelElement)});

    buttonShowGameRulesTouchElement.addEventListener('touchstart', () => showElement(gameRulesTouchPanelElement));

    buttonWinnerPanelElement.addEventListener('touchstart', () => {hideElement(winnerPanelElement)});
    
    
    //add events for keyboard
    //looking for a button for show rules for keyboard
    const buttonShowGameRulesKeysSelector = 'button.showRulesKeys';
    const buttonShowGameRulesKeysElement = document.querySelector(buttonShowGameRulesKeysSelector);

    //looking for a  game rules panel
    const gameRulesKeysPanelId = 'keyboardRules';
    const gameRulesKeysPanelElement = document.getElementById(gameRulesKeysPanelId);

    //looking for a button for hide rules panel
    const buttonGameKeysRulesPanelId = 'keyRule';
    const buttonGameKeysRulesPanelElement = document.getElementById(buttonGameKeysRulesPanelId);
    buttonGameKeysRulesPanelElement.addEventListener('click', () => {hideElement(gameRulesKeysPanelElement)});

    buttonShowGameRulesKeysElement.addEventListener('click', () => showElement(gameRulesKeysPanelElement));

    buttonWinnerPanelElement.addEventListener('click', () => {hideElement(winnerPanelElement)});


    //create game controller with use keyboard
    var gameController = new KeyboardController(firstGamer, secondGamer, leftTennisRacket, rightTennisRacket, gameBall, gameTable, gameView);

    document.body.addEventListener('keydown', () => {
        gameController.stopStartGameLoop();
        if(!wasPlayed) {
            soundInit();
        }
    });

    startButtonElement.addEventListener('click', ()=>{
        gameController.startGameLoop();
        if(!wasPlayed) {
            soundInit();
        }
    });

    stopButtonElement.addEventListener('click', ()=>{gameController.stopGameLoop()});

    resetScoreButtonElement.addEventListener('click', ()=>{gameController.resetGameScore();});

    function soundInit() {
        wasPlayed = true;
        soundGoalScored.play();
        impactSound.play();
        soundGoalScored.pause();
        impactSound.pause();
    }

    function hideElement(elementForHide) {
        elementForHide.style.visibility = 'hidden';
    }

    function showElement(elementForShow) {
        elementForShow.style.visibility = 'visible';
    }

})()