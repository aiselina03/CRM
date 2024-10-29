import React, { useState } from "react";
import "./style.scss";
import { Link, NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleNavbar() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="navbar">
        <div className="nav">
          <div className="navLeft">
            <div className="logo">
              <Link to={"/"}>
                <img
                  src="https://crms.dreamstechnologies.com/html/template/assets/img/logo.svg"
                  alt=""
                />
              </Link>
            </div>
            <div className="menu">
              <ul>
                <li>
                  <NavLink to={"/"}>Dashboard</NavLink>
                </li>
                <li>
                  <NavLink to={"/customers"}>Customers</NavLink>
                </li>
              </ul>
            </div>
          </div>
          <div className="navRight">
            <div className="search">
              <input type="text" name="" id="" placeholder="Search..." />
              <i className="fa-regular fa-magnifying-glass"></i>
            </div>
            <div className="profile">
              <img
                src="https://themesbrand.com/velzon/html/master/assets/images/users/avatar-1.jpg"
                alt=""
              />
              <div className="name">
                <p>Anna Adame</p>
                <span>Founder</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="resNavbar">
        <div className="row">
          <div className="bars" onClick={toggleNavbar}>
            <i className="fa-solid fa-bars"></i>
          </div>
          <div className="logo">
            <Link to={"/"}>
              <img
                src="https://crms.dreamstechnologies.com/html/template/assets/img/logo.svg"
                alt=""
              />
            </Link>
          </div>

          <div className="icons">
            <i className="fa-light fa-user"></i>
          </div>
        </div>
        <div className={`resMenu ${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <NavLink to={"/"}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to={"/customers"}>Customers</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
