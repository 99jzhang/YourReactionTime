import React, { useState } from "react";
import "./ReactionArea.css";

function ReactionArea() {
    const [waitingForStart, setWaitingForStart] = useState(true);
    const [waitingForGreen, setWaitingForGreen] = useState(false);
    const [greenDisplayed, setGreenDisplayed] = useState(false);
    
    const [message, setMessage] = useState("Click here to start");
    const [backgroundColor, setBackgroundColor] = useState("#faf0ca");
    const [startTime, setStartTime] = useState(null);

    let timer;

    const setGreenColor = () => {
        setWaitingForGreen(false);
        setGreenDisplayed(true);
        setBackgroundColor("#32cd32");
        setMessage("Click Now!");
        setStartTime(Date.now());
    };

    const startGame = () => {
        setWaitingForStart(false);
        setWaitingForGreen(true);
        setBackgroundColor("#c1121f");
        setMessage("Wait for the Green Color.");
        const randomNumber = Math.floor(Math.random() * 5000 + 2000);
        timer = setTimeout(setGreenColor, randomNumber);
    };

    const displayTooSoon = () => {
        setWaitingForGreen(false);
        setWaitingForStart(true);
        setBackgroundColor("#faf0ca");
        setMessage("Too Soon. Click to replay.");
        clearTimeout(timer);
    };

    const displayReactionTime = (reactionTime) => {
        setGreenDisplayed(false);
        setWaitingForStart(true);
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
