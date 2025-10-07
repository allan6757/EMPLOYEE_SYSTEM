import React from 'react';

const EmployeeLogin = ({ loginForm, setLoginForm, handleEmployeeLogin }) => {
  return (
    <div className="section">
      <h3>Employee Login</h3>
      <div className="form-group">
        <label className="form-label">Booth ID</label>
        <input
          className="input-field"
          placeholder="Enter booth ID"
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
    </div>
  );
};

export default EmployeeLogin;