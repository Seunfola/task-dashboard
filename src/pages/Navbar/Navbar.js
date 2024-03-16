import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Filter from '../../../components/Filter/index';
import Search from '../../../components/Search/index';
import Logout from '../Logout';
import { BiAlignJustify } from 'react-icons/bi';
import OutsideClickHandler from 'react-outside-click-handler';

const Navbar = ({ authUser }) => {

    const [menuOpened, setMenuOpened] = useState(false);
    const [menuStyles, setMenuStyles] = useState({});

    useEffect(() => {
        const handleResize = () => {
            if (typeof window !== 'undefined') {
                const clientWidth = document.documentElement.clientWidth;
                setMenuStyles(clientWidth <= 780 ? { right: !menuOpened && "-100%" } : {});
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [menuOpened]);

    return (
        <div className="navbar">
            <div className="nav-bar">
                <header>Task Dashboard</header>
            </div>
            <div className='navbar-envelop'>
            <OutsideClickHandler onOutsideClick={() => setMenuOpened(false)}>
                <div className='h-menu' style={menuStyles}>
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
                            <div key="signup" className="navbar-item">
                                <Link href="/signUp">Register</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className='menu-icon' onClick={() => setMenuOpened((prev) => !prev)}>
                    <BiAlignJustify size={35} />
                </div>
            </OutsideClickHandler>
        </div>
        </div>
    );
};

export default Navbar;
