import React from 'react';
import { auth } from '../../firebase/firebase';
import { signOut } from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('Logged out');
    } catch (error) {
      console.error('Error signing out:', error.message);
      toast.error('Error signing out. Please try again.');
    }
  };

  return (
    <div className="logout-container">
      <ToastContainer />
      <button className="logout-button" onClick={handleSignOut}>
        Log Out
      </button>
    </div>
  );
};

export default Logout;
