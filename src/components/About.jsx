import profilePic from "../assets/profile.jpg";
import "../styles/About.css";

const Highlight = ({ children }) => <span className="about-highlight">{children}</span>;

export default function About() {
  return (
    <section className="section about" id="about">
      <div data-reveal>
        <img src={profilePic} alt="Saksham Tejpal" className="about-photo" />
      </div>
      <article className="about-text" data-reveal>
        <p>
          I’m a <Highlight>Software Developer</Highlight> passionate about solving logical problems and
          creating unique solutions. I’m currently pursuing <Highlight>Bachelor's of Computer Science</Highlight>{" "}
          specializing in <Highlight>Data Science</Highlight> at Ontario Tech University, and will graduate in
          May 2026.
        </p>
        <p>
          I love diving into <Highlight>back-end development</Highlight>, <Highlight>data science</Highlight>,{" "}
          <Highlight>data structures</Highlight>, and <Highlight>algorithms</Highlight>, where I can transform
          abstract problems into elegant, high-performance code. I’ve built <Highlight>full-stack web</Highlight>{" "}
          and <Highlight>mobile applications</Highlight> and administered databases. Lately, I’ve been exploring{" "}
          <Highlight>Machine Learning</Highlight> and <Highlight>Agentic AI</Highlight> to architect smarter,
          adaptive systems for modern software.
        </p>
        <p>
          When I’m not coding, you’ll find me <Highlight>kickboxing</Highlight>, playing{" "}
          <Highlight>basketball</Highlight>, or discovering new <Highlight>cafés</Highlight> and{" "}
          <Highlight>bars</Highlight> around Toronto.
        </p>
      </article>
    </section>
  );
}
