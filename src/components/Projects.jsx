<<<<<<< Updated upstream
import React, { useRef, useLayoutEffect, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "../styles/Projects.css";
import projects from "../data/projects.json";

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const sectionRef   = useRef(null);
  const containerRef = useRef(null);
  const [modalProject, setModalProject] = useState(null);

  // Lock background scroll when modal is open
  useEffect(() => {
    const lock = modalProject !== null;
    document.body.classList.toggle("modal-open", lock);
    document.body.style.overflow            = lock ? "hidden" : "";
    document.documentElement.style.overflow = lock ? "hidden" : "";
    return () => {
      document.body.classList.remove("modal-open");
      document.body.style.overflow            = "";
      document.documentElement.style.overflow = "";
    };
  }, [modalProject]);

  // Refs for sequencing the fade-in/out
  const modalRef   = useRef(null);
  const bgRef      = useRef(null);
  const contentRef = useRef(null);

  // Open animation: fade in backdrop, then content
  useEffect(() => {
    if (!modalProject) return;

    // start both hidden
    gsap.set([bgRef.current, contentRef.current], { autoAlpha: 0, y: 30 });

    const tl = gsap.timeline();
    tl
      .to(bgRef.current, {
        autoAlpha: 1,
        duration: 0.3,
      })
      .to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        duration: 0.4,
        ease: "power2.out",
      });

    return () => tl.kill();
  }, [modalProject]);

  // Close animation: fade out content, then backdrop, then unmount
  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => setModalProject(null),
    });
    tl
      .to(contentRef.current, {
        autoAlpha: 0,
        y: 30,
        duration: 0.3,
        ease: "power2.in",
      })
      .to(bgRef.current, {
        autoAlpha: 0,
        duration: 0.2,
      });
  };

  // Horizontal scroll + pin
  useLayoutEffect(() => {
    const container = containerRef.current;
    const section   = sectionRef.current;
    if (!container || !section) return;

    gsap.to(container, {
      x: () => -(container.scrollWidth - section.getBoundingClientRect().width),
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top+=10 top",
        end: () =>
          "+=" +
          (container.scrollWidth -
            section.getBoundingClientRect().width +
            parseInt(getComputedStyle(container).paddingLeft)),
        pin: true,
        scrub: 0,
        anticipatePin: 1,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section className="projects" ref={sectionRef} id="projects">
      <div className="projects-content">
        <h2 className="projects-title">Projects</h2>
        <div className="projects-container" ref={containerRef}>
          <div style={{ width: "60px", height: "100%" }} />
          {projects.map((project, idx) => (
            <div
              className="project-card"
              key={idx}
              tabIndex={0}
              onClick={() => setModalProject(project)}
              onKeyDown={(e) =>
                (e.key === "Enter" || e.key === " ") && setModalProject(project)
              }
            >
              <img
                className="project-img"
                src={`assets/Projects/${project.title}.jpg`}
                alt={project.title}
              />
              <div className="project-head">{project.title}</div>
            </div>
          ))}
          <div style={{ minWidth: "60px", height: "100%" }} />
        </div>

        {modalProject && (
          <div
            className="project-modal"
            ref={modalRef}
            onClick={handleClose}
            style={{ pointerEvents: "auto" }}
          >
<div className="project-modal-bg" ref={bgRef}></div>

            <button
              className="modal-close"
              onClick={e => {
                e.stopPropagation();
                handleClose();
              }}
            >
              &times;
            </button>

            <div
              className="project-modal-content"
              ref={contentRef}
              onClick={e => e.stopPropagation()}
            >
              <div className="modal-titlebar">
                <h4 className="modal-head">{modalProject.title}</h4>
              </div>

              <div className="modal-body">
                <img
                  className="modal-img"
                  src={`assets/Projects/${modalProject.title}.jpg`}
                  alt={modalProject.title}
                />
                <div className="modal-details">
                  <div className="modal-info">
                    {modalProject.description}
                  </div>
                  <div className="modal-stack">
                    {modalProject.techStack.split(",").map((tech, idx) => (
                      <span className="tech-badge" key={idx}>
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

=======
import React, { useState } from "react";
import "../styles/Projects.css";
import projects from "../data/projects.json";
import useIsMobile from "../hooks/screensize";

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section className="projects" id="projects">
        <div className="projects-content">
          <h2 className="projects-title">Projects</h2>

          <div className="projects-container">
            <ul className="projects-list">
              {projects.map((proj, index) => (
                <li
                  key={index}
                  className={`project-item ${
                    selectedProject?.title === proj.title ? "active" : ""
                  }`}
                  onClick={() => setSelectedProject(proj)}
                >
                  {proj.title}
                </li>
              ))}
            </ul>

            {selectedProject && (
              <div className="project-popup" onClick={() => setSelectedProject(null)}>
                <div
                  className="project-popup-content fadein"
                  onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
                  key={selectedProject.title}
                >
                  <h3 className="project-info-title">{selectedProject.title}</h3>

                  <p className="project-info-description">
                    {selectedProject.description}
                  </p>

                  <div className="project-tech">
                    {selectedProject.techStack.split(",").map((t, i) => (
                      <span key={i} className="project-tech-badge">
                        {t.trim()}
                      </span>
                    ))}
                  </div>
                  <div className="project-links">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-text"
                      >
                        GitHub
                      </a>
                    )}
                    {selectedProject.live && selectedProject.live !== "" && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-text"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>

                  <button className="popup-close" onClick={() => setSelectedProject(null)}>
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className="projects" id="projects">
        <div className="projects-content">
          <h2 className="projects-title">Projects</h2>

          <div className="projects-container">
            <div className="projects-list-container">
              <ul className="projects-list">
                {projects.map((proj, index) => (
                  <li
                    key={index}
                    className={`project-item ${
                      selectedProject?.title === proj.title ? "active" : ""
                    }`}
                    onClick={() => setSelectedProject(proj)}
                  >
                    {proj.title}
                  </li>
                ))}
              </ul>
            </div>

            <div className="projects-info">
              {selectedProject && (
                <div key={selectedProject.title} className="fadein">
                  <p className="project-info-description">
                    {selectedProject.description}
                  </p>

                  <div className="project-tech">
                    {selectedProject.techStack.split(",").map((t, i) => (
                      <span key={i} className="project-tech-badge">
                        {t.trim()}
                      </span>
                    ))}
                  </div>

                  <div className="project-links">
                    {selectedProject.github && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-text"
                      >
                        GitHub
                      </a>
                    )}
                    {selectedProject.live && selectedProject.live !== "" && (
                      <a
                        href={selectedProject.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-text"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              )}
              {!selectedProject && (
                <div className="projects-placeholder"></div>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
>>>>>>> Stashed changes
