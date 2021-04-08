'use strict';
(function() {
    const entryPanelClass = 'entryPanel';
    const entryPanelElement = document.getElementsByClassName(entryPanelClass)[0];
    const gamePanelClass = 'gamePanel';
    const gamePanelElement = document.getElementsByClassName(gamePanelClass)[0];

    function floatingOnTopCenter (animatedElement, parentElement) {
        const parentElementWidth = parentElement.offsetWidth;
        const animatedElementWidth = animatedElement.offsetWidth;
        const animatedElementHeight = animatedElement.offsetHeight;
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
            delay: 500
        };

        animatedElement.animate(keyframes, options);
        setTimeout(()=>{setEndCoordinate(animatedElement, endX, endY)}, 1400);
        return;
    }

    function setEndCoordinate(animatedElement, coordX,coordY) {
        animatedElement.style.transform = `translate3D(${coordX}px, ${coordY}px, 0px)`;
        return;
    }

    const renameButtonClass = 'rename';
    const renameButtonElement = document.getElementsByClassName(renameButtonClass)[0];
    renameButtonElement.addEventListener('click', function(){floatingOnTopCenter(entryPanelElement, gamePanelElement)});
    floatingOnTopCenter(entryPanelElement, gamePanelElement);
})()
