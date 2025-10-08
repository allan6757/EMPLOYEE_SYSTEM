import React, { useState, useEffect } from 'react';

const LoginScreen = ({ onLogin, showPopup, onShowSignup }) => {
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const kenyaImages = [
    // Kenya Olympians and Athletes
    'https://imgs.search.brave.com/sxn6pXA5rTg0n9iaOWj8aC2o9POaP_ryRoam7NAsXhU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTIz/NDUxMTMyMC9waG90/by8yMDIwLXN1bW1l/ci1vbHltcGljcy1r/ZW55YS1mZXJndXNv/bi1yb3RpY2gtdmlj/dG9yaW91cy1ob2xk/aW5nLWtlbnlhbi1m/bGFnLWFmdGVyLW1l/bnMtODAwbS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9ck5f/bU9HdE01UXAwUUR3/ampOaXVFbXpOYzA4/dDBKUWVNd3A3S2p6/MTJsZz0', // Athletes running
    'https://imgs.search.brave.com/pqq-J96lowC1R-Wtja1WZReo8kgkc1SZ879HyzYoJpQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTEy/MTMxNjQvcGhvdG8v/a2VueWFzLWV6ZWtp/YWwta2VtYm9pLWNv/bXBhdHJpb3QtYnJp/bWluLWtpcHJ1dG8t/cWF0YXJzLW11c2Et/b2JhaWQtYW1lci1h/bmQta2VueWFzLXBh/dWwta2lwc2llbGUu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PXJsTEVNcy0zaEox/MUhjdzZzMnlKMWt6/blZhZzBwdk9RS0sz/bnphZzh4QXc9', // Marathon runners
    'https://imgs.search.brave.com/eZ9xDQK0OJ73Oya3mYvvU09mklAgnvnzJh-IsynKK1s/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTEy/MTM2NzcvcGhvdG8v/bWVucy0zMDAwbS1z/dGVlcGxlY2hhc2Ut/Z29sZC13aW5uZXIt/ZXpla2lhbC1rZW1i/b2ktb2Yta2VueWEt/YW5kLWNvbXBhdHJp/b3RzLWJyb256ZS13/aW5uZXItcGF1bC5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/ZzNFREE0ZXhYeGFB/QnZ5TkxEQkNOVjBP/YktWRmx2alRnMFFx/ZlM2TWhtTT0', // Track and field
    // Maasai Culture
    'https://imgs.search.brave.com/BT97x29x_YzGCAO854_qTU3Ai1MuA89yuCLga8LSjK4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9iaWds/aWZlLm9yZy9pbWFn/ZXMvTWFhc2FpLU9s/eW1waWNzL2hvbWUv/bWFhc2FpLWhvbWUt/d29tZW4tMDEtODAw/eC5qcGc', // Maasai warriors
    'https://imgs.search.brave.com/mHgN8_9hPUvzyU9pUWbNFNaIjeFJmizsuCO3NcnD9pc/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMudW5zcGxhc2gu/Y29tL3Bob3RvLTE1/MTU2NTgzMjM0MDYt/MjVkNjFjMTQxYTZl/P2ZtPWpwZyZxPTYw/Jnc9MzAwMCZpeGxp/Yj1yYi00LjEuMCZp/eGlkPU0zd3hNakEz/ZkRCOE1IeHpaV0Z5/WTJoOE9IeDhhMlZ1/ZVdGOFpXNThNSHg4/TUh4OGZEQT0', // Traditional dress
    'https://imgs.search.brave.com/8MGYPTI8YU7zLGR_7ldpxak2Ya5v6tnvlWUInaFirvw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9iaWds/aWZlLm9yZy9pbWFn/ZXMvTWFhc2FpLU9s/eW1waWNzL2hvbWUv/bWFhc2FpLWhvbWUt/aGlnaC1qdW1wLTAx/LTJ4LTgwMHguanBn', // Cultural ceremony
    // Kenyan Youth
    'https://imgs.search.brave.com/BcZkBD5dVvdmLvD6SBYA6sqGj0zmyAvpN8_uJz-5fK0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pY2hl/Zi5iYmNpLmNvLnVr/L2FjZS9zdGFuZGFy/ZC85NzYvbWNzL21l/ZGlhL2ltYWdlcy82/NjE3OTAwMC9qcGcv/XzY2MTc5ODc5XzAx/NzM5NzA4OS5qcGc', // Young students
    'https://imgs.search.brave.com/M2nWB9jz60EEd9v3orBr-NkIFbGJMeOnncKM20ZTDBQ/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4u/dHVrby5jby5rZS9p/bWFnZXMvMTEyMC8w/ZmdqaHM2azdldTU4/aWUuanBlZz92PTE', // Youth technology
    'https://imgs.search.brave.com/4uMdCkQoqjKVDvhIND-Zqkf9Jxve0lXRYdDAw8-FChM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNDUz/NDY5NTA3L3Bob3Rv/L2dpcmFmZmUtZmFt/aWx5LmpwZz9zPTYx/Mng2MTImdz0wJms9/MjAmYz1NSi1adGQt/aHFjLU00ZXl4bEpj/VzJ0SzVKRDA1NGM0/ZEc3RzVCcWtqVkFB/PQ'  // Young professionals
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % kenyaImages.length);
    }, 5000);
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
              transition: 'transform 0.2s ease',
              marginBottom: '15px'
            }}
          >
            LOGIN
          </button>

          <div style={{ textAlign: 'center', marginBottom: '15px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '0.9rem' }}>
              Don't have an account?
            </span>
          </div>

          <button
            onClick={onShowSignup}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'transparent',
              color: '#ffffff',
              fontSize: '1rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            CREATE ACCOUNT
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;