import React, { useState, useEffect } from "react";
import Clock from "./time";

function Hero() {
  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const fadeStart = 50; // when scrollY = 60, opacity = 1
      const fadeEnd = 50; // when scrollY >= 350, opacity = 0
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
      {/* Background layer: full‐width/height, absolutely positioned, controlled by bgOpacity */}
      <div
        className="hero-background"
        style={{
          backgroundColor: `rgba(32, 32, 32, ${bgOpacity})`,
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
