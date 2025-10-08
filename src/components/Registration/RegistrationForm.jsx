import React from 'react';

const RegistrationForm = ({ 
  registrationForm, 
  setRegistrationForm, 
  registerCitizen, 
  showPopup 
}) => {

  const clearForm = () => {
    setRegistrationForm({
      firstName: '', lastName: '', dateOfBirth: '', placeOfBirth: '',
      nationality: 'Kenyan', gender: '', phoneNumber: '', email: '',
      address: '', nextOfKin: '', fingerprint: '', photo: '', requestBiometric: false
    });
  };

  return (
    <div className="section">
      <h3>Register New Citizen (18+ Years)</h3>
      <div className="grid">
        <div>
          <div className="form-group">
            <label className="form-label">First Name *</label>
            <input
              className="input-field"
              placeholder="Enter first name"
              value={registrationForm.firstName}
              onChange={(e) => setRegistrationForm({ ...registrationForm, firstName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name *</label>
            <input
              className="input-field"
              placeholder="Enter last name"
              value={registrationForm.lastName}
              onChange={(e) => setRegistrationForm({ ...registrationForm, lastName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Place of Birth</label>
            <input
              className="input-field"
              placeholder="Enter place of birth"
              value={registrationForm.placeOfBirth}
              onChange={(e) => setRegistrationForm({ ...registrationForm, placeOfBirth: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Gender *</label>
            <select
              className="input-field"
              value={registrationForm.gender}
              onChange={(e) => setRegistrationForm({ ...registrationForm, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
        </div>

        <div>
          <div className="form-group">
            <label className="form-label">Phone Number *</label>
            <input
              className="input-field"
              placeholder="Enter phone number"
              value={registrationForm.phoneNumber}
              onChange={(e) => setRegistrationForm({ ...registrationForm, phoneNumber: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="input-field"
              placeholder="Enter email address"
              value={registrationForm.email}
              onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Physical Address</label>
            <input
              className="input-field"
              placeholder="Enter physical address"
              value={registrationForm.address}
              onChange={(e) => setRegistrationForm({ ...registrationForm, address: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Next of Kin</label>
            <input
              className="input-field"
              placeholder="Enter next of kin details"
              value={registrationForm.nextOfKin}
              onChange={(e) => setRegistrationForm({ ...registrationForm, nextOfKin: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Biometric Data</label>
            <input
              className="input-field"
              placeholder="Fingerprint scan code"
              value={registrationForm.fingerprint}
              onChange={(e) => setRegistrationForm({ ...registrationForm, fingerprint: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '20px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '10px',
          padding: '15px',
          background: 'rgba(34, 139, 34, 0.1)',
          border: '1px solid rgba(34, 139, 34, 0.3)',
          borderRadius: '8px'
        }}>
          <input
            type="checkbox"
            id="requestBiometric"
            checked={registrationForm.requestBiometric}
            onChange={(e) => setRegistrationForm({ ...registrationForm, requestBiometric: e.target.checked })}
            style={{ transform: 'scale(1.2)' }}
          />
          <label htmlFor="requestBiometric" style={{ 
            color: '#ffffff', 
            fontSize: '1rem',
            cursor: 'pointer',
            userSelect: 'none'
          }}>
            Request Biometric Key (Enhanced Security)
          </label>
        </div>
        <p style={{ 
          fontSize: '0.85rem', 
          color: '#9ca3af', 
          marginTop: '8px',
          marginLeft: '5px'
        }}>
          A biometric key provides additional security for identity verification and can be used for secure access to government services.
        </p>
      </div>

      <div className="button-group">
        <button className="action-button" onClick={registerCitizen}>
          Register Citizen
        </button>
        <button className="action-button secondary-button" onClick={clearForm}>
          Clear Form
        </button>
      </div>
    </div>
  );
};

export default RegistrationForm;