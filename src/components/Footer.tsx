export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <h2 className="couple-names">
          S <span className="ampersand">&amp;</span> B
        </h2>

        <p>We are grateful for your presence in our lives.</p>

        <div className="social-links">
          <a href="#" aria-label="Instagram">
            <i className="fab fa-instagram" />
          </a>
          <a href="#" aria-label="Facebook">
            <i className="fab fa-facebook" />
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
