import { useState, useEffect } from 'react';
import './App.css';
import ReactionArea from './Components/ReactionArea';
import TrialChangeButton from './Components/TrialChangeButton';
import ColorChangeInput from './Components/ColorChangeInput';

import axios from "axios";
import OAuthButton from './Components/OAuthButton';

function App() {
    const fetchAPI = async () => {
        const response = await axios.get("http://localhost:8080/api");
        setArray(response.data.fruits);
        console.log(response.data.fruits);
    }
    useEffect(() => {
        fetchAPI();
    }, []);
    const [array, setArray] = useState([]);

    const [selectedTrials, setSelectedTrials] = useState(1);
    const [rxnAreaColors, setRxnAreaColors] = useState({
        start: '#faf0ca',
        waiting: '#bc797e',
        green: '#32cd32',
    });

    const handleSelection = (trials) => {
        setSelectedTrials(trials);
    };

    const handleColorChange = (screen, color) => {
        setRxnAreaColors((prevColors) => ({
            ...prevColors,
            [screen]: color,
        }));
    };

    return (
        <>
            <div id="title-area">
                <h1 className="header-txt">YourReactionTime {array}</h1>
                <p className="header-txt">A reaction time tester website with customizable attributes</p>
            </div>
            <OAuthButton/>
            <div id="dir">
                <h2 className="dir-txt">Directions</h2>
                <ul>    
                    <li className="dir-txt">Click below and wait for the color change</li>
                    <li className="dir-txt">Choose 1 trial or view average of multiple trials</li>
                    <li className="dir-txt">Change color of each screen</li>
                    <li className="dir-txt">Click and drag button right corner to manipulate reaction area size</li>
                </ul>
            </div>

            <div className="container" id="trial-color-container">
                <div className="container" id="trial-change-container">
                    <TrialChangeButton
                        trials={1}
                        isSelected={selectedTrials === 1}
                        onClick={() => handleSelection(1)}
                    />
                    <TrialChangeButton
                        trials={3}
                        isSelected={selectedTrials === 3}
                        onClick={() => handleSelection(3)}
                    />
                    <TrialChangeButton
                        trials={5}
                        isSelected={selectedTrials === 5}
                        onClick={() => handleSelection(5)}
                    />
                </div>

                <div className="container" id="color-change-container">
                    <ColorChangeInput
                        label="Start Color"
                        color={rxnAreaColors.start}
                        onColorChange={(color) => handleColorChange('start', color)}
                    />
                    <ColorChangeInput
                        label="Waiting Color"
                        color={rxnAreaColors.waiting}
                        onColorChange={(color) => handleColorChange('waiting', color)}
                    />
                    <ColorChangeInput
                        label="Reaction Color"
                        color={rxnAreaColors.green}
                        onColorChange={(color) => handleColorChange('green', color)}
                    />
                </div>
            </div> 

            <div className="container" id="reaction-area-container">
                <ReactionArea numTrials={selectedTrials} colors={rxnAreaColors} />
            </div>
            
            
        </>
    );
}

export default App;
