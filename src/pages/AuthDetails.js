import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../../firebase/firebase';
import Link from 'next/link';
import styles from './AuthDetails.module.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCred) => {
            setAuthUser(userCred);
        });

        return () => unsubscribe();
    }, []);

    return authUser ? (
        <div className={`${styles.authDetails} ${styles.online}`}>
            {authUser.email ? (
                <div className='user-details'>
                    <div className={styles.activeText}>
                    <span><FontAwesomeIcon icon={faUser} className="logo-icon" /></span>
                    <span>{authUser.displayName || authUser.email}</span></div>
                    <div className={styles.activeText}>
                    <span className={styles.dot}></span>
                    <span >Online</span>
                    </div>
                    <Link href="/Logout" className={styles.link}>
                        Logout
                    </Link>
                </div>
            ) : (
                <>
                    <span>Loading...</span>
                </>
            )}
        </div>
    ) : (
        <div className={`${styles.authDetails} ${styles.offline}`}>
                <div className='user-details'>
                
                    <div className={styles.activeText}>
            <span className={styles.dot}></span>
                <span>offline</span>
                </div>
                    <Link href="/signUp" className={styles.link}>
                        Register
                    </Link>
        </div>
        </div>
    );
};

export default AuthDetails;