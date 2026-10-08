import Clock from "./Clock";
import useIsMobile from "../hooks/useIsMobile";
import "../styles/Hero.css";

export default function Hero() {
  const isMobile = useIsMobile();

  return (
    <section id="hero">
      <Clock />
      <div className="hero-content">
        {isMobile ? (
          <h1 className="hero-title-comb">Hello! <br /> I am <br />Saksham Tejpal</h1>
        ) : (
          <>
            <h3 className="hero-subtitle">Hello, I am</h3>
            <h1 className="hero-title">Saksham Tejpal</h1>
          </>
        )}
      </div>
    </section>
  );
}
