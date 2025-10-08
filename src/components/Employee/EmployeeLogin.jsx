import React from 'react';

const EmployeeLogin = ({ loginForm, setLoginForm, handleEmployeeLogin }) => {
  return (
    <div className="section">
      <h3>Employee Login</h3>
      <div className="form-group">
        <label className="form-label">Booth ID</label>
        <input
          className="input-field"
          placeholder="Enter booth ID (e.g., B002)"
          value={loginForm.boothId}
          onChange={(e) => setLoginForm({ ...loginForm, boothId: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="input-field"
          placeholder="Enter password"
          value={loginForm.password}
          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
        />
      </div>
      <button className="action-button" onClick={handleEmployeeLogin}>
        Login to Booth
      </button>
      
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        background: 'rgba(34, 139, 34, 0.1)',
        border: '1px solid rgba(34, 139, 34, 0.3)',
        borderRadius: '8px',
        fontSize: '0.85rem',
        color: 'var(--text-secondary)'
      }}>
        <strong>Demo Credentials:</strong><br/>
        B002 / emp123 (Allan Maina)<br/>
        B001 / emp456 (Mary Wanjiku)<br/>
        B003 / emp789 (John Kamau)
      </div>
    </div>
  );
};

export default EmployeeLogin;