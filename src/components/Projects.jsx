import { useState } from "react";
import projects from "../data/projects.json";
import "../styles/Projects.css";

export default function Projects() {
  const [openTitle, setOpenTitle] = useState(null);

  return (
    <section className="section" id="projects">
      <h2 className="section-title" data-reveal>Projects</h2>
      <ol className="work">
        {projects.map((project, index) => {
          const isOpen = openTitle === project.title;
          const tech = project.techStack.split(",").map((t) => t.trim());
          return (
            <li key={project.title} className={`work-item ${isOpen ? "open" : ""}`} data-reveal>
              <button
                className="work-row"
                onClick={() => setOpenTitle(isOpen ? null : project.title)}
                aria-expanded={isOpen}
              >
                <span className="work-index label">{String(index + 1).padStart(2, "0")}</span>
                <span className="work-title">{project.title}</span>
                <span className="work-tags label">{tech.slice(0, 2).join(" · ")}</span>
                <span className="work-arrow" aria-hidden="true">→</span>
              </button>

              {/* Animates open by growing its grid row from 0fr to 1fr. */}
              <div className="work-detail" aria-hidden={!isOpen}>
                <div className="work-detail-inner">
                  <p className="work-description">{project.description}</p>
                  <p className="work-stack label">{tech.join(" · ")}</p>
                  {(project.github || project.live) && (
                    <div className="work-links">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" tabIndex={isOpen ? 0 : -1}>
                          GitHub ↗
                        </a>
                      )}
                      {project.live && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" tabIndex={isOpen ? 0 : -1}>
                          Live ↗
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
