import { useState } from "react";
import projects from "../data/projects.json";
import useIsMobile from "../hooks/useIsMobile";
import "../styles/Projects.css";

function ProjectDetails({ project }) {
  return (
    <>
      <p className="project-info-description">{project.description}</p>
      <div className="project-tech">
        {project.techStack.split(",").map((tech) => (
          <span key={tech} className="project-tech-badge">{tech.trim()}</span>
        ))}
      </div>
      <div className="project-links">
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link-text">
            GitHub
          </a>
        )}
        {project.live && (
          <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-link-text">
            Live Demo
          </a>
        )}
      </div>
    </>
  );
}

// Desktop: list on the left, details on the right. Mobile: list only, details open in a popup.
export default function Projects() {
  const [selected, setSelected] = useState(null);
  const isMobile = useIsMobile();
  const close = () => setSelected(null);

  const list = (
    <ul className="projects-list">
      {projects.map((project) => (
        <li
          key={project.title}
          className={`project-item ${selected === project ? "active" : ""}`}
          onClick={() => setSelected(project)}
        >
          {project.title}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="projects" id="projects">
      <div className="projects-content">
        <h2 className="projects-title">Projects</h2>

        {isMobile ? (
          <div className="projects-container">
            {list}
            {selected && (
              <div className="project-popup" onClick={close}>
                <div
                  key={selected.title}
                  className="project-popup-content fadein"
                  onClick={(e) => e.stopPropagation()} // clicks inside the card shouldn't close it
                >
                  <h3 className="project-info-title">{selected.title}</h3>
                  <ProjectDetails project={selected} />
                  <button className="popup-close" onClick={close} aria-label="Close">✕</button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="projects-container">
            <div className="projects-list-container">{list}</div>
            <div className="projects-info">
              {selected && (
                <div key={selected.title} className="fadein">
                  <ProjectDetails project={selected} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
