import React, { useState } from "react";
import { Link } from "gatsby";
import useScrollPosition from "./hooks/useScrollPosition";
import { Location } from '@reach/router'

const Navbar = ({forceHeader}) => {
  const [isActive, setIsActive] = useState(false);
  const scrollPosition = useScrollPosition();
  return (
    <nav
      className={(scrollPosition > 30) || forceHeader? "navbar is-transparent is-fixed-top is-white" : "navbar is-transparent is-fixed-top"}
      role="navigation"
      aria-label="main-navigation"
    >
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" title="Logo">
            <h1>LORNA ROBERTSON</h1>
          </Link>
          {/* Hamburger menu */}
          <button
            className={`navbar-burger burger ${isActive && "is-active"}`}
            aria-expanded={isActive}
            onClick={() => setIsActive(!isActive)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div id="navMenu" className={` navbar-end has-text-centered navbar-menu ${isActive && "is-active"}`}>
            {/* TODO: inline override of padding is a result of refactoring
                to a ul for accessibilty purposes, would like to see a css
                re-write that makes this unneccesary.
             */}
            
            <Link className="navbar-item" activeClassName="active" to="/about">
              About
            </Link>
            
            <Link className="navbar-item" activeClassName="active" to="/gallery">
              Paintings
            </Link>
            
            
            <Link className="navbar-item" activeClassName="active" to="/contact">
              Contact
            </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
