import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { useCart } from "../../context/CartContext";
import { useAuthContext } from "../../context/AuthContext";


const Header = () => {

  const { getTotalItems, clearCart } = useCart();
  const { username, isAuthenticated, localLogout, role, accessToken } = useAuthContext();
  const navigate = useNavigate();
  let isUser;

  if (role === "USER") {
    isUser = true;
  }

  const handleLogout = () => {
    // console.log(accessToken)
    localLogout();
    clearCart();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">

          <div className="header-logo">
            <div className="header-logo-icon">
              <span className="header-logo-emoji">🍔</span>
            </div>
            <span className="header-logo-text">Tasty Bites</span>
          </div>


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


            {role === 'ADMIN' && (
              <Link to="/admin/controlPanel" className="header-nav-link admin-link">
                Control Panel
              </Link>
            )}

          </nav>


          <div className="header-actions">
            {isUser && (
              <Link to="/cart" className="cart-button">
                <span className="cart-icon">🛒</span>
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </Link>)}

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