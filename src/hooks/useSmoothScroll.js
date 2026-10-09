import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

// How close (as a share of the screen height) a section's start must be for the page to settle onto it.
const SNAP_RANGE = 0.3;

// Smooth, weighted scrolling; a gentle settle onto a section's start when you stop just short of it;
// and a slow drift on elements marked [data-speed] (the section headings).
export default function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: 0.075, anchors: true, autoRaf: true });

    // Settle only in the direction you were already scrolling, so the page never pulls you back.
    const sections = [...document.querySelectorAll("[data-snap]")];
    let settleTimer;
    const settle = () => {
      const range = window.innerHeight * SNAP_RANGE;
      const target = sections.find((section) => {
        const top = section.getBoundingClientRect().top;
        return lenis.direction > 0 ? top > 1 && top < range : top < -1 && top > -range;
      });
      if (target) lenis.scrollTo(target, { duration: 1.2 });
    };

    const drifting = [...document.querySelectorAll("[data-speed]")];
    const drift = () => {
      drifting.forEach((el) => {
        const box = el.getBoundingClientRect();
        const fromCenter = box.top + box.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(fromCenter * Number(el.dataset.speed)).toFixed(1)}px, 0)`;
      });
    };

    lenis.on("scroll", () => {
      clearTimeout(settleTimer);
      settleTimer = setTimeout(settle, 200); // runs once scrolling has come to rest
      if (!reduceMotion) drift();
    });
    if (!reduceMotion) drift();

    return () => {
      clearTimeout(settleTimer);
      lenis.destroy();
    };
  }, []);
}
