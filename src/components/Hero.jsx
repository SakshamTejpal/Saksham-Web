import React, { useState, useEffect } from "react";
import Clock from "./time";

function Hero() {
  const [scrollY, setScrollY] = useState(0);
  const triggerPoint = 100; // change to taste

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.pageYOffset);
      console.log("ScrollY:", window.pageYOffset); // Debug: check if handler fires
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // initialize if user is already scrolled
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle “on” once scrollY passes the trigger
  const titleClass = scrollY > triggerPoint ? "hero-title on" : "hero-title ";

  return (
    <section className="splits">
      <div className="hero">
        <div className="hero-clock">
            <Clock />
        </div>
        <div className="hero-wrapper">
          <h1 className={titleClass}>Saksham Tejpal</h1>
        </div>
      </div>
    </section>
  );
}

export default Hero;
