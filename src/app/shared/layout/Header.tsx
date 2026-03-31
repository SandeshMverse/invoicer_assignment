import { Link, useNavigate } from "react-router-dom";
import "../../styles/layout.css";

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-3">
      {/* Left Logo */}
      <Link className="navbar-brand mr-3" to="/products">
        <img
          src="https://digitalinnk.com/wp-content/uploads/2021/10/Digital-Innk-2021-Green-black-standard.png"
          alt="logo"
          className="header-logo"
        />
      </Link>

      {/* Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Menu */}
      <div className="collapse navbar-collapse ml-3" id="navbarNav">
        <ul className="navbar-nav me-auto">

          {/* Masters */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Masters
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/products">
                  Products
                </Link>
              </li>
              <li>
                <Link className="dropdown-item" to="/discounts">
                  Discounts
                </Link>
              </li>
            </ul>
          </li>

          {/* Operations */}
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
            >
              Operations
            </a>
            <ul className="dropdown-menu">
              <li>
                <Link className="dropdown-item" to="/invoice">
                  Invoice
                </Link>
              </li>
            </ul>
          </li>
        </ul>

        {/* Right logout */}
        <button className="btn btn-outline-danger btn-outline-primary-custom" onClick={logout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Header;