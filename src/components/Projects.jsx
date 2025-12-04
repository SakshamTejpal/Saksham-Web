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
