// src/components/Timeline.jsx
import React, { useEffect, useRef } from "react";
import useIsMobile from "../hooks/screensize";

const timelineData = [
  // {
  //   year: "Jun 2025",
  //   title: "Launched Web portfolio",
  //   description:
  //     "Deployed my first React portfolio site to showcase my background, projects, and skills.",
  // },
  {
    year: "Sep 2022 - May 2026",
    title: "Bachelor's in Computer Science (Data Science)",
    place: "Ontario Tech University",
    description:
      "Pursuing degree in Computer Science specializing in Data Science from Ontario Tech University.",
  },
  {
    year: "Jul 2022 – Dec 2023",
    title: "Field Network Engineer (Technical Lead)",
    place: "Eureka Electrosoft",
    description:
      "Led a technical team to survey, plan, and test telecom sites. Developed troubleshooting methods and integrated new technologies and RF systems.",
  },
  {
    year: "Jan 2021 – Jun 2022",
    title: "Field Network Technician",
    place: "Genwave Technologies",
    description:
      "Diagnosed and resolved RF, fiber optics, and power issues. Configured RF systems. and Interpreted RF diagrams to guide construction teams",
  },
  {
    year: "	May 2018 – Jan 2021",
    title: "Web developer",
    place: "Sayal Electronics",
    description:
      "Created web dashboards, inventory management, and CRM systems maintained the main website and databases and generated data insights.",
  },
  {
    year: "May 2018",
    title: "Diploma in Software Engineering Technician",
    place: "Centennial College",
    description: 
      "Graduated from Centennial College with a diploma in Software Engineering ."
  },
  {
    year: "March 2017 – December 2017",
    title: "Database and IT Assistant (Internship)",
    place: "AdvantAge Ontario",
    description: 
      "Analyzed stakeholder data to deliver actionable insights, Configured systems and developed tools for media conversion."
  },
];

export default function Timeline() {
  // Ref to the container (whose ::before is the spine)
  const containerRef = useRef(null);
  // Refs array to each .timeline-item
  const itemsRef = useRef([]);
  // Keep track of last scrollY to determine scroll direction
  const lastScrollY = useRef(window.scrollY);
  // +1 = scrolling down, -1 = scrolling up (initially assume down)
  const scrollDir = useRef(1);
  const isMobile = useIsMobile()

  useEffect(() => {
    // 1) Listen to scroll events to update scrollDir.current
    const onScroll = () => {
      const currentY = window.scrollY;
      if (currentY > lastScrollY.current) {
        scrollDir.current = 1; // scrolling down
      } else if (currentY < lastScrollY.current) {
        scrollDir.current = -1; // scrolling up
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", onScroll);

    // 2) Observe the container and each item, toggling classes on enter/exit
    const containerEl = containerRef.current;
    const spineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // If user is scrolling down into it, animate from top→bottom
            // If scrolling up into it (from below), animate from bottom→top
            if (scrollDir.current > 0) {
              entry.target.classList.add("animate-down");
              entry.target.classList.remove("animate-up");
            } else {
              entry.target.classList.add("animate-up");
              entry.target.classList.remove("animate-down");
            }
          } else {
            // Once they leave viewport, reset both classes so next entry can re-trigger
            entry.target.classList.remove("animate-down", "animate-up");
          }
        });
      },
      { threshold: 0.1 }
    );
    if (containerEl) spineObserver.observe(containerEl);

    // 3) Observe each .timeline-item to toggle fade-in/fade-out
    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view");
          }
        });
      },
      { threshold: 0.1 }
    );
    itemsRef.current.forEach((el) => {
      if (el) itemObserver.observe(el);
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      spineObserver.disconnect();
      itemObserver.disconnect();
    };
  }, []);

  return (
    <section className="timeline" id="timeline">
      <h1 className="timeline-title">Over the years</h1>
      {/* <div className="timeline-container" ref={containerRef}> */}
      <div className={`timeline-container ${isMobile ? "mobile" : ""}`} ref={containerRef}>

        {timelineData.map((item, index) => {
          const side = isMobile ? "right" : (index % 2 === 0 ? "left" : "right");
          return (
            <div
              key={index}
              className={`timeline-item ${side}`}
              ref={(el) => (itemsRef.current[index] = el)}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <span className="timeline-year">{item.year}</span>
                <h3 className="timeline-event-title">{item.title}</h3>
                <span className="timeline-year">{item.place}</span>
                <p className="timeline-description">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
