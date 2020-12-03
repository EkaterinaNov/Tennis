'use strict';
(function() {
    function validFirstPlayer(isFocus) {
        var errorCounter = 0;
        var validatedElement = document.forms.entryPanel.elements.firstPlayer;

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
        var validatedElement = document.forms.entryPanel.elements.secondPlayer;

        if(!validatedElement.value) {
            errorCounter++;
            if(isFocus) {
                validatedElement.focus();
            }
        }
        return errorCounter;
    }

    function validateEntryPanel(EO) {
        EO=EO||window.event;

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
                EO.preventDefault();
            } else {
                notificationElement.style.visibility = visibilityHidden;
                changeFirstPlayerName();
                changeSecondPlayerName();
                entryPanelElement.style.transform = '';
                EO.preventDefault();
            }
        }

        catch {
            alert('Извините, что-то пошло не так. Проверьте правильность заполнения формы.');
            EO.preventDefault();
        }
        return;
    }

    function changeFirstPlayerName() {
        const pastNameElementClass = 'firstPlayerName';
        var firstPlayerNameValue = document.forms.entryPanel.elements.firstPlayer.value;
        var pastNameElement = document.getElementsByClassName(pastNameElementClass)[0];
        pastNameElement.textContent = firstPlayerNameValue;
    }

    function changeSecondPlayerName() {
        const pastNameElementClass = 'secondPlayerName';
        var secondPlayerNameValue = document.forms.entryPanel.elements.secondPlayer.value;
        var pastNameElement = document.getElementsByClassName(pastNameElementClass)[0];
        pastNameElement.textContent = secondPlayerNameValue;
    }

    const buttonFormFieldSelector = 'button.formField';
    const buttonFormFieldElement = document.querySelector(buttonFormFieldSelector);
    buttonFormFieldElement.addEventListener("click", validateEntryPanel);
})()