import React, { useEffect, useState } from 'react';
import { auth } from '@/firebase/firebase';
import { onAuthStateChanged } from '../../firebase/firebase';

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
        return () =>{
            listen();
        }
    }, [])
    return (
        <div>
{authUser? <p>{'Signed In as $(authUser.email)'}</p>:<p>Signed Out</p>}
        </div>
    )
}

export default AuthDetails
