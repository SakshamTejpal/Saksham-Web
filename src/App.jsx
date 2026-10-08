import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Timeline />
      <Contact />
      <footer>
        <p>© {new Date().getFullYear()} Saksham Tejpal</p>
      </footer>
    </>
  );
}
