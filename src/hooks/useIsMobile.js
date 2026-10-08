import { useState, useEffect } from "react";

// True while the viewport is at or below `breakpoint` px (matches the CSS media queries).
export default function useIsMobile(breakpoint = 500) {
  const query = `(max-width: ${breakpoint}px)`;
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const onChange = () => setIsMobile(media.matches);
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}
