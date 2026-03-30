const EVENTS = [
  {
    title: "Wedding Ceremony",
    venue: "Immu Auditorium",
    address: "268V+6WP, Mannarmala, Kerala 679325",
    date: "April 8th, 2026",
    time: "10:30 AM – 11:30 AM",
    note: "Auspicious muhurtham time",
    mapEmbed:
      "https://maps.google.com/maps?q=Immu+Auditorium+Mannarmala+Kerala+679325&output=embed&z=16",
    directionsUrl: "https://maps.app.goo.gl/JkS1NyEdMpWs1ykj6",
    googleCalUrl:
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=Sanu+Weds+Bijeesh" +
      "&dates=20260408T050000Z/20260408T060000Z" +
      "&details=Wedding+Ceremony+at+Immu+Auditorium.+Auspicious+time:+10:30+AM+%E2%80%93+11:30+AM+IST" +
      "&location=Immu+Auditorium,+Mannarmala,+Kerala+679325",
    icsUrl: "/wedding.ics",
  },
  {
    title: "Reception",
    venue: "River View Auditorium",
    address: "Chundambatta Post, Nattyamangalam, near Kattuppara, Kerala 679337",
    date: "April 8th, 2026",
    time: "4:30 PM – 7:30 PM",
    note: "",
    mapEmbed:
      "https://maps.google.com/maps?q=River+View+Auditorium+Nattyamangalam+Kattuppara+Kerala+679337&output=embed&z=16",
    directionsUrl: "https://maps.app.goo.gl/tpTioGi2prXbeeRu6",
    googleCalUrl:
      "https://calendar.google.com/calendar/render?action=TEMPLATE" +
      "&text=Sanu+%26+Bijeesh%27s+Wedding+Reception" +
      "&dates=20260408T110000Z/20260408T140000Z" +
      "&details=Wedding+Reception+at+River+View+Auditorium.+4:30+PM+%E2%80%93+7:30+PM+IST" +
      "&location=River+View+Auditorium,+Nattyamangalam,+Kerala+679337",
    icsUrl: "/reception.ics",
  },
];

export default function Events() {
  return (
    <section id="events" className="section alt-bg">
      <div className="container">
        <h2 className="section-title">Wedding Events</h2>

        <div className="event-cards">
          {EVENTS.map((ev) => (
            <div key={ev.title} className="event-card">
              {/* Embedded Google Map */}
              <div className="map-embed">
                <iframe
                  src={ev.mapEmbed}
                  title={`Map for ${ev.venue}`}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              {/* Details */}
              <div className="event-info">
                <h3>{ev.title}</h3>

                <p>
                  <i className="far fa-calendar-alt" /> {ev.date}
                </p>
                <p>
                  <i className="far fa-clock" /> {ev.time}
                  {ev.note && (
                    <span className="event-note"> · {ev.note}</span>
                  )}
                </p>
                <p>
                  <i className="fas fa-map-marker-alt" /> {ev.venue}
                </p>
                <p className="event-address">{ev.address}</p>

                {/* Action buttons */}
                <div className="event-actions">
                  <a
                    href={ev.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-directions"
                  >
                    <i className="fas fa-location-arrow" /> Directions
                  </a>

                  <div className="cal-group">
                    <a
                      href={ev.googleCalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-cal"
                      title="Add to Google Calendar"
                    >
                      <i className="fab fa-google" /> Google Cal
                    </a>
                    <a
                      href={ev.icsUrl}
                      download
                      className="btn btn-cal"
                      title="Download for Apple / Outlook"
                    >
                      <i className="far fa-calendar-plus" /> iCal / Outlook
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
