import React, { useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../../firebase/firebase';
import Navbar from '../../src/pages/Navbar/Navbar';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userCred) => {
            if (userCred) {
                setAuthUser(userCred); // User is signed in
            } else {
                setAuthUser(null); // User is signed out
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div>
                    <Navbar authUser={authUser} />      
        </div>
    );
};

export default AuthDetails;
