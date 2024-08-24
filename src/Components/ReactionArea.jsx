import React, { useState } from "react";
import "./ReactionArea.css";

function ReactionArea() {
    let waitingForStart = true;
    let waitingForGreen = false;
    let greenDisplayed = false;
    
    const [message, setMessage] = useState("Click here to start");
    const [backgroundColor, setBackgroundColor] = useState("#faf0ca");
    const [startTime, setStartTime] = useState(null);

    let timer;

    const setGreenColor = () => {
        waitingForGreen = false;
        greenDisplayed = true;
        setBackgroundColor("#32cd32");
        setMessage("Click Now!");
        setStartTime(Date.now());
    };

    const startGame = () => {
        waitingForStart = false;
        waitingForGreen = true;
        setBackgroundColor("#c1121f");
        setMessage("Wait for the Green Color.");
        const randomNumber = Math.floor(Math.random() * 5000 + 2000);
        timer = setTimeout(setGreenColor, randomNumber);
    };

    const displayTooSoon = () => {
        waitingForGreen = false;
        waitingForStart = true;
        setBackgroundColor("#faf0ca");
        setMessage("Too Soon. Click to replay.");
        clearTimeout(timer);
    };

    const displayReactionTime = (reactionTime) => {
        greenDisplayed = false;
        waitingForStart = true;
        setBackgroundColor("#faf0ca");
        setMessage(`${reactionTime} ms. Click to play again.`);
    };

    const handleClick = () => {
        if (waitingForStart) {
            startGame();
        } else if (waitingForGreen) {
            displayTooSoon();
        } else if (greenDisplayed) {
            const clickTime = Date.now();
            const reactionTime = clickTime - startTime;
            displayReactionTime(reactionTime);
        }
    };

    return (
        <div id="reaction-area" style={{ backgroundColor }} onClick={handleClick}>
            <div id="rxn-area-msg">{message}</div>
        </div>
    );
}

export default ReactionArea;
