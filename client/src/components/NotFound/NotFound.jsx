import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import "../NotFound/NotFound.css";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <p className="not-found-message">Oops! Page not found</p>
        <a href="/" className="home-button">
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
