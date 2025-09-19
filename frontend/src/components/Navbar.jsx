import { Link } from 'react-router-dom';

const Navbar = ({ isLoggedIn, username, onLogout }) => {
  return (
    <nav className="navbar navbar-expand-lg px-4 py-3" style={{ backgroundColor: "#eee6" }}>
      <div className="container-fluid d-flex justify-content-between">
      <Link className="navbar-brand fw-bold fs-4 me-5 text-center" to="/">
      <img src='ed1.png' style={{height:"50px",width:"60px"}}/>
          </Link>
        
        {/* Centered Branding & Navigation Links */}
        <div className="d-flex justify-content-center flex-grow-1">
          <Link className="navbar-brand fw-bold fs-4 me-5 text-center" to="/">
            HOME
          </Link>
          {isLoggedIn && (
            <>
              <Link className="nav-link fw-bold fs-4 mx-3 text-center p-1"  to="/quiz">
                Quiz
              </Link>
              <Link className="nav-link fw-bold fs-4 mx-5 text-center p-1" to="/about">
                About Us
              </Link>
              <Link className="nav-link fw-bold fs-4 mx-3 text-center p-1" to="/help">
                    Help
              </Link>
            </>
          )}
        </div>

        {/* Right-aligned Logout/Login button */}
        <div className="d-flex align-items-center">
          {isLoggedIn ? (
            <button onClick={onLogout} className="btn btn-outline-danger btn-sm">
              Logout
            </button>
          ) : (
            <Link className="btn btn-dark fw-bold fs-5 px-3 py-1" to="/login" style={{ borderRadius: '20px' }}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
