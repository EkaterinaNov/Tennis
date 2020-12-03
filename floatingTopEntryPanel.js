'use strict';
(function() {
    const entryPanelClass = 'entryPanel';
    const entryPanelElement = document.getElementsByClassName(entryPanelClass)[0];
    const gamePanelClass = 'gamePanel';
    const gamePanelElement = document.getElementsByClassName(gamePanelClass)[0];

    function floatingOnTopCenter (animatedElement, parentElement) {
        const parentElementWidth = parseFloat(parentElement.offsetWidth);
        const animatedElementWidth = parseFloat(animatedElement.offsetWidth);
        const animatedElementHeight = parseFloat(animatedElement.offsetHeight);
        const startX = (parentElementWidth / 2) - (animatedElementWidth / 2);
        const startY = -animatedElementHeight - 10;
        const endX = startX;
        const endY = 20;

        const keyframes = [
            {transform: `translate3D(${startX}px, ${startY}px, 0px)`},
            {transform: `translate3D(${endX}px, ${endY}px, 0px)`}
        ];

        const options = {
            duration: 1000,
            delay: 1000
        };

        animatedElement.style.transform = `translate3D(${startX}px, ${startY}px, 0px)`;
        animatedElement.animate(keyframes, options);
        animatedElement.style.transform = `translate3D(${endX}px, ${endY}px, 0px)`;
    }

    floatingOnTopCenter(entryPanelElement, gamePanelElement);
})()
