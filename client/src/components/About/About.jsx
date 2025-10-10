import { Link } from "react-router-dom";
import "../About/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <div className="about-header">
          <h1 className="about-title">About Us</h1>
          <p className="about-subtitle">
            Welcome to our restaurant! We're passionate about serving delicious, 
            fresh food made with the finest ingredients.
          </p>
        </div>

        <div className="about-main">
          <div className="about-story">
            <h2>Our Story</h2>
            <p>
              Founded with a love for great food and exceptional service, we've been 
              serving our community for years. Our chefs craft each dish with care, 
              using locally sourced ingredients whenever possible.
            </p>
            <p>
              From our signature BBQ burger to our fresh grilled salmon, every item 
              on our menu is prepared with attention to detail and a commitment to quality.
            </p>
          </div>

          <div className="about-features">
            <h3>Why Choose Us?</h3>
            <ul>
              <li>• Fresh, high-quality ingredients</li>
              <li>• Experienced and passionate chefs</li>
              <li>• Diverse menu for all tastes</li>
              <li>• Comfortable and welcoming atmosphere</li>
              <li>• Excellent customer service</li>
            </ul>
          </div>
        </div>

        <div className="about-footer">
          <Link to="/menu" className="back-button">
            Back to Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;