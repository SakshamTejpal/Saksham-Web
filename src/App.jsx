import { useState } from 'react'
import './App.css'
import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Projects from './components/Projects';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Hero />
      <About />          

      
    </div>
  )
}

export default App
