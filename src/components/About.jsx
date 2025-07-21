import { useRef, useState, useEffect } from "react";
import profilePic from "../assets/profile.JPEG";
import "../styles/About.css";
import useIsMobile from "../hooks/screensize";

function About() {
  const aboutRef = useRef(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const section = aboutRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            section.classList.add("about-in-view");
            section.classList.remove("about-out-view");
          } else {
            section.classList.remove("about-in-view");
            section.classList.add("about-out-view");
          }
        });
      },
      { threshold: isMobile ? 0.2 : 0.3 }
    );

    if (section) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="about about-out-view" id="about" ref={aboutRef}>
      <div className="about-content">
        <img
          src={profilePic}
          alt="Saksham Tejpal"
          className="profile-image"
        />
          <article className="about-text">
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
        </article>
        </div>
    </section>
  );
}

export default About;
