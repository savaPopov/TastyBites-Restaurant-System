import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer" id="contact">
      <div className="footer-container">
        <div className="footer-grid">

          <div className="footer-section">
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <span className="footer-brand-emoji">🍔</span>
              </div>
              <span className="footer-brand-text">Tasty Bites</span>
            </div>
            <p className="footer-description">
              Serving delicious food with passion since 2020. Your satisfaction is our priority.
            </p>
          </div>


          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <div className="footer-links">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/menu" className="footer-link">Menu</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
          </div>

 
          <div className="footer-section">
            <h3 className="footer-title">Contact Info</h3>
            <div className="footer-info">
              <p>📍 123 Food Street, Tasty City</p>
              <p>📞 +359 888 8888 8</p>
              <p>✉️ hello@tastybites.com</p>
            </div>
          </div>

          {/* Hours */}
          <div className="footer-section">
            <h3 className="footer-title">Opening Hours</h3>
            <div className="footer-info">
              <p>Monday - Friday: 9AM - 10PM</p>
              <p>Saturday: 10AM - 11PM</p>
              <p>Sunday: 10AM - 9PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2024 Tasty Bites. All rights reserved. Made with ❤️ for food lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;