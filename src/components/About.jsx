import { useRef, useState, useEffect } from "react";
import profilePic from "../assets/IMG_4087-1.JPEG";
import "../styles/About.css"; 

function About() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "50px",
      threshold: 0.3, // when 30% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        setIsVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section className="about" id="about">
      <div ref={containerRef} className="about-content">
        <img
          src={profilePic}
          alt="Saksham Tejpal"
          className={`profile-image ${isVisible ? "visible" : ""}`}
        />
        <div className={`about-text ${isVisible ? "visible" : ""}`}>
          <p>
            I’m a <span className="about-highlight">Software Developer</span> passionate about solving
            logical problems and creating unique solutions. I’m currently pursuing
            <span className="about-highlight"> Bachelor's of Computer Science</span> specializing in
            <span className="about-highlight"> Data Science</span> at Ontario Tech University,
            and will graduate in May 2026. 
          </p>
          <br />
          <p>
            I love diving into <span className="about-highlight">back-end development</span>,
            <span className="about-highlight"> data science</span>, <span className="about-highlight">data structures</span>,
            and <span className="about-highlight">algorithms</span>, where I can transform abstract problems into elegant, high-performance code.
            I’ve built <span className="about-highlight">full-stack web</span> and <span className="about-highlight">mobile applications </span>
             and administered databases. Lately, I’ve been exploring
            <span className="about-highlight"> Machine Learning</span> and <span className="about-highlight">Agentic AI </span>
            to architect smarter, adaptive systems for modern software.
          </p>
          <br />
          <p>
            When I’m not coding, you’ll find me <span className="about-highlight">kickboxing</span>, playing
            <span className="about-highlight"> basketball</span>, or discovering new
            <span className="about-highlight"> cafés</span> and <span className="about-highlight">bars</span> around Toronto.
          </p>
          <br />
        </div>
      </div>
    </section>
  );
}

export default About;
