import React, { useState, useEffect, useRef } from "react";
import { PiHouseSimpleLight, PiUserLight, PiCalendarBlankLight, PiDesktopLight, PiEnvelopeSimpleLight } from "react-icons/pi";
import { useSwipeable } from "react-swipeable";
import useIsMobile from "../hooks/screensize.js";
import "../styles/Navbar.css"; 


function Navbar() {
  const [active, setActive] = useState(false);
  const [isBeyondIntro, setIsBeyondIntro] = useState(false);
  const navRef = useRef(null);
  const isMobile = useIsMobile()

  // Swipeable handlers (only active on mobile)
  const handlers = useSwipeable({
    onSwipedLeft: () => setActive(true),
    onSwipedRight: () => setActive(false),
    delta: 20,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
    trackMouse: false
  });

  // Click outside to close (mobile only)
  useEffect(() => {
    if (!isMobile) return;
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMobile]);

  // Scroll observer (always active)
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
        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible.length > 0) {
          const topSection = visible[0].target.id;
          const isIntro = topSection === "hero";
          setIsBeyondIntro(!isIntro);
        }
      },
      { threshold: 0.2 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  // Mouse hover trigger (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      const fromRight = window.innerWidth - e.clientX;
      const triggerDistance = isBeyondIntro ? 100 : 200;
      setActive(fromRight < triggerDistance);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isBeyondIntro, isMobile]);

  const handleMobileToggle = () => {
    if (isMobile) setActive(!active);
  };

  const showIcons = isMobile || isBeyondIntro;

  return (
    <div {...(isMobile ? handlers : {})} className="swipe-area">
      <nav ref={navRef} className={`nav-overlay ${showIcons ? "nav-alt" : ""}`}>
        <div
          className={`nav-label ${active ? "fade-out" : "fade-in"} ${showIcons ? "menu-alt" : ""}`}
          // onClick={handleMobileToggle}
          style={{ cursor: isMobile ? 'pointer' : 'default' }}
        >
          {(isMobile && !isBeyondIntro) ? (
            <>
              <span className="swipe-arrow">««« </span>
              {/* <span className="swipe-arrow">&lt;&lt;&lt; </span> ⋮ */}
            </>
          ) : (
            isMobile ? "⋮" : (isBeyondIntro ? "☰" : "Menu")
          )}
        </div>

        <ul className={`nav-ul-container ${active ? "fade-in" : "fade-out"} ${showIcons ? "items-alt" : ""}`}>
          <li><a href="#hero">{showIcons ? <PiHouseSimpleLight size={30} /> : "Home"}</a></li>
          <li><a href="#about">{showIcons ? <PiUserLight size={30} /> : "About"}</a></li>
          <li><a href="#timeline">{showIcons ? <PiCalendarBlankLight size={30} /> : "Timeline"}</a></li>
          {/* <li><a href="#projects">{showIcons ? <Wrench size={30} /> : "Projects"}</a></li> */}
          <li><a href="#contact">{showIcons ? <PiEnvelopeSimpleLight size={30} /> : "Contact"}</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
