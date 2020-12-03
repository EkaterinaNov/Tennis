'use strict';
(function() {
    const entryPanelClass = 'entryPanel';
    const entryPanelElement = document.getElementsByClassName(entryPanelClass)[0];

    function floatingOnTopCenter (animatedElement) {
        const bodyWidth = document.body.offsetWidth;
        const animatedElementWidth = animatedElement.offsetWidth;
        const animatedElementHeight = animatedElement.offsetHeight;
        const startX = (bodyWidth / 2) - (animatedElementWidth / 2);
        const startY = -animatedElementHeight - 10;
        const endX = startX;
        const endY = animatedElementHeight + 20;

        const keyframes = [
            {transform: 'translate3D(startX, startY, 0)'},
            {transform: 'translate3D(endX, endY, 0)'}
        ];

        const options = {
            duration: 1000,
            delay: 1000
        };

        animatedElement.animate(keyframes, options);
    }

    floatingOnTopCenter(entryPanelElement);
})()
