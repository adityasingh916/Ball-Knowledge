import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="nav-menu">
      <div className="logo">Ball Knowledge</div>
      <div className="links">
        <NavLink to="/" className="nav-link">
          Home
        </NavLink>
        <NavLink to="/teams" className="nav-link">
          Teams
        </NavLink>
        <NavLink to="/players" className="nav-link">
          Players
        </NavLink>
        <NavLink to="/squad-builder" className="nav-link">
          Squad Builder
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
