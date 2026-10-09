import { useEffect, useRef } from "react";

// Reveals every [data-reveal] element inside the returned ref the first time it scrolls into view.
// Elements that arrive together are staggered so a list reads like a sentence.
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries
          .filter((entry) => entry.isIntersecting)
          .forEach((entry, order) => {
            entry.target.style.transitionDelay = `${order * 90}ms`;
            entry.target.dataset.revealed = ""; // an attribute, so React re-renders never remove it
            observer.unobserve(entry.target);
          });
      },
      { threshold: 0.15 }
    );
    ref.current.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}
