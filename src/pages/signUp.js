import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import Link from 'next/link';
import Swal from 'sweetalert2';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth';
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      setIsLoading(true); // Start loading
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      await sendEmailVerification(user);
      console.log('success');
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Account created successfully. Please check your email for verification.',
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error: ${error.message}`,
      });
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        const { email, emailVerified } = userCred;
        setUser({ email, emailVerified });

        if (emailVerified) {
          setVerificationComplete(true);
          // Display success notification
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Email verification successful!',
          });
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []); // Only run once on component mount

  return (
    <div>
      <div className="signup-container">
        <div className="logo">
          <FontAwesomeIcon icon={faUser} className="logo-icon" />
        </div>
        <div className="signup-title">Sign Up</div>
        <div className="form-group">
          <label className="signup-label">Email:</label>
          <input
            className="signup-input"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group password-input-container">
          <label className="signup-label">Password:</label>
          <input
            className="signup-input password-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="signup-button" onClick={handleSignUp} disabled={isLoading}>
          {isLoading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <div className="login-signup-link">
          <p>Already have an account? </p>
          <Link href="/Login" className='linking'>
            Login
          </Link>

        </div>


      </div>
    </div>
  );
};

export default Signup;
