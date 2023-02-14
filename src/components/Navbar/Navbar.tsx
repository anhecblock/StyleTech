import React, { useState } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo-center .png';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="Navbar">
            <span className="nav-logo">
                <img src={logo} alt="logo"></img>
            </span>
            <div className={`nav-items ${isOpen && 'open'}`}>
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/products">Products</NavLink>
                <NavLink to="/create">Create</NavLink>

                <NavLink className="nav-login" to="/login">
                    Login
                </NavLink>
            </div>
            <div
                className={`nav-toggle ${isOpen && 'open'}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="bar"></div>
            </div>
        </div>
    );
};
