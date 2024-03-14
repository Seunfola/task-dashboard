import React, { useState } from 'react';
import Link from 'next/link';
import Filter from '../../../components/Filter/index';
import Search from '../../../components/Search/index';
import Logout from '../Logout';
import './navbar.module.css';

const Navbar = ({ authUser }) => {
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div className="navbar">
            <div className="nav-bar">
                <header>Task Dashboard</header>
            </div>
            <div className="navbar-envelop">
                {/* Hamburger Icon for Mobile */}
                <dgiv className={`hamburger-icon ${isMobileMenuOpen ? 'hide' : ''}`} onClick={toggleMobileMenu}>
                    <div className={`line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                    <div className={`line ${isMobileMenuOpen ? 'open' : ''}`}></div>
                </dgiv>

                {/* Filter and Search */}
                <div className={`filter-container ${isMobileMenuOpen ? 'show' : ''}`}>
                    <Filter />
                </div>
                <div className={`search-container ${isMobileMenuOpen ? 'show' : ''}`}>
                    <Search />
                </div>

                {/* Logout Button */}
                <div className={`navbar-list ${isMobileMenuOpen ? 'show' : ''}`}>
                    {authUser ? (
                        <>
                            <div key="logout" className="navbar-item">
                                <Logout />
                            </div>
                            <div>
                                <p>{`Signed In as ${authUser.email}`}</p>
                            </div>
                        </>
                    ) : (
                        <div key="signup" className="navbar-item">
                            <Link href="/signUp">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
