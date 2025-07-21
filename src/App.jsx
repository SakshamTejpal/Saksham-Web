import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Timeline from './components/Timeline.jsx';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
  const [count, setCount] = useState(0)
  return (
    <div className="main-container">
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Timeline />
      <Contact />
      <footer className="footer">
        <p>© 2025 Saksham Tejpal</p>        
      </footer>
    </div>
  )
}

export default App
