import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header className="header">
            <div className="logo">MyApp</div>
            <nav className="nav">
                <a href="#home" className="nav-item">Home</a>
                <a href="#about" className="nav-item">My Groups</a>
                <a href="#services" className="nav-item">Services</a>
                <a href="#contact" className="nav-item">Contact</a>
            </nav>
        </header>
    );
};

export default Header;
