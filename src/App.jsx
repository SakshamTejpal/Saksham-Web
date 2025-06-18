import { useState } from 'react'
import './App.css'
import About from './components/about';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Timeline from './components/timeline.jsx';
import Navbar from './components/Navbar';



function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar />
      <Hero />
      <About />
      <Timeline />
      <Contact />
      <footer className="footer">
        <p>© 2025 Saksham Tejpal. All rights reserved.</p>        
      </footer>
    </div>
  )
}

export default App
