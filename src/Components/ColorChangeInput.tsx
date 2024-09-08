import React, { useState } from 'react';
import ChromePicker from "react-color";
import ColorResult from "react-color";
import './ColorChangeInput.css';

// Define the types for the props
interface ColorChangeInputProps {
    label: string;
    color: string;
    onColorChange: (color: string) => void;
}

function ColorChangeInput({ label, color, onColorChange }: ColorChangeInputProps) {
    const [displayColorPicker, setDisplayColorPicker] = useState<boolean>(false);
    const [currentColor, setCurrentColor] = useState<string>(color);

    const handleClick = () => {
        setDisplayColorPicker(prev => !prev);
    };

    const handleClose = () => {
        setDisplayColorPicker(false);
    };

    const handleColorChange = (newColor: ColorResult) => {
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
