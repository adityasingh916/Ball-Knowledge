import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Ball Knowledge</div>
      <div className="nav-links">
        <NavLink to="/" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
          Home
        </NavLink>
        <NavLink to="/teams" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
          Teams
        </NavLink>
        <NavLink to="/players" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
          Players
        </NavLink>
        <NavLink to="/squad-builder" className={({isActive}) => `nav-btn ${isActive ? 'active' : ''}`}>
          Squad Builder
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
