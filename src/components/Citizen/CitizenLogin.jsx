import React from 'react';

const CitizenLogin = ({ citizenLoginForm, setCitizenLoginForm, handleCitizenLogin }) => {
  return (
    <div className="form-group">
      <div className="form-group">
        <label className="form-label">ID Number</label>
        <input
          className="input-field"
          placeholder="Enter your ID number"
          value={citizenLoginForm.idNumber}
          onChange={(e) => setCitizenLoginForm({ ...citizenLoginForm, idNumber: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Phone Number</label>
        <input
          className="input-field"
          placeholder="Enter your phone number"
          value={citizenLoginForm.phoneNumber}
          onChange={(e) => setCitizenLoginForm({ ...citizenLoginForm, phoneNumber: e.target.value })}
        />
      </div>
      <button className="action-button" onClick={handleCitizenLogin}>
        Login
      </button>
    </div>
  );
};

export default CitizenLogin;