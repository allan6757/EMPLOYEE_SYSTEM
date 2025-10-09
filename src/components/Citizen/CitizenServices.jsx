import React, { useState } from 'react';
import DigitalID from './DigitalID';
import DocumentTracker from './DocumentTracker';
import LostIDReporter from './LostIDReporter';

const CitizenServices = ({ 
  citizenForm, 
  setCitizenForm, 
  bookAppointment, 
  currentCitizen, 
  showDigitalID, 
  setShowDigitalID,
  documentProduction,
  lostReports,
  setLostReports,
  showPopup
}) => {
  const [activeTab, setActiveTab] = useState('appointments');

  if (showDigitalID && currentCitizen) {
    return (
      <div>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <button 
            className="action-button secondary-button"
            onClick={() => setShowDigitalID(false)}
          >
            Back to Services
          </button>
        </div>
        <DigitalID citizen={currentCitizen} />
      </div>
    );
  }
  return (
    <div>
      <div style={{
        display: 'flex',
        gap: '10px',
        marginBottom: '20px',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }}>
        <button 
          className={`action-button ${activeTab === 'appointments' ? '' : 'secondary-button'}`}
          onClick={() => setActiveTab('appointments')}
        >
          Book Appointment
        </button>
        <button 
          className={`action-button ${activeTab === 'tracker' ? '' : 'secondary-button'}`}
          onClick={() => setActiveTab('tracker')}
        >
          Track Document
        </button>
        <button 
          className={`action-button ${activeTab === 'lost' ? '' : 'secondary-button'}`}
          onClick={() => setActiveTab('lost')}
        >
          Report Lost ID
        </button>
      </div>

      {activeTab === 'appointments' && (
        <div className="section">
          <h3>Book Appointment</h3>
      <div className="form-group">
        <label className="form-label">Full Name *</label>
        <input
          className="input-field"
          placeholder="Enter your full name"
          value={citizenForm.name}
          onChange={(e) => setCitizenForm({ ...citizenForm, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Phone Number *</label>
        <input
          className="input-field"
          placeholder="Enter your phone number"
          value={citizenForm.phoneNumber}
          onChange={(e) => setCitizenForm({ ...citizenForm, phoneNumber: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">ID Number *</label>
        <input
          className="input-field"
          placeholder="Enter your ID number"
          value={citizenForm.idNumber}
          onChange={(e) => setCitizenForm({ ...citizenForm, idNumber: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Service Type</label>
        <select
          className="input-field"
          value={citizenForm.serviceType}
          onChange={(e) => setCitizenForm({ ...citizenForm, serviceType: e.target.value })}
        >
          <option value="new-id">New ID Application</option>
          <option value="replacement">ID Replacement</option>
          <option value="correction">ID Correction</option>
          <option value="duplicate">Duplicate Copy</option>
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Appointment Date</label>
        <input
          type="date"
          className="input-field"
          min={new Date().toISOString().split('T')[0]}
          value={citizenForm.appointmentDate}
          onChange={(e) => setCitizenForm({ ...citizenForm, appointmentDate: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Appointment Time</label>
        <input
          type="time"
          className="input-field"
          value={citizenForm.appointmentTime}
          onChange={(e) => setCitizenForm({ ...citizenForm, appointmentTime: e.target.value })}
        />
      </div>
          <button className="action-button" onClick={bookAppointment}>
            Book Appointment
          </button>
        </div>
      )}

      {activeTab === 'tracker' && (
        <DocumentTracker 
          citizen={currentCitizen}
          documentProduction={documentProduction}
          showPopup={showPopup}
        />
      )}

      {activeTab === 'lost' && (
        <LostIDReporter 
          citizen={currentCitizen}
          lostReports={lostReports}
          setLostReports={setLostReports}
          showPopup={showPopup}
        />
      )}
    </div>
  );
};

export default CitizenServices;