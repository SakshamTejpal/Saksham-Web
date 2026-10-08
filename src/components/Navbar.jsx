import { useState, useEffect, useRef } from "react";
import {
  PiHouseSimpleLight,
  PiUserLight,
  PiFolderSimpleLight,
  PiCalendarBlankLight,
  PiEnvelopeSimpleLight,
} from "react-icons/pi";
import { useSwipeable } from "react-swipeable";
import useIsMobile from "../hooks/useIsMobile";
import "../styles/Navbar.css";

const NAV_ITEMS = [
  { id: "hero", text: "Home", Icon: PiHouseSimpleLight },
  { id: "about", text: "About", Icon: PiUserLight },
  { id: "projects", text: "Projects", Icon: PiFolderSimpleLight },
  { id: "timeline", text: "Timeline", Icon: PiCalendarBlankLight },
  { id: "contact", text: "Contact", Icon: PiEnvelopeSimpleLight },
];

// Desktop: distance (px) from the right edge of the window that opens the menu on hover.
const SMALL_HOVER_RANGE = 90;
const LARGE_HOVER_RANGE = 200;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [beyondHero, setBeyondHero] = useState(false); // scrolled past the hero → compact menu
  const navRef = useRef(null);
  const isMobile = useIsMobile();

  // Switch to the compact menu once most of the hero has scrolled out of view.
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

  // Mobile: tapping outside the menu closes it.
  useEffect(() => {
    if (!isMobile) return;
    const handleClick = (e) => {
      if (!navRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isMobile]);

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

  let triggerLabel;
  if (isMobile) triggerLabel = beyondHero ? "⋮" : <span className="swipe-arrow">‹‹‹</span>;
  else triggerLabel = beyondHero ? "☰" : "Menu";

  return (
    <nav ref={navRef} className={`navbar ${isMobile ? "mobile" : "desktop"} ${beyondHero ? "compact" : ""}`}>
      <div className={`nav-trigger ${open ? "fade-out" : "fade-in"}`}>{triggerLabel}</div>
      <ul className={`nav-list ${open ? "fade-in" : "fade-out"}`}>
        {NAV_ITEMS.map(({ id, text, Icon }) => (
          <li key={id} className="nav-item">
            <a href={`#${id}`} aria-label={text}>
              {isMobile ? <Icon size={30} /> : text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
