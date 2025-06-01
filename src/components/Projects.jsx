import React, { useRef, useEffect, useState } from "react";

function Projects() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollLocked = useRef(false);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    const listEl = listRef.current;
    if (!sectionEl || !listEl) return;

    // Grab all the <li class="project-item"> inside the <ul>
    const items = Array.from(listEl.querySelectorAll(".project-item"));

    // 1) IntersectionObserver logic (fade in/out as before):
    const observerOptions = {
      root: null, 
      rootMargin: "100px",
      threshold: 0.5, // Trigger when 50% of the item is visible
    };
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (entry.isIntersecting) el.classList.add("visible");
        else el.classList.remove("visible");
      });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    items.forEach((item) => observer.observe(item));

    // 2) Wheel handler with “scroll up to previous section” if at index 0:
    const onWheel = (e) => {
      e.preventDefault(); // disable native scrolling inside this section

      if (scrollLocked.current) return;
      scrollLocked.current = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      let nextIndex = currentIndex + direction;

      if (direction < 0 && currentIndex === 0) {
        // We're on the first item and scrolling up: go to previous section.
        const prevSection = sectionEl.previousElementSibling;
        if (prevSection) {
          prevSection.scrollIntoView({ behavior: "smooth" });
        }
      } else if (direction > 0 && currentIndex === items.length - 1) {
        // (Optional) If you also wanted to scroll down to the next section
        // when on the last item, you could do:
        // const nextSection = sectionEl.nextElementSibling;
        // if (nextSection) nextSection.scrollIntoView({ behavior: "smooth" });
      } else {
        // Normal “within‐projects” navigation:
        if (nextIndex < 0) nextIndex = 0;
        if (nextIndex > items.length - 1) nextIndex = items.length - 1;

        if (nextIndex !== currentIndex) {
          setCurrentIndex(nextIndex);
          items[nextIndex].scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }

      // Unlock after the scroll animation (~700ms)
      setTimeout(() => {
        scrollLocked.current = false;
      }, 700);
    };

    sectionEl.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      items.forEach((item) => observer.unobserve(item));
      observer.disconnect();
      sectionEl.removeEventListener("wheel", onWheel);
    };
  }, [currentIndex]);

  return (
    <section className="projects-section" ref={sectionRef}>
      <h1 className="projects-title">Projects</h1>
      <ul className="projects-content" ref={listRef}>
        <li className="project-item">
          <p className="project-info">My React Weather App</p>
          <img
            className="project-image"
            src=""
            alt="My React Weather App"
          />
        </li>
        <li className="project-item">
          <p className="project-info">Todo List with Firebase</p>
          <img
            className="project-image"
            src=""
            alt="Todo List with Firebase"
          />
        </li>
        {/* …add more items as needed */}
      </ul>
    </section>
  );
}

export default Projects;
