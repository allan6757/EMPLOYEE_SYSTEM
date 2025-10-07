import React, { useState, useEffect } from 'react';
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const kenyaImages = [
    // Kenya Olympians and Athletes
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop', // Athletes running
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&h=800&fit=crop', // Marathon runners
    'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=800&fit=crop', // Track and field
    // Maasai Culture
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop', // Maasai warriors
    'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=1200&h=800&fit=crop', // Traditional dress
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop', // Cultural ceremony
    // Kenyan Youth
    'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=1200&h=800&fit=crop', // Young students
    'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&h=800&fit=crop', // Youth technology
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop'  // Young professionals
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % kenyaImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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
      overflow: 'auto'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: `url(${kenyaImages[currentImageIndex]})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out'
      }} />
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(0, 0, 0, 0.6)'
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
    </div>
  );
};

export default SignupForm;