import React, { useState } from 'react';

const RegistrationForm = ({ 
  registrationForm, 
  setRegistrationForm, 
  registerCitizen, 
  citizenDatabase, 
  setCitizenDatabase, 
  showPopup 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [editingCitizen, setEditingCitizen] = useState(null);
  const [viewMode, setViewMode] = useState('register'); // 'register', 'search', 'edit'

  const clearForm = () => {
    setRegistrationForm({
      firstName: '', lastName: '', dateOfBirth: '', placeOfBirth: '',
      nationality: 'Kenyan', gender: '', phoneNumber: '', email: '',
      address: '', nextOfKin: '', fingerprint: '', photo: '', requestBiometric: false
    });
  };

  const searchCitizens = () => {
    return citizenDatabase.filter(citizen =>
      citizen.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citizen.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      citizen.idNumber.includes(searchQuery) ||
      citizen.phoneNumber.includes(searchQuery)
    );
  };

  const editCitizen = (citizen) => {
    setEditingCitizen(citizen);
    setRegistrationForm({
      firstName: citizen.firstName,
      lastName: citizen.lastName,
      dateOfBirth: citizen.dateOfBirth || '',
      placeOfBirth: citizen.placeOfBirth || '',
      nationality: citizen.nationality || 'Kenyan',
      gender: citizen.gender,
      phoneNumber: citizen.phoneNumber,
      email: citizen.email || '',
      address: citizen.address || '',
      nextOfKin: citizen.nextOfKin || '',
      fingerprint: citizen.fingerprint || '',
      photo: citizen.photo || '',
      requestBiometric: !!citizen.biometricKey
    });
    setViewMode('edit');
  };

  const updateCitizen = () => {
    const updatedCitizens = citizenDatabase.map(citizen =>
      citizen.id === editingCitizen.id
        ? { ...citizen, ...registrationForm, lastUpdated: new Date().toISOString() }
        : citizen
    );
    setCitizenDatabase(updatedCitizens);
    showPopup('Citizen record updated successfully', 'success');
    clearForm();
    setEditingCitizen(null);
    setViewMode('search');
  };

  const deleteCitizen = (citizenId) => {
    if (window.confirm('Are you sure you want to delete this citizen record?')) {
      const updatedCitizens = citizenDatabase.filter(citizen => citizen.id !== citizenId);
      setCitizenDatabase(updatedCitizens);
      showPopup('Citizen record deleted successfully', 'success');
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: 'center'
      }}>
        <button 
          className={`action-button ${viewMode === 'register' ? '' : 'secondary-button'}`}
          onClick={() => { setViewMode('register'); clearForm(); setEditingCitizen(null); }}
        >
          Register New
        </button>
        <button 
          className={`action-button ${viewMode === 'search' ? '' : 'secondary-button'}`}
          onClick={() => setViewMode('search')}
        >
          Search Records
        </button>
      </div>

      {viewMode === 'register' && (
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
            🔐 Request Biometric Key (Enhanced Security)
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
      )}

      {viewMode === 'search' && (
        <div className="section">
          <h3>Search Citizen Records</h3>
          <div className="form-group">
            <input
              className="input-field"
              placeholder="Search by name, ID number, or phone"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
            {searchCitizens().map(citizen => (
              <div key={citizen.id} className="queue-item" style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <strong>{citizen.firstName} {citizen.lastName}</strong><br />
                    ID: {citizen.idNumber}<br />
                    Phone: {citizen.phoneNumber}<br />
                    Status: {citizen.documentStatus || 'Registered'}<br />
                    {citizen.biometricKey && (
                      <span style={{ color: '#00ff00', fontSize: '0.85rem' }}>
                        🔐 Biometric: {citizen.biometricKey}
                      </span>
                    )}
                  </div>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <button 
                      className="action-button" 
                      style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                      onClick={() => editCitizen(citizen)}
                    >
                      Edit
                    </button>
                    <button 
                      className="action-button secondary-button" 
                      style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                      onClick={() => deleteCitizen(citizen.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {searchQuery && searchCitizens().length === 0 && (
              <p style={{ color: '#9ca3af', textAlign: 'center' }}>No records found</p>
            )}
          </div>
        </div>
      )}

      {viewMode === 'edit' && editingCitizen && (
        <div className="section">
          <h3>Edit Citizen Record - {editingCitizen.firstName} {editingCitizen.lastName}</h3>
          <div className="grid">
            <div>
              <div className="form-group">
                <label className="form-label">First Name *</label>
                <input
                  className="input-field"
                  value={registrationForm.firstName}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, firstName: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Last Name *</label>
                <input
                  className="input-field"
                  value={registrationForm.lastName}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, lastName: e.target.value })}
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
                  value={registrationForm.phoneNumber}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, phoneNumber: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="input-field"
                  value={registrationForm.email}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, email: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Physical Address</label>
                <input
                  className="input-field"
                  value={registrationForm.address}
                  onChange={(e) => setRegistrationForm({ ...registrationForm, address: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="button-group">
            <button className="action-button" onClick={updateCitizen}>
              Update Record
            </button>
            <button className="action-button secondary-button" onClick={() => { setViewMode('search'); clearForm(); setEditingCitizen(null); }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;