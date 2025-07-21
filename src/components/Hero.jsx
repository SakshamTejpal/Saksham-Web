import React, { useState, useEffect } from "react";
import Clock from "./support/TimeLocation";
import "../styles/Hero.css"; 
import useIsMobile from "../hooks/screensize.js";
import HeroBg from "./support/HeroBG";


function Hero() {
  const [bgOpacity, setBgOpacity] = useState(1);
  const isMobile = useIsMobile()

  useEffect(() => {
    const handleScroll = () => {
      const Start = 45; // when scrollY = 60, opacity = 1
      const End = 500; // when scrollY >= 500, opacity = 0
      const y = window.scrollY;
      let newOpacity = 1;

      if (y <= Start) {
        newOpacity = 1;
      } else if (y >= End) {
        newOpacity = 0;
      } else {
        newOpacity = 1 - (y - Start) / (End - Start);
      }
      setBgOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="hero" >
      {/* your new background component */}

      {/* Foreground content: position relative so it sits on top and is never transparent */}
        <div className="hero-clock">
          <Clock />
        </div>
        <div className="hero-content">
          {isMobile ? (
            <>
              <h1 className="hero-title-comb">Hello! <br /> I am <br />Saksham Tejpal</h1>
            </>
          ) : (
            <>
              <h3 className="hero-subtitle">Hello, I am</h3>
              <h1 className="hero-title" id="hero-title">Saksham Tejpal</h1>
            </>
          )}
        </div>
    </section>
  )
}

export default Hero;
