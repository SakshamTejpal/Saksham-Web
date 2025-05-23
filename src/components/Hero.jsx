import Clock from "./time";
import deisgn from "../assets/design.png";

function Hero() {
    return(
        <section className="splits">
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