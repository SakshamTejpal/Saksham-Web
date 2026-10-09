// Large section heading: rises into view from behind its own edge, then drifts slowly as the page scrolls.
export default function SectionTitle({ children, align = "left" }) {
  return (
    <h2 className={`section-title ${align}`} data-reveal data-speed="0.06">
      <span>{children}</span>
    </h2>
  );
}
