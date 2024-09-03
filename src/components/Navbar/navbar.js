import React from 'react';
import './navbar.css';

const Navbar = ({ selectedMenu }) => {
    return (
        <div className="navbar">
            <h1>{selectedMenu}</h1>
            <div className="navbar-links">
                <a href="#">Profile</a>
                <a href="#">Settings</a>
                <a href="#">Logout</a>
            </div>
        </div>
    );
};

export default Navbar;
