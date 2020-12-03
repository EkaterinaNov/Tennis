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
        const endY = 20;

        const keyframes = [
            {transform: `translate3D(${startX}px, ${startY}px, 0px)`},
            {transform: `translate3D(${endX}px, ${endY}px, 0px)`}
        ];

        const options = {
            duration: 1000,
            delay: 1000
        };

        animatedElement.animate(keyframes, options);
        animatedElement.style.left = endX + 'px';
        animatedElement.style.top = endY + 'px';
    }

    floatingOnTopCenter(entryPanelElement);
})()
