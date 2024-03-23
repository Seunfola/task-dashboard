import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Filter from '../../../components/Filter/index';
import Search from '../../../components/Search/index';
import { onAuthStateChanged } from 'firebase/auth';

const Navbar = ({ authUser }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={`contain ${menuOpen ? "open" : ''}`}>

            <Link href="/home" className='logo'>
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
                    <div className='links'>
                        <Link href="/signUp" className='link'>
                            Register
                        </Link>
                    </div>
                    <div className='links-2'>
                        <Link href="/Logout" className='link'>
                            Logout
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Navbar;
