export default function Events() {
  return (
    <section id="events" className="section alt-bg">
      <div className="container">
        <h2 className="section-title">Wedding Events</h2>

        <div className="event-cards">
          {/* Wedding Ceremony */}
          <div className="event-card">
            <div className="event-image muhurtham-img" />
            <div className="event-info">
              <h3>Wedding Ceremony</h3>
              <p>
                <i className="far fa-calendar-alt" /> April 8th, 2026
              </p>
              <p>
                <i className="far fa-clock" /> 10:30 AM – 12:30 PM
              </p>
              <p>
                <i className="fas fa-map-marker-alt" /> Grand Plaza Hall, Kerala
              </p>
              <a href="#" className="btn">
                View Map
              </a>
            </div>
          </div>

          {/* Reception */}
          <div className="event-card">
            <div className="event-image reception-img" />
            <div className="event-info">
              <h3>Reception</h3>
              <p>
                <i className="far fa-calendar-alt" /> April 8th, 2026
              </p>
              <p>
                <i className="far fa-clock" /> 6:00 PM onwards
              </p>
              <p>
                <i className="fas fa-map-marker-alt" /> Royal Orchid Resort
              </p>
              <a href="#" className="btn">
                View Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
