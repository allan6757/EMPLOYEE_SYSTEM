import React, { useState } from 'react';
import { sanitizeInput, validatePassword } from '../../utils/security';

const SignupForm = ({ onSignup, showPopup, onBackToLogin }) => {
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    idNumber: '',
    agreeToTerms: false
  });

  const [passwordValidation, setPasswordValidation] = useState(null);

  const handlePasswordChange = (password) => {
    setSignupForm({ ...signupForm, password });
    setPasswordValidation(validatePassword(password));
  };

  const handleSubmit = () => {
    // Validation
    if (!signupForm.firstName || !signupForm.lastName || !signupForm.email || 
        !signupForm.phoneNumber || !signupForm.password || !signupForm.idNumber) {
      showPopup('Please fill all required fields', 'error');
      return;
    }

    if (signupForm.password !== signupForm.confirmPassword) {
      showPopup('Passwords do not match', 'error');
      return;
    }

    if (passwordValidation && !passwordValidation.isValid) {
      showPopup('Password does not meet requirements', 'error');
      return;
    }

    if (!signupForm.agreeToTerms) {
      showPopup('Please agree to terms and conditions', 'error');
      return;
    }

    // Sanitize inputs
    const sanitizedData = {
      ...signupForm,
      firstName: sanitizeInput(signupForm.firstName),
      lastName: sanitizeInput(signupForm.lastName),
      email: sanitizeInput(signupForm.email),
      phoneNumber: sanitizeInput(signupForm.phoneNumber),
      idNumber: sanitizeInput(signupForm.idNumber)
    };

    onSignup(sanitizedData);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'auto',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        padding: '20px'
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          width: '500px',
          maxWidth: '90vw',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{
              color: '#ffffff',
              fontSize: '2rem',
              fontWeight: '700',
              margin: '0 0 10px 0'
            }}>
              CREATE ACCOUNT
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              fontSize: '1rem'
            }}>
              Join the Kenya Digital ID System
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="First Name *"
              value={signupForm.firstName}
              onChange={(e) => setSignupForm({ ...signupForm, firstName: e.target.value })}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Last Name *"
              value={signupForm.lastName}
              onChange={(e) => setSignupForm({ ...signupForm, lastName: e.target.value })}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="email"
              placeholder="Email Address *"
              value={signupForm.email}
              onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '15px' }}>
            <input
              type="tel"
              placeholder="Phone Number *"
              value={signupForm.phoneNumber}
              onChange={(e) => setSignupForm({ ...signupForm, phoneNumber: e.target.value })}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            <input
              type="text"
              placeholder="ID Number *"
              value={signupForm.idNumber}
              onChange={(e) => setSignupForm({ ...signupForm, idNumber: e.target.value })}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="date"
              placeholder="Date of Birth"
              value={signupForm.dateOfBirth}
              onChange={(e) => setSignupForm({ ...signupForm, dateOfBirth: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <input
              type="password"
              placeholder="Password *"
              value={signupForm.password}
              onChange={(e) => handlePasswordChange(e.target.value)}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
            {passwordValidation && (
              <div style={{ marginTop: '8px', fontSize: '0.8rem' }}>
                <div style={{ color: passwordValidation.requirements.minLength ? '#22c55e' : '#ef4444' }}>
                  ✓ At least 8 characters
                </div>
                <div style={{ color: passwordValidation.requirements.hasUpperCase ? '#22c55e' : '#ef4444' }}>
                  ✓ One uppercase letter
                </div>
                <div style={{ color: passwordValidation.requirements.hasLowerCase ? '#22c55e' : '#ef4444' }}>
                  ✓ One lowercase letter
                </div>
                <div style={{ color: passwordValidation.requirements.hasNumbers ? '#22c55e' : '#ef4444' }}>
                  ✓ One number
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="password"
              placeholder="Confirm Password *"
              value={signupForm.confirmPassword}
              onChange={(e) => setSignupForm({ ...signupForm, confirmPassword: e.target.value })}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.9rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              id="terms"
              checked={signupForm.agreeToTerms}
              onChange={(e) => setSignupForm({ ...signupForm, agreeToTerms: e.target.checked })}
              style={{ transform: 'scale(1.2)' }}
            />
            <label htmlFor="terms" style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.9rem' }}>
              I agree to the Terms and Conditions
            </label>
          </div>

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '15px',
              borderRadius: '10px',
              border: 'none',
              background: 'linear-gradient(135deg, #dc2626 0%, #228b22 100%)',
              color: '#ffffff',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: 'pointer',
              marginBottom: '15px'
            }}
          >
            CREATE ACCOUNT
          </button>

          <button
            onClick={onBackToLogin}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'transparent',
              color: '#ffffff',
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;