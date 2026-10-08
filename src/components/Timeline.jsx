import { useEffect, useRef } from "react";
import timeline from "../data/timeline.json";
import "../styles/Timeline.css";

export default function Timeline() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    // Grow the center line when the timeline enters view: top→bottom when scrolling down into it,
    // bottom→top when scrolling up into it (i.e. its top is already above the viewport).
    const lineObserver = new IntersectionObserver(
      ([entry]) => {
        const enteringFromBelow = entry.boundingClientRect.top < 0;
        container.classList.toggle("animate-down", entry.isIntersecting && !enteringFromBelow);
        container.classList.toggle("animate-up", entry.isIntersecting && enteringFromBelow);
      },
      { threshold: 0.1 }
    );
    lineObserver.observe(container);

    // Fade each entry in/out as it enters/leaves the viewport.
    const itemObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("in-view", entry.isIntersecting)),
      { threshold: 0.1 }
    );
    container.querySelectorAll(".timeline-item").forEach((item) => itemObserver.observe(item));

    return () => {
      lineObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  return (
    <section className="timeline" id="timeline">
      <div className="timeline-content">
        <h2 className="timeline-title">Over the years</h2>
        <div className="timeline-container" ref={containerRef}>
          {timeline.map((item, index) => (
            <div key={item.title} className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}>
              <div className="timeline-dot" />
              <div className="timeline-content-box">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-event-title">{item.title}</h3>
                <span className="timeline-year">{item.place}</span>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
