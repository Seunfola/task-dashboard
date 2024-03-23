import React from 'react';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Logout = () => {
    const handleSignOut = async () => {
        // Display confirmation dialog
        const confirmed = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will be logged out.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, log me out'
        });

        if (confirmed.isConfirmed) {
            try {
                await signOut(auth);
                console.log('Logged out');
            } catch (error) {
                console.error('Error signing out:', error.message);
            }
        }
    };

    return (
        <div className="logout-container">
            <div className="logo">
                <FontAwesomeIcon icon={faUser} className="logo-icon" />
            </div>
            <h1 logout-heading>Click to logout from this app</h1>
            <button className="logout-button" onClick={handleSignOut}>
                Log Out
            </button>
           
           
        </div>
    );
};

export default Logout;
