import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Timeline from "./components/Timeline";
import Contact from "./components/Contact";
import useReveal from "./hooks/useReveal";
import useSmoothScroll from "./hooks/useSmoothScroll";

export default function App() {
  const pageRef = useReveal();
  useSmoothScroll();

  return (
    <div ref={pageRef}>
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Timeline />
      <Contact />
      <footer className="footer">
        <span className="label">© {new Date().getFullYear()} Saksham Tejpal</span>
        <span className="label">Toronto</span>
      </footer>
    </div>
  );
}
