import React, { useState, useEffect } from "react";
import Clock from "./TimeLocation";
import "../styles/Hero.css"; // Ensure you have the correct path to your CSS file

function Hero() {
  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const fadeStart = 45; // when scrollY = 60, opacity = 1
      const fadeEnd = 500; // when scrollY >= 500, opacity = 0
      const y = window.scrollY;
      let newOpacity = 1;

      if (y <= fadeStart) {
        newOpacity = 1;
      } else if (y >= fadeEnd) {
        newOpacity = 0;
      } else {
        newOpacity = 1 - (y - fadeStart) / (fadeEnd - fadeStart);
      }
      setBgOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="hero" id="hero">
      <div
        className="hero-background"
        style={{
          backgroundColor: `rgba(30, 30, 30, ${bgOpacity})`,
        }}
      ></div>

      {/* Foreground content: position relative so it sits on top and is never transparent */}
      <div className="hero-content">
        <div className="hero-clock">
          <Clock />
        </div>
        <div className="hero-wrapper">
          <h1 className="hero-title">{""}Hello{"!"} <br /> I am <br /> Saksham</h1>
        </div>
      </div>
    </section>
  )
}

export default Hero;
