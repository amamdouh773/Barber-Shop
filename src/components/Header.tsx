import React from "react";
import "../styles/Header.css";
import { Link } from "react-router-dom";

export const Header = () => {
  const navStyle = {
    color: "#e6f5ff",
    textDecoration: "none",
  };
  return (
    <div className="main">
      <div className="title">
        <h1>Usama & Mahmoud</h1>
      </div>
      <div className="logo">
        <div className="img">
          <img src="../img/main-logo.svg" alt="Logo" />
        </div>
      </div>

      <nav className="links-container">
        <Link to="/" style={navStyle}>
          <div className="link">الاساسية</div>
        </Link>
        <Link to="/employees" style={navStyle}>
          <div className="link">العمال</div>
        </Link>
        <Link to="/products" style={navStyle}>
          <div className="link">المخزن</div>
        </Link>
        <Link to="/financial" style={navStyle}>
          <div className="link">الحسابات</div>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
