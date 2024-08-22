// <!-- Use "npm run dev" in terminal to see website. It will auto update with changes here -->

import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReactionArea from './Components/ReactionArea'

function App() {
  const [color, setColor] = useState("");

  return (
    <>
      <div>
        <ReactionArea />
      </div>
    </>
  )
}

export default App
