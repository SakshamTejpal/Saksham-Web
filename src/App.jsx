import { useState } from 'react'
import './App.css'
import About from './components/about';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Projects from './components/Projects';


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Hero />
      <About />
      <Projects />  
      <Contact />
      <footer className="footer">
        <p>© 2023 Saksham Tejpal. All rights reserved.</p>        
      </footer>
    </div>
  )
}

export default App
