import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Ball Knowledge</div>
      <div className="nav-links">
        <NavLink to="/" className="nav-btn">
          Home
        </NavLink>
        <NavLink to="/teams" className="nav-btn">
          Teams
        </NavLink>
        <NavLink to="/players" className="nav-btn">
          Players
        </NavLink>
        <NavLink to="/squad-builder" className="nav-btn">
          Squad Builder
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
