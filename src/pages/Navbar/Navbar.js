import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Filter from '../../../components/Filter/index';
import Search from '../../../components/Search/index';
import Logout from '../Logout';
import { auth } from '../../../firebase/firebase';
import { BiAlignJustify } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';

const Navbar = ({ authUser }) => {
    const [menuOpened, setMenuOpened] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleResize = () => {
            const clientWidth = document.documentElement.clientWidth;
            setMenuOpened(clientWidth > 780);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setMenuOpened(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
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
                        <div className="navbar-list ">
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
                                <div key="logout" className="navbar-item">
                                    <Link href="/signUp">Register</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </OutsideClickHandler>
                <div className='menu-icon' onClick={() => setMenuOpened((prev) => !prev)}>
                    <BiAlignJustify size={35} />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
