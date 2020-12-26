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

    //warn the user about data loss when the page is unloaded
    window.addEventListener('beforeunload',(EO) => {warnDataLost(EO)});

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

    //looking for save button
    const saveButtonElementSelector = 'button.saveGame';
    const saveButtonElement = document.querySelector(saveButtonElementSelector);

    //looking for show last twenty games button
    const showLastSavesButtonElementSelector = 'button.lastSaves';
    const showLastSavesButtonElement = document.querySelector(showLastSavesButtonElementSelector);

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

    saveButtonElement.addEventListener('touchstart', saveGameData);

    showLastSavesButtonElement.addEventListener('touchstart', showLastGameSaves);
    
    
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

    showLastSavesButtonElement.addEventListener('click', showLastGameSaves);


    //create game controller with use keyboard
    var gameController = new Controller(firstGamer, secondGamer, leftTennisRacket, rightTennisRacket, gameBall, gameTable, gameView);

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

    saveButtonElement.addEventListener('click', saveGameData);
    
    //initializing sounds for the game
    function soundInit() {
        wasPlayed = true;
        soundGoalScored.play();
        impactSound.play();
        soundGoalScored.pause();
        impactSound.pause();
    }

    //change the visibility of some element to hidden
    function hideElement(elementForHide) {
        elementForHide.style.visibility = 'hidden';
    }

    //change the visibility of some element to visible
    function showElement(elementForShow) {
        elementForShow.style.visibility = 'visible';
    }

    //data loss warning if the page is unloaded
    function warnDataLost(EO) {
        const defaultName = 'Игрок 1';
        const defaultScore = 0;
        if(firstGamer.getName() !== defaultName && (firstGamer.getScore() !== defaultScore || secondGamer.getScore() !== defaultScore)) {
            EO.preventDefault();
            EO.returnValue = 'Данные будут потеряны';
        }
    }

    //create hash for save data
    function createSaveObject() {
        var saveObject = {};
        saveObject.firstGamer = {name: firstGamer.getName(), score: firstGamer.getScore()};
        saveObject.secondGamer = {name: secondGamer.getName(), score: secondGamer.getScore()};
        return saveObject;
    }

    //get last saves from server
    function showLastGameSaves() {
        const commandRead = 'READ';
        const dataName = 'NOVIKOVA_EKATERINA_TENNIS_2020';
        const ajaxScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
        const methodPost = 'post';
        const controlString = '';

        var dataFromServer = {};

        var requestParameters = new URLSearchParams();
        requestParameters.append('f', commandRead);
        requestParameters.append('n', dataName);

        fetch(ajaxScript, { method: methodPost, body: requestParameters })
        .then( response => response.json() )
        .then( data => {
            if(data.error) {
                warnError();
                return;
            }else if(data.result === controlString){
                warnServerDataLost();
            } else {
                const divClass = 'div';
                const pClass = 'p';
                const buttonClass = 'button';
                const savedGamesPanelClass = 'savedGamesPanel';
                const formFieldClass = 'formField';
                const infoTextClass = 'infoText';
                const variableNull = null;

                dataFromServer = JSON.parse(data.result);

                var savedGamesPanelElement = document.createElement(divClass);
                savedGamesPanelElement.classList.add(savedGamesPanelClass);
                const numOfSaves = dataFromServer.preservation.length;
                
                for(let i = 0; i < numOfSaves; i++) {
                    if(dataFromServer.preservation[i] === variableNull) {
                        break;
                    }
                    let oneEntries = document.createElement(divClass);
                    oneEntries.classList.add(formFieldClass);
                    savedGamesPanelElement.append(oneEntries);

                    let firstGamerDiv = document.createElement(divClass);
                    firstGamerDiv.classList.add(infoTextClass);
                    let fierstGamerP = document.createElement(pClass);
                    fierstGamerP.textContent = dataFromServer.preservation[i].firstGamer.name;
                    firstGamerDiv.append(fierstGamerP);
                    oneEntries.append(firstGamerDiv);

                    let scoreGamersDiv = document.createElement(divClass);
                    scoreGamersDiv.classList.add(infoTextClass);
                    let scoretGamersP = document.createElement(pClass);
                    scoretGamersP.textContent = dataFromServer.preservation[i].firstGamer.score + ':' + dataFromServer.preservation[i].secondGamer.score;
                    scoreGamersDiv.append(scoretGamersP);
                    oneEntries.append(scoreGamersDiv);

                    let secondGamerDiv = document.createElement(divClass);
                    secondGamerDiv.classList.add(infoTextClass);
                    let secondGamerP = document.createElement(pClass);
                    secondGamerP.textContent = dataFromServer.preservation[i].secondGamer.name;
                    secondGamerDiv.append(secondGamerP);
                    oneEntries.append(secondGamerDiv);
                }

                var buttonSavedGamesPanel = document.createElement(buttonClass);
                buttonSavedGamesPanel.classList.add(formFieldClass);
                savedGamesPanelElement.append(buttonSavedGamesPanel);
                buttonSavedGamesPanel.onclick = () => {savedGamesPanelElement.remove();};
                buttonSavedGamesPanel.addEventListener('touchstart', () => {savedGamesPanelElement.remove();});
                buttonSavedGamesPanel.innerHTML = 'OK';
                document.body.append(savedGamesPanelElement);
                var savedGamesPanelElementHeight = savedGamesPanelElement.offsetHeight;
                console.log(savedGamesPanelElementHeight);
                savedGamesPanelElement.style.marginTop = '-' + Math.floor(savedGamesPanelElementHeight / 2) + 'px';
            }
        } )
        .catch( (error) => { warnError(); console.log(error); } );
    }

    //save data to server
    function saveGameData () {
        const defaultName = 'Игрок 1';
        const defaultScore = 0;
        if(firstGamer.getName() !== defaultName && (firstGamer.getScore() !== defaultScore || secondGamer.getScore() !== defaultScore)) {
            const commandLockget = 'LOCKGET';
            const commandUpdate = 'UPDATE';
            const dataName = 'NOVIKOVA_EKATERINA_TENNIS_2020';
            const ajaxScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
            const methodPost = 'post';
            const password = getPassword();
            const maxNumSaves = 20;
            const controlString = 'OK';
            const startElementToSave = 0;

            var insertNumber = 0;
            var dataFromServer = {};
            var currentGameData = {};
            var dataForSave = {};

            var requestParameters = new URLSearchParams();
            requestParameters.append('f', commandLockget);
            requestParameters.append('n', dataName);
            requestParameters.append('p', password);
            fetch(ajaxScript, { method: methodPost, body: requestParameters })
            .then( response => response.json() )
            .then( data => {
                if(data.error) {
                    warnError();
                    return;
                }else {
                    dataFromServer = JSON.parse(data.result);
                    insertNumber = dataFromServer.insertionPosition;
                }
            } )
            .then(() => {
                currentGameData = createSaveObject();
                dataForSave = dataFromServer;
                dataForSave.preservation[insertNumber] = currentGameData;
                if(dataForSave.insertionPosition === maxNumSaves - 1) {
                    dataForSave.insertionPosition = startElementToSave;
                } else {
                    dataForSave.insertionPosition = insertNumber + 1;
                }

                var dataForSaveJson = JSON.stringify(dataForSave);

                requestParameters.set('f', commandUpdate);
                requestParameters.append('v', dataForSaveJson);
                
                fetch(ajaxScript, { method: methodPost, body: requestParameters })
                .then( response => response.text() )
                .then( data => {
                    if(data.error) {
                        warnError();
                        return;
                    } else {
                        if(data.result === controlString) {
                            warnDataSaved();
                        } else {
                            warnError();
                        }
                    }
                })
                .catch( (error) => { warnError(); console.log(error); } )
            })
            .catch( (error) => { warnError(); console.log(error); } );

        } else {
            warnNothingToSave();
        }
    }

    //create and show warn that nothing to save and remove it
    function warnNothingToSave() {
        const divClass = 'div';
        var warnElement = document.createElement(divClass);
        warnElement.style.cssText = `width: 12em; height: 1.5em; margin: -0.75em 0 0 -6em; background-color: rgb(247,241,230); border: 0.1em solid rgb(217,176,151);
            border-radius: 0.5em; position: absolute; top: 50%; left: 50%; z-index: 10; padding: 1.5em; text-align: center;`;
        warnElement.innerHTML = 'Нет данных для сохранения';
        document.body.append(warnElement);
        setTimeout(() => warnElement.remove(), 2000);
    }

    //show error warning when saving game data
    function warnError() {
        const divClass = 'div';
        var warnElement = document.createElement(divClass);
        warnElement.style.cssText = `width: 12em; height: 4em; margin: -2em 0 0 -6em; background-color: rgb(247,241,230); border: 0.1em solid rgb(217,176,151);
            border-radius: 0.5em; position: absolute; top: 50%; left: 50%; z-index: 10; padding: 1.5em; word-wrap: break-word;`;
        warnElement.innerHTML = 'Произошла ошибка. Проверьте подключение к интернету и повторите попытку позже';
        document.body.append(warnElement);
        setTimeout(() => warnElement.remove(), 4000);
    }

    //show a message that the data has been saved
    function warnDataSaved() {
        const divClass = 'div';
        var warnElement = document.createElement(divClass);
        warnElement.style.cssText = `width: 12em; height: 1.5em; margin: -0.75em 0 0 -6em; background-color: rgb(247,241,230); border: 0.1em solid rgb(217,176,151);
            border-radius: 0.5em; position: absolute; top: 50%; left: 50%; z-index: 10; padding: 1.5em; text-align: center;`;
        warnElement.innerHTML = 'Данные сохранены';
        document.body.append(warnElement);
        setTimeout(() => warnElement.remove(), 2000);
    }

    function warnServerDataLost() {
        const divClass = 'div';
        var warnElement = document.createElement(divClass);
        warnElement.style.cssText = `width: 12em; height: 1.5em; margin: -0.75em 0 0 -6em; background-color: rgb(247,241,230); border: 0.1em solid rgb(217,176,151);
            border-radius: 0.5em; position: absolute; top: 50%; left: 50%; z-index: 10; padding: 1.5em; text-align: center;`;
        warnElement.innerHTML = 'Данные утрачены';
        document.body.append(warnElement);
        setTimeout(() => warnElement.remove(), 2000);
    }

    //function to get a random password
    function getPassword() {
        const min = 1;
        const max = 500;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

})()