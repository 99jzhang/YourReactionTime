import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import './ColorChangeInput.css';

function ColorChangeInput({ label, color, onColorChange }) {
    const [displayColorPicker, setDisplayColorPicker] = useState(false);
    const [currentColor, setCurrentColor] = useState(color);

    const handleClick = () => {
        setDisplayColorPicker(!displayColorPicker);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleColorChange = (newColor) => {
        setCurrentColor(newColor.hex);
        onColorChange(newColor.hex);
    };

    return (
        <div className="color-change-input">
            <label>{label}</label>
            <div className="color-swatch" onClick={handleClick} style={{ backgroundColor: currentColor }}></div>
            {displayColorPicker ? (
                <div className="popover">
                    <div className="cover" onClick={handleClose} />
                    <ChromePicker color={currentColor} onChange={handleColorChange} />
                </div>
            ) : null}
        </div>
    );
}

export default ColorChangeInput;
