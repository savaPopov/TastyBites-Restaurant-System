import './Spinner.css';

const Spinner = ({ size = 'md', className = '' }) => {
  const sizeClass = `spinner-${size}`;
  
  return (
    <div className={`spinner-container ${className}`}>
      <div className={`spinner ${sizeClass}`}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
    </div>
  );
};

export default Spinner;