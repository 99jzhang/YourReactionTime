// <!-- Use "npm run dev" in terminal to see website. It will auto update with changes here -->

import { useState } from 'react'
import './App.css'
import ReactionArea from './Components/ReactionArea'
import TrialChangeButton from './Components/TrialChangeButton'

function App() {
  const [selectedTrials, setSelectedTrials] = useState(1);

  const handleSelection = (trials) => {
      setSelectedTrials(trials);
  };

  return (
    <>
      <div id="title-area">
        <h1 className="header-txt">YourReactionTime</h1>
        <p className="header-txt">A reaction time tester website with customizable attributes</p>
      </div>
      
      <div id="dir">
        <h2 className="dir-txt">Directions</h2>
        <p className="dir-txt">Click below and wait for the color change</p>
      </div>

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

      <div className="container" id="reaction-container">
        <ReactionArea numTrials={selectedTrials}/>
      </div>
    </>
  )
}

export default App
