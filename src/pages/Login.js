import React, { useEffect, useState } from 'react';
import { auth, googleProvider } from '../../firebase/firebase';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  signInWithPopup,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [notificationVisible, setNotificationVisible] = useState(false);
  const router = useRouter();

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      console.log('success');
      toast.success('Login successful!');
      setNotificationVisible(true);

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        const { email, emailVerified } = userCred;
        setUser({ email, emailVerified });
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div>
      <ToastContainer />
      <div className="signup-container">
        <div className="signup-title">Log In</div>
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
          <div className="password-input-wrapper">
            <input
              className="signup-input password-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button className="signup-button" onClick={handleSignIn}>
          Log In
        </button>
        <button className="signup-button-google" onClick={signInWithGoogle}>
          Sign In With Google
        </button>

        <div className="signup-login-link">
          {'Don\'t have an account? '}
          <div className="login-link">
            <Link href="/signUp" legacyBehavior>
              Signup
            </Link>
          </div>
        </div>
      </div>

      {notificationVisible && (
        <div className="notification">
          <p>Login successful!</p>
          <p>Redirecting to dashboard...</p>
        </div>
      )}
    </div>
  );
};

export default Login;
