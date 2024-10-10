import React from "react";
import "./TrialChangeButton.css";

// Define the types for the props
interface TrialChangeButtonProps {
    trials: number;
    isSelected: boolean;
    onClick: () => void;
}

function TrialChangeButton({ trials, isSelected, onClick }: TrialChangeButtonProps) {
    return (
        <button
            className={`trial-button ${isSelected ? "selected" : ""}`}
            onClick={onClick}
        >
            {trials} {trials === 1 ? "Trial" : "Trials"}
        </button>
    );
}

export default TrialChangeButton;
