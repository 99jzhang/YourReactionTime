import React, { useState } from "react";
import "./ReactionArea.css";

function ReactionArea( {numTrials} ) {
    let waitingForStart = true;
    let waitingForGreen = false;
    let greenDisplayed = false;
    
    const [message, setMessage] = useState("Click here to start");
    const [avgMessage, setAvgMessage] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("#faf0ca");
    const [startTime, setStartTime] = useState(null);

    let reactionTimes = [];

    let timer;

    const setGreenColor = () => {
        waitingForGreen = false;
        greenDisplayed = true;
        setBackgroundColor("#32cd32");
        setMessage("Click Now!");
        setStartTime(Date.now());
    };

    const startGame = () => {
        setAvgMessage("");
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
        reactionTimes.push(reactionTime);
        let curTrial = reactionTimes.length;
        setBackgroundColor("#faf0ca");
        setMessage(`Trial #${curTrial}: ${reactionTime} ms. Click to play again.`);
        if (reactionTimes.length === numTrials) {
            const averageTime = reactionTimes.reduce((a, b) => a + b) / numTrials;
            setAvgMessage(`Average Reaction Time: ${averageTime.toFixed(2)} ms. Click to play again.`);
            reactionTimes = [];
        }
        waitingForStart = true;
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
            <div id="avg-msg">{avgMessage}</div>
        </div>
    );
}

export default ReactionArea;
