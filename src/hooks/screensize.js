import { useState, useEffect } from "react";

export default function useIsMobile(breakpoint = 500) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", checkMobile);
    
    // cleanup on unmount
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]);

  return isMobile;
}
