"use client";

const SHARE_TEXT = encodeURIComponent(
  "You're invited! Sanu & Bijeesh are getting married on April 8th, 2026 in Mannarmala, Kerala. Save the date → https://sanu-weds-bijeesh.vercel.app"
);
const WA_URL = `https://wa.me/?text=${SHARE_TEXT}`;

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="couple-names">
          S <span className="ampersand">&amp;</span> B
        </h2>

        <p>We are grateful for your presence in our lives.</p>

        {/* WhatsApp share */}
        <div style={{ margin: "24px 0" }}>
          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-share-btn"
          >
            <i className="fab fa-whatsapp" /> Share on WhatsApp
          </a>
        </div>

        <div className="gift-message">
          <p>
            as a gift from{" "}
            <a
              href="https://github.com/frpboy"
              target="_blank"
              rel="noopener noreferrer"
              className="rahul-link"
            >
              Rahul
            </a>{" "}
            with love to you guys
          </p>
        </div>

        <p className="copyright">
          &copy; 2026 Sanu &amp; Bijeesh. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
