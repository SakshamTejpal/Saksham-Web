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

// On the first screen the menu is a large list. Past it, the items fold into a double-dash icon
// that opens them again on click. Phones always use the icon.
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [beyondHero, setBeyondHero] = useState(false);
  const navRef = useRef(null);
  const isMobile = useIsMobile();
  const collapsed = isMobile || beyondHero;

  // Fold the menu once less than 60% of the first screen is visible.
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setBeyondHero(entry.intersectionRatio < 0.6);
        setOpen(false);
      },
      { threshold: 0.6 }
    );
    observer.observe(document.getElementById("hero"));
    return () => observer.disconnect();
  }, []);

  // Phones: swipe left on the right half of the screen to open, swipe right to close.
  // Listening on the whole document (rather than an overlay) keeps the page underneath tappable.
  const { ref: swipeRef } = useSwipeable({
    onSwipedLeft: ({ initial: [startX] }) => startX > window.innerWidth / 2 && setOpen(true),
    onSwipedRight: () => setOpen(false),
    delta: 20,
    trackTouch: isMobile,
  });
  useEffect(() => swipeRef(document), [swipeRef]);

  // Clicking outside the menu or pressing Escape closes it.
  useEffect(() => {
    const handleClick = (e) => {
      if (!navRef.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className={`menu ${collapsed ? "collapsed" : ""} ${open ? "open" : ""}`}
      aria-label="Main"
    >
      <button
        className="menu-toggle"
        onClick={() => setOpen((isOpen) => !isOpen)}
        aria-expanded={open}
        aria-controls="menu-list"
        aria-label={open ? "Close menu" : "Open menu"}
        tabIndex={collapsed ? 0 : -1}
      >
        <span className="menu-lines" />
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
