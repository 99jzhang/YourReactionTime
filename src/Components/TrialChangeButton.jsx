import React from "react";
import "./TrialChangeButton.css";

function TrialChangeButton({ trials, isSelected, onClick }) {
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
