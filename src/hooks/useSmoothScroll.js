import { useEffect } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";
import "lenis/dist/lenis.css";

// Smooth, weighted scrolling that settles gently onto a section when you stop near its start,
// plus a slow drift on elements marked [data-speed] (the section headings).
export default function useSmoothScroll() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({ lerp: 0.075, anchors: true, autoRaf: true });

    const snap = new Snap(lenis, { type: "proximity", distanceThreshold: "25%", duration: 1.2, debounce: 400 });
    snap.addElements([...document.querySelectorAll("[data-snap]")], { align: "start" });

    const drifting = [...document.querySelectorAll("[data-speed]")];
    const drift = () => {
      drifting.forEach((el) => {
        const box = el.getBoundingClientRect();
        const fromCenter = box.top + box.height / 2 - window.innerHeight / 2;
        el.style.transform = `translate3d(0, ${(fromCenter * Number(el.dataset.speed)).toFixed(1)}px, 0)`;
      });
    };
    if (!reduceMotion) {
      lenis.on("scroll", drift);
      drift();
    }

    return () => {
      snap.destroy();
      lenis.destroy();
    };
  }, []);
}
