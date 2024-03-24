import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Filter from '../../../components/Filter/index';
import Search from '../../../components/Search/index';
import AuthDetails from '../AuthDetails';

const Navbar = ({ authUser }) => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className={`contain ${menuOpen ? "open" : ''}`}>

            <Link href="/home" className='logo'>
                TASK<br/> NOTE
            </Link>

            <div className='navWrapper'>

                <div className={`menuIcon ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
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
                    <AuthDetails />
                </div>
            </div>
        </div>

    );
};

export default Navbar;
