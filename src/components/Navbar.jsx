import React, { useState, useEffect } from "react";
import { House, UserCircle, CalendarBlank, Wrench, EnvelopeSimple } from 'phosphor-react';

function Navbar() {
  const [active, setActive] = useState(false);
  const [isBeyondIntro, setIsBeyondIntro] = useState(false); // scroll-based section check

  // Scroll observer
  useEffect(() => {
    const sections = [
      document.getElementById("hero"),
      document.getElementById("about"),
      document.getElementById("timeline"),
      document.getElementById("projects"),
      document.getElementById("contact"),
    ].filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const topSection = visible[0].target.id;
          const isIntro = topSection === "hero" ;
          setIsBeyondIntro(!isIntro);
        }
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mouse position listener
  useEffect(() => {
    const handleMouseMove = (e) => {
      const fromRight = window.innerWidth - e.clientX;
      const triggerDistance = isBeyondIntro ? 100 : 200;
      setActive(fromRight < triggerDistance);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isBeyondIntro]);

  return (
<nav className={`nav-overlay ${isBeyondIntro ? "nav-alt" : ""}`}>
  {/* Label — text in intro, icon in deeper sections */}
  <div
    className={`nav-label ${active ? "fade-out" : "fade-in"} ${isBeyondIntro ? "menu-alt" : ""}`}
  >
    {isBeyondIntro ? "☰" : "Menu"}
  </div>

  {/* Nav items — text or icons based on section */}
  <ul className={`nav-links-minimal ${active ? "fade-in" : "fade-out"} ${isBeyondIntro ? "items-alt" : ""}`}>
    {isBeyondIntro ? (
      <>
        <li>
          <a href="#hero">
            <House size={30} />
          </a>
        </li>
        <li>
          <a href="#about">
            <UserCircle size={30} />
          </a>
        </li>
        <li>
          <a href="#timeline">
            <CalendarBlank size={30} />
          </a>
        </li>
        {/* <li>
          <a href="#projects">
            <Wrench size={30} />
          </a>
        </li> */}
        <li>
          <a href="#contact">
            <EnvelopeSimple size={30} />
          </a>
        </li>
      </>
    ) : (
      <>
        <li><a href="#hero">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#timeline">Timeline</a></li>
        {/* <li><a href="#projects">Projects</a></li> */}
        <li><a href="#contact">Contact</a></li>
      </>
    )}
  </ul>
</nav>
  );
}

export default Navbar;
