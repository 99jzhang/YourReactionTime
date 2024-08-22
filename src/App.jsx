// <!-- Use "npm run dev" in terminal to see website. It will auto update with changes here -->

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactionArea from './Components/ReactionArea'
import TrialChangeButton from './Components/TrialChangeButton'

function App() {
  const [color, setColor] = useState("");

  return (
    <>
      <div id="title-area">
        <h1>YourReactionTime</h1>
        <p>A reaction time tester website with customizable attributes</p>
      </div>
      <div>
        <h3>Directions</h3>
        <p>Click below and wait for the color change</p>
      </div>

      <div class="container" id="trial-change-container">
        <TrialChangeButton />
        <TrialChangeButton />
        <TrialChangeButton />
        <TrialChangeButton />
      </div>
      
      <div class="container" id="reaction-container">
        <ReactionArea />
      </div>
    </>
  )
}

export default App
