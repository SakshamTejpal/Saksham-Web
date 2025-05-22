import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import About from './components/About';
import Contact from './components/Contact';
import Header from './components/Header';
import Projects from './components/Projects';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Header />
                
      <div>
        <About />
      </div>

      <Contact />

      <Projects />
      
    </div>
  )
}

export default App
