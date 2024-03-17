import React from 'react';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
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
};

export default Logout;
