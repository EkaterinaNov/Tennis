'use strict';
(function() {
    function validFirstPlayer(isFocus) {
        var errorCounter = 0;
        const firstPlayerNameId = 'firstPlayer';
        var validatedElement = document.getElementById(firstPlayerNameId);

        if(!validatedElement.value) {
            errorCounter++;
            if(isFocus) {
                validatedElement.focus();
            }
        }
        return errorCounter;
    }
    function validSecondPlayer(isFocus) {
        var errorCounter = 0;
        const secondPlayerNameId = 'secondPlayer';
        var validatedElement = document.getElementById(secondPlayerNameId);

        if(!validatedElement.value) {
            errorCounter++;
            if(isFocus) {
                validatedElement.focus();
            }
        }
        return errorCounter;
    }

    function clearEntryPanel() {
        const emptyString = '';
        const firstPlayerNameId = 'firstPlayer';
        var firstPlayerElement = document.getElementById(firstPlayerNameId);
        const secondPlayerNameId = 'secondPlayer';
        var secondPlayerElement = document.getElementById(secondPlayerNameId);
        firstPlayerElement.value = emptyString;
        secondPlayerElement.value = emptyString;
    }

    function validateEntryPanel() {

        try {
            const entryPanelClass = 'entryPanel';
            const entryPanelElement = document.getElementsByClassName(entryPanelClass)[0];
            const notificationElementClass = 'notificationLabel';
            const notificationElement = document.getElementsByClassName(notificationElementClass)[0];
            const visibilityVisible = 'visible';
            const visibilityHidden = 'hidden';
            var numberMissed = 0;

            numberMissed += validFirstPlayer(!numberMissed);
            numberMissed += validSecondPlayer(!numberMissed);

            if(numberMissed) {
                notificationElement.style.visibility = visibilityVisible;
            } else {
                notificationElement.style.visibility = visibilityHidden;
                changeFirstPlayerName();
                changeSecondPlayerName();
                entryPanelElement.style.transform = '';
                clearEntryPanel();
            }
        }

        catch {
            alert('Извините, что-то пошло не так. Проверьте правильность заполнения формы.');
        }
        return;
    }

    function changeFirstPlayerName() {
        const pastNameElementClass = 'firstPlayerName';
        const firstPlayerNameId = 'firstPlayer';
        var firstPlayerNameValue = document.getElementById(firstPlayerNameId).value;
        var pastNameElement = document.getElementsByClassName(pastNameElementClass)[0];
        pastNameElement.textContent = firstPlayerNameValue;
    }

    function changeSecondPlayerName() {
        const pastNameElementClass = 'secondPlayerName';
        const secondPlayerNameId = 'secondPlayer';
        var secondPlayerNameValue = document.getElementById(secondPlayerNameId).value;
        var pastNameElement = document.getElementsByClassName(pastNameElementClass)[0];
        pastNameElement.textContent = secondPlayerNameValue;
    }

    const buttonOnEntryPanelId = 'enterGamers';
    const buttonOnEntryPanelElement = document.getElementById(buttonOnEntryPanelId);
    buttonOnEntryPanelElement.addEventListener('click', validateEntryPanel);
})()