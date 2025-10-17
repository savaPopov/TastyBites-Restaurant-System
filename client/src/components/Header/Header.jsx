import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useCart } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";


const Header = () => {

  const { getTotalItems } = useCart();
  const { username, isAuthenticated, localLogout, role } = useAuthContext();
  const navigate = useNavigate();


  const handleLogout = () => {
    localLogout();
    navigate('/');
  };

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

            {/* Admin Control Panel Link - Only visible to admins */}
            {role === 'ADMIN' && (
              <Link to="/admin/controlPanel" className="header-nav-link admin-link">
                Control Panel
              </Link>
            )}

          </nav>

          {/* button */}
          <div className="header-actions">
            <Link to="/cart" className="cart-button">
              <span className="cart-icon">🛒</span>
              {getTotalItems() > 0 && (
                <span className="cart-badge">{getTotalItems()}</span>
              )}
            </Link>

            {isAuthenticated ? (
              <>
                <span className="user-greeting">Hi, {username}</span>
                <button onClick={handleLogout} className="btn btn-outline btn-lg">
                  Logout
                </button>
              </>
            ) : (<Link to="/login" className="btn btn-hero btn-lg">
              Sign In
            </Link>)}


          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;