export default function Journey() {
  return (
    <section id="our-journey" className="section">
      <div className="container">
        <h2 className="section-title">Our Journey</h2>

        <div className="timeline">
          {/* Left: Family Decision */}
          <div className="timeline-item left">
            <div className="timeline-content">
              <i className="fas fa-handshake-angle icon" />
              <h3>A Family Decision</h3>
              <p>
                Our story began when our families came together with a shared
                vision of a beautiful future for us. A union built on respect
                and timeless family values.
              </p>
            </div>
          </div>

          {/* Right: The Engagement */}
          <div className="timeline-item right">
            <div className="timeline-content">
              <i className="fas fa-ring icon" />
              <h3>The Engagement</h3>
              <span className="date-label">April 2025</span>
              <p>
                Surrounded by loved ones, we officially embarked on this journey
                together. A day filled with promises and the beginning of a
                lifelong bond.
              </p>
            </div>
          </div>

          {/* Left: The Big Day */}
          <div className="timeline-item left">
            <div className="timeline-content">
              <i className="fas fa-heart icon" />
              <h3>The Big Day</h3>
              <span className="date-label">April 8th, 2026</span>
              <p>
                We invite you to witness the culmination of this journey as we
                unite in marriage and start our lives together as one.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
