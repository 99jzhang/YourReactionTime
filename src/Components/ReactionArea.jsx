import React, { useState, useRef, useEffect } from "react";
import "./ReactionArea.css";

function ReactionArea({ numTrials }) {
    const [waitingForStart, setWaitingForStart] = useState(true);
    const [waitingForGreen, setWaitingForGreen] = useState(false);
    const [greenDisplayed, setGreenDisplayed] = useState(false);

    const [message, setMessage] = useState("Click here to start");
    const [backgroundColor, setBackgroundColor] = useState("#faf0ca");
    const [startTime, setStartTime] = useState(null);

    const [reactionTimes, setReactionTimes] = useState([]);
    const [size, setSize] = useState({ width: "90vw", height: "50vh" }); // Initial size
    const [isResizing, setIsResizing] = useState(false);

    const timerRef = useRef(null);
    const reactionAreaRef = useRef(null);

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
        const newReactionTimes = [...reactionTimes, reactionTime];
        setReactionTimes(newReactionTimes);
        const curTrial = newReactionTimes.length;

        if (curTrial >= numTrials && numTrials !== 1) {
            const averageTime = newReactionTimes.reduce((a, b) => a + b) / curTrial;
            setMessage(
                `Trial #${curTrial}: ${reactionTime} ms. \n Average Reaction Time over ${curTrial} trials: ${averageTime.toFixed(2)} ms. \n Click to play again.`
            );
            setReactionTimes([]);
        } else if (numTrials === 1) {
            setMessage(`${reactionTime} ms. Click to play again.`);
            setReactionTimes([]);
        } else {
            setMessage(`Trial #${curTrial}: ${reactionTime} ms. Click to play again.`);
        }

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

    const handleMouseDown = (e) => {
        setIsResizing(true);
    };

    const handleMouseMove = (e) => {
        if (isResizing) {
            const newWidth = `${e.clientX - reactionAreaRef.current.getBoundingClientRect().left}px`;
            const newHeight = `${e.clientY - reactionAreaRef.current.getBoundingClientRect().top}px`;
            setSize({ width: newWidth, height: newHeight });
        }
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div
            id="reaction-area"
            ref={reactionAreaRef}
            style={{ backgroundColor, width: size.width, height: size.height }}
            onMouseDown={handleClick}
        >
            <div id="rxn-area-msg">{message}</div>
            <div id="resize-handle" onMouseDown={handleMouseDown}></div>
        </div>
    );
}

export default ReactionArea;
