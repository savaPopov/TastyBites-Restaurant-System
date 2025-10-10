import "./Home.css";
import heroBurger from "../../assets/hero-burger.jpg";
import fries from "../../assets/fries.jpg";
import salad from "../../assets/salad.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <section className="hero" id="home">
      <div className="hero-container">
        <div className="hero-grid">
          {/* Hero Content */}
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                <span className="hero-title-main">TASTY</span>
                <br />
                <span className="hero-title-accent">FOOD HUB</span>
              </h1>
              <p className="hero-description">
                All your favorite foods under one roof! From gourmet burgers to fresh salads,
                we serve the best dishes with love and passion.
              </p>
            </div>

            <div className="hero-buttons">
              <Link to="/menu" className="btn btn-hero btn-lg">
                Order Now
              </Link>
              {/* <a href="#menu" className="btn btn-outline btn-lg">
                View Menu
              </a> */}
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">500+</div>
                <div className="hero-stat-label">Happy Customers</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">50+</div>
                <div className="hero-stat-label">Menu Items</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-number">5★</div>
                <div className="hero-stat-label">Rating</div>
              </div>
            </div>
          </div>

          {/* Food Gallery */}
          <div className="hero-gallery">
            <div className="hero-gallery-grid">
              <div className="hero-gallery-card">
                <img
                  src={heroBurger}
                  alt="Delicious gourmet burger"
                  className="hero-gallery-image"
                />
              </div>
              <div className="hero-gallery-card">
                <img
                  src={fries}
                  alt="Crispy golden fries"
                  className="hero-gallery-image"
                />
              </div>
              <div className="hero-gallery-card">
                <img
                  src={salad}
                  alt="Fresh colorful salad"
                  className="hero-gallery-image"
                />
              </div>
            </div>

            {/* Floating elements */}
            <div className="hero-floating-element">
              🔥
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;