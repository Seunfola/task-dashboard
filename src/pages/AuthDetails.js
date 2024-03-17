import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase';
import { onAuthStateChanged } from '../../firebase/firebase';
import Navbar from '../../src/pages/Navbar/Navbar';

const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        });
        return () => {
            listen();
        }
    }, []);

    return (
        <div>
            {authUser ? (
                <div>
                    <Navbar authUser={authUser} /> {/* Pass the authUser prop to the Navbar component */}
                    <p>{`Signed In as ${authUser.email}`}</p>
                </div>
            ) : (
                <p>Signed Out</p>
            )}
        </div>
    );
};

export default AuthDetails;
