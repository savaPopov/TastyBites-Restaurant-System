import { Link } from "react-router-dom";
import "./Header.css";
import { useCart } from "../../context/CartContext";

const Header = () => {
  const { getTotalItems } = useCart();
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          {/* Logo */}
          <div className="header-logo">
            <div className="header-logo-icon">
              <span className="header-logo-emoji">🍔</span>
            </div>
            <span className="header-logo-text">Tasty Bites</span>
          </div>

          {/* Navigation */}
          <nav className="header-nav">
            <Link to="/" className="header-nav-link">
              Home
            </Link>
            <Link to="/menu" className="header-nav-link">
              Menu
            </Link>
            <Link to="/about" className="header-nav-link">
              About
            </Link>
            <Link to="/contact" className="header-nav-link">
              Contact
            </Link>
          </nav>

  {/* button */}
          <div className="header-actions">
            <Link to="/cart" className="cart-button">
              <span className="cart-icon">🛒</span>
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;