import React from "react";

export const Confetti = () => {

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    let requestID;
    const startAnimation = () => {
        // Animation using requestAnimationFrame
        let start = Date.now();
        const animatedText = document.querySelector(".myDiv");

        function playAnimation() {
			console.log("hello")
            const interval = Date.now() - start;
            animatedText.style.top = `${interval / 3}px`;
            if (interval > 1000) {
                start = Date.now();
                animatedText.style.top = 0;
            }

            requestID = requestAnimationFrame(playAnimation);
        }
        requestAnimationFrame(playAnimation);
    };

    const stopAnimation = () => cancelAnimationFrame(requestID);

    return (
        <div>
            <button className="btn" onClick={startAnimation}>
                Start Animation Using requestAnimationFrame
            </button>
            <button className="btn" onClick={stopAnimation}>
                Stop Animation Using requestAnimationFrame
            </button>
            <div className="myDiv">Demo Page</div>
        </div>
    );
};
