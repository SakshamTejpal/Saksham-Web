import { useRef, useState, useEffect } from "react";
import profilePic from "../assets/IMG_4087-1.JPEG";

function About() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "10px",
      threshold: 0.5, // when 65% of the section is visible
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        // entry.isIntersecting === true when the section enters viewport
        setIsVisible(entry.isIntersecting);
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <section>
      <div ref={containerRef} className="about-content">
        <img
          src={profilePic}
          alt="Saksham Tejpal"
          className={`profile-image ${isVisible ? "visible" : ""}`}
        />
        <div className={`about-text ${isVisible ? "visible" : ""}`}>
          <p>
            I’m Saksham Tejpal, a web developer currently learning React. I enjoy
            creating clean, minimal dark‐themed portfolios that showcase my
            projects and skills. Feel free to explore and reach out!
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
