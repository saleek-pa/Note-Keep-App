import React from 'react';
import { TfiViewList } from 'react-icons/tfi';
import { TfiViewGrid } from 'react-icons/tfi';
import { MdDarkMode } from 'react-icons/md';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/Navbar.css';

const Navbar = ({ view, toggleView, toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src="https://cdn3d.iconscout.com/3d/premium/thumb/notes-7042559-5728147.png" alt="Logo" className="logo" />
        <span className="app-name">Note Keep</span>
      </div>
      <div className="navbar-right">
        {view === 'grid' ? (
          <TfiViewList className="navbar-icon" onClick={() => toggleView('list')} />
        ) : (
          <TfiViewGrid className="navbar-icon" onClick={() => toggleView('grid')} />
        )}
        <MdDarkMode className="navbar-icon" onClick={toggleTheme} />
        <FaUserCircle className="navbar-icon" />
      </div>
    </nav>
  );
};

export default Navbar;
