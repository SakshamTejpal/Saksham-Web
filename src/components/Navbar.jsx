import React, { useState, useEffect, useRef } from "react";
import {
  PiHouseSimpleLight,
  PiUserLight,
  PiCalendarBlankLight,
  PiEnvelopeSimpleLight,
} from "react-icons/pi";
import { useSwipeable } from "react-swipeable";
import useIsMobile from "../hooks/screensize";
import "../styles/Navbar.css";

function Navbar() {
  const [active, setActive] = useState(false);
  const [beyondHero, setBeyondHero] = useState(false);
  const navRef = useRef(null);
  const isMobile = useIsMobile();
  const smallHoverRange = 90;
  const largeHoverRange = 200;
  const [hoverWidth, setHoverWidth] = useState(smallHoverRange); // for compact hover zone

  // Track section intersection
  useEffect(() => {
    const heroSection = document.getElementById("hero");
    if (!heroSection) return;

    let lastScrollY = window.scrollY;
    let scrollDirection = "down";

    const onScroll = () => {
      const currentY = window.scrollY;
      scrollDirection = currentY > lastScrollY ? "down" : "up";
      lastScrollY = currentY;
    };

    window.addEventListener("scroll", onScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        const ratio = entry.intersectionRatio;

        const threshold = 0.8; // Adjust this as your X/Y value (80% visible)

        if (scrollDirection === "down" && ratio < threshold) {
          setBeyondHero(true);
        } else if (scrollDirection === "up" && ratio > threshold) {
          setBeyondHero(false);
        }
      },
      {
        threshold: Array.from({ length: 101 }, (_, i) => i / 100) // 0 → 1 in 1% steps
      }
    );

    observer.observe(heroSection);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, []);

  // Swipe gesture for mobile
  const handlers = useSwipeable({
    onSwipedLeft: () => setActive(true),
    onSwipedRight: () => setActive(false),
    delta: 20,
    preventDefaultTouchmoveEvent: true,
    trackTouch: true,
  });

  // Close on outside click (mobile)
  useEffect(() => {
    if (!isMobile) return;
    const handleClick = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setActive(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isMobile]);

  // Desktop hover trigger
useEffect(() => {
  if (isMobile) return;

  const handleMouseMove = (e) => {
    const fromRight = window.innerWidth - e.clientX;

    if (!beyondHero) {
      setActive(fromRight < largeHoverRange);
    } else {
      // Compact mode → Dynamic hover zone
      if (!active && fromRight < hoverWidth) {
        setActive(true);
        setHoverWidth(largeHoverRange);
      } else if (active && fromRight >= largeHoverRange) {
        setActive(false);
        setHoverWidth(smallHoverRange);
      }
    }
  };

  window.addEventListener("mousemove", handleMouseMove);
  return () => window.removeEventListener("mousemove", handleMouseMove);
}, [active, isMobile, hoverWidth, beyondHero]);

  const triggerLabel = () => {
    if (isMobile) {
      return beyondHero ? "⋮" : <span className="swipe-arrow">‹‹‹</span>;
    }
    return beyondHero ? "☰" : "Menu";
  };

  const navItems = [
    { id: "hero", text: "Home", icon: <PiHouseSimpleLight size={30} /> },
    { id: "about", text: "About", icon: <PiUserLight size={30} /> },
    { id: "timeline", text: "Timeline", icon: <PiCalendarBlankLight size={30} /> },
    { id: "contact", text: "Contact", icon: <PiEnvelopeSimpleLight size={30} /> },
  ];

  return (
    <div className="swipe-area" {...(isMobile ? handlers : {})}>
      <nav
        ref={navRef}
        className={`navbar ${!isMobile ? (beyondHero ? "compact" : "") : ""}`}
      >
        <div
          className={`nav-trigger ${active ? "fade-out" : "fade-in"} ${
            beyondHero ? "trigger-compact" : ""
          }`}
          style={{ cursor: isMobile ? "pointer" : "default" }}
        >
          {triggerLabel()}
        </div>

        <ul
          className={`nav-list ${active ? "fade-in" : "fade-out"} ${
            !isMobile ? (beyondHero ? "beyond" : "") : "icon-mode"
          }`}
        >
          {navItems.map((item) => (
            <li key={item.id} className="nav-item">
              <a href={`#${item.id}`}>
                {isMobile ? item.icon : item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
