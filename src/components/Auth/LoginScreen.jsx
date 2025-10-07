import React, { useState, useEffect } from 'react';

const LoginScreen = ({ onLogin, showPopup }) => {
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const kenyaImages = [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1571771019784-3ff35f4f4277?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=1200&h=800&fit=crop',
    'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=1200&h=800&fit=crop'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % kenyaImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    if (!loginForm.identifier || !loginForm.password) {
      showPopup('Please enter email/phone and password', 'error');
      return;
    }
    onLogin(loginForm);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      overflow: 'hidden'
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
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '40px',
          width: '400px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <h1 style={{
              color: '#ffffff',
              fontSize: '2rem',
              fontWeight: '700',
              margin: '0 0 10px 0'
            }}>
              KENYA DIGITAL ID
            </h1>
            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              margin: 0,
              fontSize: '1rem'
            }}>
              Secure Digital Identity System
            </p>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Email or Phone Number"
              value={loginForm.identifier}
              onChange={(e) => setLoginForm({ ...loginForm, identifier: e.target.value })}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ marginBottom: '30px' }}>
            <input
              type="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          <button
            onClick={handleLogin}
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
              transition: 'transform 0.2s ease'
            }}
          >
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;