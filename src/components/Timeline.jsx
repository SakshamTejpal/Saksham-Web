import timeline from "../data/timeline.json";
import SectionTitle from "./SectionTitle";
import "../styles/Timeline.css";

export default function Timeline() {
  return (
    <section className="section" data-snap id="timeline">
      <SectionTitle>Over the years</SectionTitle>
      <ol className="timeline">
        {timeline.map((item) => (
          <li key={item.title} className="timeline-row" data-reveal>
            <span className="label">{item.year}</span>
            <div>
              <h3 className="timeline-title">{item.title}</h3>
              <p className="label">{item.place}</p>
            </div>
            <p className="timeline-description">{item.description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
