import React from 'react';
import ChatModal from '../Layout/ChatModal';
import TopNavigation from '../Layout/TopNavigation';

const EmployeeDashboard = ({ 
  currentUser, 
  appointments, 
  serviceRecords, 
  showChat, 
  setShowChat, 
  chats, 
  newMessage, 
  setNewMessage, 
  sendMessage, 
  markAppointmentDone, 
  updateAppointmentNotes, 
  logout, 
  getFormattedDate,
  onBackToServices,
  citizenDatabase,
  biometricSearch,
  setBiometricSearch,
  biometricResults,
  searchBiometric,
  showBiometricSearch,
  setShowBiometricSearch
}) => {
  return (
    <div>
      <TopNavigation 
        currentUser={currentUser}
        showChat={showChat}
        setShowChat={setShowChat}
        logout={logout}
        onBackToServices={onBackToServices}
      />

      <div className="grid">
        <div className="section">
          <h3>All Appointments</h3>
          {appointments
            .filter(apt => apt.assignedBooth === currentUser.boothId)
            .map(appointment => (
              <div key={appointment.id} className="queue-item">
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <strong>{appointment.name}</strong><br />
                      Service: {appointment.serviceType}<br />
                      Phone: {appointment.phoneNumber}<br />
                      ID: {appointment.idNumber}<br />
                      Date: {appointment.appointmentDate}<br />
                      Time: {appointment.appointmentTime}<br />
                      Status: <span className={`status-${appointment.status}`}>{appointment.status}</span>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        checked={appointment.status === 'completed'}
                        onChange={() => markAppointmentDone(appointment.id)}
                        style={{ transform: 'scale(1.5)', marginLeft: '10px' }}
                      />
                      <label style={{ marginLeft: '5px', fontSize: '0.9rem' }}>Done</label>
                    </div>
                  </div>
                  <div style={{ marginTop: '10px' }}>
                    <textarea
                      placeholder="Add notes for follow-up..."
                      value={appointment.notes || ''}
                      onChange={(e) => updateAppointmentNotes(appointment.id, e.target.value)}
                      style={{
                        width: '100%',
                        minHeight: '60px',
                        padding: '8px',
                        borderRadius: '8px',
                        border: '1px solid rgba(55, 55, 55, 0.5)',
                        background: 'rgba(31, 31, 31, 0.8)',
                        color: '#ffffff',
                        fontSize: '0.9rem',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          {appointments.filter(apt => apt.assignedBooth === currentUser.boothId).length === 0 && (
            <p style={{ color: '#9ca3af' }}>No appointments</p>
          )}
        </div>

        <div className="section">
          <h3>Biometric Key Lookup</h3>
          <div className="form-group">
            <label className="form-label">Search Citizen Biometric Key</label>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <input
                className="input-field"
                placeholder="Enter ID number or citizen name"
                value={biometricSearch}
                onChange={(e) => {
                  setBiometricSearch(e.target.value);
                  if (e.target.value.length >= 2) {
                    const results = citizenDatabase.filter(citizen => 
                      citizen.idNumber.includes(e.target.value) ||
                      citizen.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                      citizen.lastName.toLowerCase().includes(e.target.value.toLowerCase())
                    );
                    setBiometricResults ? setBiometricResults(results) : null;
                  } else {
                    setBiometricResults ? setBiometricResults([]) : null;
                  }
                }}
                style={{ flex: 1 }}
              />
              <button 
                className="action-button"
                onClick={() => {
                  const results = citizenDatabase.filter(citizen => 
                    citizen.idNumber.includes(biometricSearch) ||
                    citizen.firstName.toLowerCase().includes(biometricSearch.toLowerCase()) ||
                    citizen.lastName.toLowerCase().includes(biometricSearch.toLowerCase())
                  );
                  setBiometricResults ? setBiometricResults(results) : null;
                }}
                style={{ padding: '8px 16px', fontSize: '0.9rem' }}
              >
                🔍
              </button>
            </div>
          </div>
          
          {biometricResults && biometricResults.length > 0 && (
            <div style={{ marginTop: '15px', maxHeight: '200px', overflowY: 'auto' }}>
              {biometricResults.slice(0, 3).map(citizen => (
                <div key={citizen.id} style={{
                  background: 'rgba(34, 139, 34, 0.1)',
                  border: '1px solid rgba(34, 139, 34, 0.3)',
                  borderRadius: '8px',
                  padding: '10px',
                  marginBottom: '8px',
                  fontSize: '0.9rem'
                }}>
                  <strong>{citizen.firstName} {citizen.lastName}</strong> (ID: {citizen.idNumber})<br/>
                  {citizen.biometricKey ? (
                    <code style={{ 
                      background: 'rgba(0,0,0,0.3)', 
                      padding: '2px 6px', 
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      color: '#00ff00'
                    }}>
                      {citizen.biometricKey}
                    </code>
                  ) : (
                    <span style={{ color: '#ff6b6b' }}>No Biometric Key</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section">
          <h3>Today's Services</h3>
          <div className="stat-card">
            <div className="stat-number">
              {appointments.filter(apt => apt.assignedBooth === currentUser.boothId && apt.status === 'completed').length + 
               serviceRecords.filter(s => s.employeeId === currentUser.id && s.date === getFormattedDate()).length}
            </div>
            <div className="stat-label">Services Completed</div>
          </div>

          {appointments
            .filter(apt => apt.assignedBooth === currentUser.boothId && apt.status === 'completed')
            .map(appointment => (
              <div key={appointment.id} className="queue-item">
                {appointment.name} - {appointment.serviceType} ({appointment.completedTime})
              </div>
            ))}

          {serviceRecords
            .filter(s => s.employeeId === currentUser.id && s.date === getFormattedDate())
            .slice(0, 5)
            .map(service => (
              <div key={service.id} className="queue-item">
                {service.citizenName} - {service.serviceType} ({service.completedTime})
              </div>
            ))}
        </div>
      </div>

      {showChat && (
        <ChatModal
          showChat={showChat}
          setShowChat={setShowChat}
          chats={chats.filter(chat => chat.boothId === currentUser.boothId || chat.replyTo)}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          title="Chat with Admin"
        />
      )}
    </div>
  );
};

export default EmployeeDashboard;