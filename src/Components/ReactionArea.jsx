import React, { useState, useRef } from "react";
import "./ReactionArea.css";

function ReactionArea({numTrials}) {
    const [waitingForStart, setWaitingForStart] = useState(true);
    const [waitingForGreen, setWaitingForGreen] = useState(false);
    const [greenDisplayed, setGreenDisplayed] = useState(false);
    
    const [message, setMessage] = useState("Click here to start");
    const [backgroundColor, setBackgroundColor] = useState("#faf0ca");
    const [startTime, setStartTime] = useState(null);

    const timerRef = useRef(null);

    const setGreenColor = () => {
        setWaitingForGreen(false);
        setBackgroundColor("#32cd32");
        setMessage("Click Now!");
        setStartTime(Date.now());
        setGreenDisplayed(true);
    };

    const startGame = () => {
        setWaitingForStart(false);
        setBackgroundColor("#c1121f");
        setMessage("Wait for the Green Color.");
        const randomNumber = Math.floor(Math.random() * 5000 + 2000);
        timerRef.current = setTimeout(setGreenColor, randomNumber);
        setWaitingForGreen(true);
    };

    const displayTooSoon = () => {
        setWaitingForGreen(false);
        setBackgroundColor("#faf0ca");
        setMessage("Too Soon. Click to replay.");
        clearTimeout(timerRef.current);
        setWaitingForStart(true);
    };

    const displayReactionTime = (reactionTime) => {
        setGreenDisplayed(false);
        setBackgroundColor("#faf0ca");
        setMessage(`${reactionTime} ms. Click to play again.`);
        setWaitingForStart(true);
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
