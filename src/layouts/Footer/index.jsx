import React from "react";
import "./style.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer">
      <Link to={"/"}>
        <img
          src="https://crms.dreamstechnologies.com/html/template/assets/img/logo.svg"
          alt=""
        />
      </Link>
      <p>© 2024 CRMS. Template by Aiselina</p>
    </div>
  );
}

export default Footer;
