import Clock from "./time";

function Hero() {
    return(
        <section className="hero">
            <div>
                <p className="hero-clock"><Clock /></p>
            </div>
            <div className="hero-wrapper">
                <h1 className="hero-title">Saksham Tejpal</h1>
            </div>
        </section>
    );
}
export default Hero;