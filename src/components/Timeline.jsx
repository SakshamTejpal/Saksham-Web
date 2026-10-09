import timeline from "../data/timeline.json";
import "../styles/Timeline.css";

export default function Timeline() {
  return (
    <section className="section" id="timeline">
      <h2 className="section-title" data-reveal>Over the years</h2>
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
