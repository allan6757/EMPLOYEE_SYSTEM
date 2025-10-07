import React, { useState } from 'react';

const LostIDReporter = ({ citizen, lostReports, setLostReports, showPopup }) => {
  const [reportForm, setReportForm] = useState({
    lostDate: '',
    lostLocation: '',
    circumstances: '',
    policeReport: '',
    contactMethod: 'phone'
  });

  const submitLostReport = () => {
    if (!reportForm.lostDate || !reportForm.lostLocation || !reportForm.circumstances) {
      showPopup('Please fill all required fields', 'error');
      return;
    }

    const report = {
      id: Date.now(),
      citizenId: citizen.id,
      citizenName: `${citizen.firstName} ${citizen.lastName}`,
      idNumber: citizen.idNumber,
      phoneNumber: citizen.phoneNumber,
      ...reportForm,
      reportDate: new Date().toISOString().split('T')[0],
      status: 'reported',
      replacementStatus: 'pending'
    };

    setLostReports([report, ...lostReports]);
    setReportForm({
      lostDate: '',
      lostLocation: '',
      circumstances: '',
      policeReport: '',
      contactMethod: 'phone'
    });
    showPopup('Lost ID reported successfully. Replacement process initiated.', 'success');
  };

  const userReports = lostReports.filter(report => report.citizenId === citizen.id);

  return (
    <div className="section">
      <h3>Lost ID Reporter</h3>
      
      {userReports.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h4>Your Reports</h4>
          {userReports.map(report => (
            <div key={report.id} className="queue-item" style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justify: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Report #{report.id.toString().slice(-6)}</strong>
                  <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                    Lost on: {report.lostDate} at {report.lostLocation}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                    Status: {report.replacementStatus.toUpperCase()}
                  </div>
                </div>
                <div style={{
                  padding: '4px 8px',
                  borderRadius: '6px',
                  background: report.status === 'reported' ? '#f59e0b' : '#10b981',
                  color: '#ffffff',
                  fontSize: '0.8rem'
                }}>
                  {report.status.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="grid">
        <div>
          <div className="form-group">
            <label className="form-label">Date Lost *</label>
            <input
              type="date"
              className="input-field"
              value={reportForm.lostDate}
              onChange={(e) => setReportForm({ ...reportForm, lostDate: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Location Lost *</label>
            <input
              className="input-field"
              placeholder="Where did you lose your ID?"
              value={reportForm.lostLocation}
              onChange={(e) => setReportForm({ ...reportForm, lostLocation: e.target.value })}
            />
          </div>
        </div>
        <div>
          <div className="form-group">
            <label className="form-label">Police Report Number</label>
            <input
              className="input-field"
              placeholder="OB number (if reported to police)"
              value={reportForm.policeReport}
              onChange={(e) => setReportForm({ ...reportForm, policeReport: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Preferred Contact</label>
            <select
              className="input-field"
              value={reportForm.contactMethod}
              onChange={(e) => setReportForm({ ...reportForm, contactMethod: e.target.value })}
            >
              <option value="phone">Phone Call</option>
              <option value="sms">SMS</option>
              <option value="email">Email</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="form-group">
        <label className="form-label">Circumstances *</label>
        <textarea
          className="input-field"
          placeholder="Describe how you lost your ID"
          value={reportForm.circumstances}
          onChange={(e) => setReportForm({ ...reportForm, circumstances: e.target.value })}
          style={{ minHeight: '80px', resize: 'vertical' }}
        />
      </div>

      <button className="action-button" onClick={submitLostReport}>
        Report Lost ID
      </button>
    </div>
  );
};

export default LostIDReporter;