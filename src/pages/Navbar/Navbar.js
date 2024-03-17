import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Filter from '../../../components/Filter/index';
import Search from '../../../components/Search/index';

const Navbar = ({ authUser }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={`contain ${menuOpen ? "open" : ''}`}>
            
            <Link href="/" className='logo'>
                TASK 
            </Link>

            <div className='navWrapper'>
                
                <div className={`menuIcon ${menuOpen ? 'open' : 'n'}`} onClick={toggleMenu}>
                    <div className='bar'></div>
                    <div className='bar'></div>
                    <div className='bar'></div>
                </div>
                <div className='links'>
                    <div className='filterContainer'>
                        <Filter />
                    </div>
                    <div className='searchContainer'>
                        <Search />
                    </div>
                    {authUser ? (
                        <div className='links'>
                            <Link href="/logout" className='link'>
                                Logout
                            </Link>
                            <p className='signedIn'>Signed In as {authUser.email}</p>
                        </div>
                    ) : (<div className='links'>
                        <Link href="/signUp" className='link'>
                            Register
                        </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
};

export default Navbar;
