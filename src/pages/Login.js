import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Swal from 'sweetalert2';
import { signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, twitterProvider } from '../../firebase/firebase';
import { loadUserTasks } from '../store/tasksSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faUser } from '@fortawesome/free-solid-svg-icons';

const Login = ({ authUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Added loading state
  const router = useRouter();
  const dispatch = useDispatch();

  const signInWithGoogle = async () => {
    setLoading(true); // Set loading to true during sign in
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to sign in with Google!',
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const signInWithTwitter = async () => {
    setLoading(true); // Set loading to true during sign in
    try {
      await signInWithPopup(auth, twitterProvider);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to sign in with Twitter!',
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSignIn = async () => {
    setLoading(true); // Set loading to true during sign in
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Display success message
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login successful!',
      });

      // Load tasks associated with the logged-in user
      dispatch(loadUserTasks(user.uid));

      // Redirect to dashboard after a brief delay
      setTimeout(() => {
        router.push('/Home');
      }, 2000);
    } catch (error) {
      // Display specific error messages based on error code
      const errorCode = error.code;
      let errorMessage = 'Login failed! Please check your email and password.';
      if (errorCode === 'auth/user-not-found') {
        errorMessage = 'No user found with this email address.';
      } else if (errorCode === 'auth/wrong-password') {
        errorMessage = 'Incorrect password. Please try again.';
      } else if (errorCode === 'auth/too-many-requests') {
        errorMessage = 'Too many unsuccessful login attempts. Please try again later.';
      } else {
        errorMessage = error.message;
      }

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: errorMessage,
      });
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        const { email, emailVerified, uid } = userCred;
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="login-container">
      <div className="logo">
        <FontAwesomeIcon icon={faUser} className="logo-icon" />
      </div>
      <div className="login-title">Log In</div>
      <div className="form-group">
        <label className="login-label">Email:</label>
        <input
          className="login-input"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group password-input-container">
        <label className="login-label">Password:</label>
        <div className="password-input-wrapper">
          <input
            className="login-input password-input"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className='btn-grp'>
        <button className="login-button" onClick={handleSignIn} disabled={loading}>
          {loading ? 'Logging in...' : <FontAwesomeIcon icon={faEnvelope} />}
        </button>
        <button className="login-button-google" onClick={signInWithGoogle} disabled={loading}>
          {loading ? 'google' : <FontAwesomeIcon icon={faGoogle} />}
        </button>
        <button className="login-button-twitter" onClick={signInWithTwitter} disabled={loading}>
          {loading ? 'twitter' : <FontAwesomeIcon icon={faTwitter} />}
        </button>
      </div>
      <div className="login-signup-link">
        {authUser ? (
          <Link href="/logout" className='linking'>
            Logout
          </Link>
        ) : (
          <Link href="/signUp" className='linking'>
            Signup
          </Link>
        )}
      </div>
    </div>
  );
};

export default Login;
