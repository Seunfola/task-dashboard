import React from 'react';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
<<<<<<< HEAD
import Swal from 'sweetalert2'; // Import SweetAlert
import 'sweetalert2/dist/sweetalert2.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Logout = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Logged out');
    } catch (error) {
      console.error('Error signing out:', error.message);
      // Display error message using SweetAlert
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error signing out. Please try again.',
      });
    }
  };

  return (
    <div className="logout-container">
      <div className="logo">
        <FontAwesomeIcon icon={faUser} className="logo-icon" />
      </div>
      <button className="logout-button" onClick={handleSignOut}>
        Log Out
      </button>
    </div>
  );
=======
import Swal from 'sweetalert2';

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
                // Handle error
            }
        }
    };

    return (
        <div className="logout-container">
            <button className="logout-button" onClick={handleSignOut}>
                Log Out
            </button>
        </div>
    );
>>>>>>> 7456d45c8c13bdee617514e02fa7ae614ac929eb
};

export default Logout;
