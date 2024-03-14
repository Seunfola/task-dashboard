import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase/firebase';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from 'firebase/auth';
import { useRouter } from 'next/router';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCred.user;
      await sendEmailVerification(user);
      console.log('success');
      toast.success('Account created successfully. Please check your email for verification.');
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userCred) => {
      if (userCred) {
        const { email, emailVerified } = userCred;
        setUser({ email, emailVerified });

        // If email is verified, update the state
        if (emailVerified) {
          setVerificationComplete(true);
          // Display success notification
          toast.success('Email verification successful!');
        }
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [router]); // Dependency array includes router to ensure proper cleanup of the useEffect when the route changes

  useEffect(() => {
    // Redirect to login page after email verification
    if (verificationComplete) {
      toast.success('Redirecting to login...');
      setTimeout(() => {
        router.push('/Login');
      }, 2000); // Redirect after 2 seconds
    }
  }, [verificationComplete, router]);

  return (
    <div>
      <ToastContainer />
      <div className="signup-container">
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

        <button className="signup-button" onClick={handleSignUp}>
          Sign Up
        </button>

        <div className="signup-login-link">
          Already have an account?{' '}
          <div className="login-link">
            <Link href="/Login" legacyBehavior>
              Login
            </Link>
          </div>
          {user && (
            <div>
              <p>{user.email}</p>
              <p>{user.emailVerified ? 'true' : 'false'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;
