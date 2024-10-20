import React, { useState, useRef, useEffect } from "react";
import "./ReactionArea.css";

// Define the type for the 'colors' prop
interface Colors {
    start: string;
    waiting: string;
    green: string;
}

// Define the props interface
interface ReactionAreaProps {
    numTrials: number;
    colors: Colors;
}

function ReactionArea({ numTrials, colors }: ReactionAreaProps) {
    const [waitingForStart, setWaitingForStart] = useState(true);
    const [waitingForGreen, setWaitingForGreen] = useState(false);
    const [greenDisplayed, setGreenDisplayed] = useState(false);

    const [message, setMessage] = useState("Click here to start");
    const [backgroundColor, setBackgroundColor] = useState(colors.start);
    const [textColor, setTextColor] = useState("black");

    const [startTime, setStartTime] = useState<number | null>(null);
    const [reactionTimes, setReactionTimes] = useState<number[]>([]);

    const [size, setSize] = useState({ width: "90vw", height: "50vh" });
    const [isResizing, setIsResizing] = useState(false);

    const timerRef = useRef<number | null>(null);
    const reactionAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (waitingForStart) {
            setBackgroundColor(colors.start);
        }
    }, [colors.start, waitingForStart]);

    useEffect(() => {
        if (waitingForGreen) {
            setBackgroundColor(colors.waiting);
        }
    }, [colors.waiting, waitingForGreen]);

    useEffect(() => {
        if (greenDisplayed) {
            setBackgroundColor(colors.green);
        }
    }, [colors.green, greenDisplayed]);

    useEffect(() => {
        adjustTextColorBasedOn(backgroundColor);
    }, [backgroundColor]);

    const adjustTextColorBasedOn = (bgColor: string) => {
        const brightness = calculateBrightness(bgColor);
        setTextColor(brightness > 125 ? "black" : "white");
    };

    const calculateBrightness = (hexColor: string): number => {
        const rgb = hexToRgb(hexColor);
        return Math.sqrt(
            0.299 * (rgb.r * rgb.r) +
            0.587 * (rgb.g * rgb.g) +
            0.114 * (rgb.b * rgb.b)
        );
    };

    const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    };

    const setGreenColor = () => {
        setWaitingForGreen(false);
        setBackgroundColor(colors.green);
        setMessage("Click Now!");
        setStartTime(Date.now());
        setGreenDisplayed(true);
    };

    const startGame = () => {
        setWaitingForStart(false);
        setBackgroundColor(colors.waiting);
        setMessage("Wait for the new color.");
        const randomNumber = Math.floor(Math.random() * 5000 + 2000);
        timerRef.current = window.setTimeout(setGreenColor, randomNumber);
        setWaitingForGreen(true);
    };

    const displayTooSoon = () => {
        setWaitingForGreen(false);
        setBackgroundColor(colors.start);
        setMessage("Too Soon. Click to replay.");
        if (timerRef.current !== null) clearTimeout(timerRef.current);
        setWaitingForStart(true);
    };

    const displayReactionTime = (reactionTime: number) => {
        setGreenDisplayed(false);
        setBackgroundColor(colors.start);
        adjustTextColorBasedOn(colors.start);
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

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLDivElement).id === "resize-handle") return;

        if (waitingForStart) {
            startGame();
        } else if (waitingForGreen) {
            displayTooSoon();
        } else if (greenDisplayed) {
            const clickTime = Date.now();
            const reactionTime = clickTime - (startTime || 0);
            displayReactionTime(reactionTime);
        }
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if ((e.target as HTMLDivElement).id === "resize-handle") {
            setIsResizing(true);
            document.body.style.cursor = "se-resize";
            e.stopPropagation();
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizing && reactionAreaRef.current) {
            const newWidth = `${e.clientX - reactionAreaRef.current.getBoundingClientRect().left}px`;
            const newHeight = `${e.clientY - reactionAreaRef.current.getBoundingClientRect().top}px`;
            setSize({ width: newWidth, height: newHeight });
        }
    };

    const handleMouseUp = () => {
        if (isResizing) {
            setIsResizing(false);
            document.body.style.cursor = "default";
        }
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
            className="container"
            id="reaction-area"
            ref={reactionAreaRef}
            style={{ backgroundColor, width: size.width, height: size.height }}
            onMouseDown={handleClick}
        >
            <div id="rxn-area-msg" style={{ color: textColor }}>{message}</div>
            <div id="resize-handle" onMouseDown={handleMouseDown}></div>
        </div>
    );
}

export default ReactionArea;
