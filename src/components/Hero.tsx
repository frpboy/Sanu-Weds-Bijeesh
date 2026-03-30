import Countdown from "./Countdown";

export default function Hero() {
  return (
    <header className="hero">
      <div className="hero-content">
        <h2 className="animate-fade-in">Save the Date</h2>

        <h1 className="couple-names animate-slide-up">
          Sanu <span className="ampersand">&amp;</span> Bijeesh
        </h1>

        <p className="date animate-fade-in">April 8th, 2026</p>

        <Countdown />

        <a href="#our-journey" className="scroll-btn" aria-label="Scroll down">
          <i className="fas fa-chevron-down" />
        </a>
      </div>
    </header>
  );
}
