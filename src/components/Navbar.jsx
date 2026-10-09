import { useState, useEffect, useRef } from "react";
import { useSwipeable } from "react-swipeable";
import useIsMobile from "../hooks/useIsMobile";
import "../styles/Navbar.css";

const NAV_ITEMS = [
  { id: "hero", text: "Home" },
  { id: "about", text: "About" },
  { id: "projects", text: "Projects" },
  { id: "timeline", text: "Timeline" },
  { id: "contact", text: "Contact" },
];

// Desktop: distance (px) from the right edge of the window that opens the menu on hover.
const SMALL_HOVER_RANGE = 90;
const LARGE_HOVER_RANGE = 220;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [beyondHero, setBeyondHero] = useState(false); // scrolled past the hero → compact menu
  const navRef = useRef(null);
  const isMobile = useIsMobile();

  // Switch to the compact trigger once most of the hero has scrolled out of view.
  useEffect(() => {
    const hero = document.getElementById("hero");
    const threshold = isMobile ? 0.3 : 0.8;
    const observer = new IntersectionObserver(
      ([entry]) => setBeyondHero(entry.intersectionRatio < threshold),
      { threshold }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [isMobile]);

  // Mobile: swipe left on the right half of the screen to open, swipe right to close.
  // Listening on the whole document (rather than an overlay) keeps the page underneath tappable.
  const { ref: swipeRef } = useSwipeable({
    onSwipedLeft: ({ initial: [startX] }) => startX > window.innerWidth / 2 && setOpen(true),
    onSwipedRight: () => setOpen(false),
    delta: 20,
    trackTouch: isMobile,
  });
  useEffect(() => swipeRef(document), [swipeRef]);

  // Clicking anywhere outside the menu closes it.
  useEffect(() => {
    const handleClick = (e) => {
      if (!navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Desktop: open when the mouse nears the right edge. In compact mode the zone starts small
  // and widens while open, so the menu doesn't close as soon as you move toward it.
  useEffect(() => {
    if (isMobile) return;
    const handleMouseMove = (e) => {
      const fromRight = window.innerWidth - e.clientX;
      setOpen((isOpen) => fromRight < (!beyondHero || isOpen ? LARGE_HOVER_RANGE : SMALL_HOVER_RANGE));
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, beyondHero]);

  // Desktop: the menu drifts a little toward the pointer's height and settles slowly,
  // so it feels like it floats rather than being pinned in place.
  useEffect(() => {
    if (isMobile || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nav = navRef.current;
    let target = 0;
    let current = 0;
    let frame = null;

    const step = () => {
      current += (target - current) * 0.05;
      nav.style.setProperty("--drift", `${current.toFixed(2)}px`);
      frame = Math.abs(target - current) > 0.1 ? requestAnimationFrame(step) : null;
    };
    const handleMouseMove = (e) => {
      target = (e.clientY - window.innerHeight / 2) * 0.12;
      frame ??= requestAnimationFrame(step);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
      nav.style.removeProperty("--drift");
    };
  }, [isMobile]);

  return (
    <nav ref={navRef} className={`menu ${open ? "open" : ""}`} aria-label="Main">
      <button
        className="menu-trigger"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-controls="menu-list"
        aria-label="Menu"
      >
        {beyondHero ? <span className="menu-lines" /> : "Menu"}
      </button>
      <ol id="menu-list" className="menu-list">
        {NAV_ITEMS.map(({ id, text }, index) => (
          <li key={id} style={{ "--i": index }}>
            <a href={`#${id}`} onClick={() => setOpen(false)}>
              <span className="menu-index">{String(index + 1).padStart(2, "0")}</span>
              {text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
