import React, { useState } from 'react';
import Link from 'next/link';
<<<<<<< HEAD
import Filter from '../../../components/Filter/index';
import Search from '../../../components/Search/index';
=======
import { BiAlignJustify } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';
import Filter from '../../../components/Filter/index';
import Search from '../../../components/Search/index';

>>>>>>> 7456d45c8c13bdee617514e02fa7ae614ac929eb
const Navbar = ({ authUser }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = (authUser) => {
        setMenuOpen(!menuOpen);
    };

    return (
<<<<<<< HEAD
      <div className={`contain ${menuOpen ? open : ''}`}>
    
        <Link href="/" className='logo'>
            TASK
        </Link>
        <div className='navWrapper'>
        <div className={`menuIcon ${menuOpen ? 'open' : 'none'}`} onClick={toggleMenu}>
            <div className='bar'></div>
            <div className='bar'></div>
            <div className='bar'></div>
=======
        <div className="navbar">
            <div className="nav-bar">
                <header>Task Dashboard</header>
            </div>
            <div className='navbar-envelop'>
                <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
                    <div ref={menuRef} className={`h-menu ${menuOpened ? 'open' : ''}`}>
                        <div className="filter-container">
                            <Filter />
                        </div>
                        <div className="search-container">
                            <Search />
                        </div>
                        <div className="navbar-list">
                            {authUser ? (
                                <>
                                    <div>
                                        <p>{`Signed In as ${authUser.email}`}</p>
                                    </div>
                                    <div className="navbar-item">
                                        <Link href="/logout">Logout</Link> {/* Link to the logout page */}
                                    </div>
                                </>
                            ) : (
                                <div className="navbar-item">
                                    <Link href="/signUp">Register</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </OutsideClickHandler>
                {/* Render menu icon */}
                <div className='menu-icon' onClick={() => setMenuOpened((prev) => !prev)}>
                    <BiAlignJustify size={35} />
                </div>
            </div>
>>>>>>> 7456d45c8c13bdee617514e02fa7ae614ac929eb
        </div>
        <div className='links'>
            <div className='filterContainer'>
                <Filter />
            </div>
            <div className='searchContainer'>
                <Search />
            </div>
            {authUser ? (
                <>
                    <Link href="/logout" className='link'>
                        Logout
                    </Link>
                    <p className='signedIn'>Signed In as {authUser.email}</p>
                </>
            ) : (
                <Link href="/signUp" className='link'>
                    Register
                </Link>
            )}
        </div>
        </div>
    </div>


    );
};

export
