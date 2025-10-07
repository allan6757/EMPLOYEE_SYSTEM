import React from 'react';
import ChatModal from '../Layout/ChatModal';
import TopNavigation from '../Layout/TopNavigation';

const AdminDashboard = ({ 
  booths, 
  employees, 
  citizenQueue, 
  serviceRecords, 
  activeBooths, 
  currentServing,
  newBooth, 
  setNewBooth, 
  addBooth,
  newEmployee, 
  setNewEmployee, 
  addEmployee,
  showChat, 
  setShowChat, 
  chats, 
  replyToMessage,
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
  const adminUser = { name: 'Admin', booth: { name: 'Control Panel' } };
  
  return (
    <div>
      <TopNavigation 
        currentUser={adminUser}
        showChat={showChat}
        setShowChat={setShowChat}
        logout={logout}
        onBackToServices={onBackToServices}
      />

      <div className="grid">
        <div className="section">
          <h3>Add New Booth</h3>
          <div className="form-group">
            <label className="form-label">Booth ID</label>
            <input
              className="input-field"
              placeholder="e.g., B001"
              value={newBooth.id}
              onChange={(e) => setNewBooth({ ...newBooth, id: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Booth Name</label>
            <input
              className="input-field"
              placeholder="e.g., ID Verification Booth 1"
              value={newBooth.name}
              onChange={(e) => setNewBooth({ ...newBooth, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Service Type</label>
            <select
              className="input-field"
              value={newBooth.serviceType}
              onChange={(e) => setNewBooth({ ...newBooth, serviceType: e.target.value })}
            >
              <option value="new-id">New ID Application</option>
              <option value="replacement">ID Replacement</option>
              <option value="correction">ID Correction</option>
              <option value="duplicate">Duplicate Copy</option>
            </select>
          </div>
          <button className="action-button" onClick={addBooth}>
            Add Booth
          </button>
        </div>

        <div className="section">
          <h3>Add Employee</h3>
          <div className="form-group">
            <label className="form-label">Employee ID</label>
            <input
              className="input-field"
              placeholder="e.g., EMP001"
              value={newEmployee.id}
              onChange={(e) => setNewEmployee({ ...newEmployee, id: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
              className="input-field"
              placeholder="Employee full name"
              value={newEmployee.name}
              onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="input-field"
              placeholder="Employee password"
              value={newEmployee.password}
              onChange={(e) => setNewEmployee({ ...newEmployee, password: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Assign to Booth</label>
            <select
              className="input-field"
              value={newEmployee.boothId}
              onChange={(e) => setNewEmployee({ ...newEmployee, boothId: e.target.value })}
            >
              <option value="">Select Booth</option>
              {booths.map(booth => (
                <option key={booth.id} value={booth.id}>
                  {booth.name} ({booth.id})
                </option>
              ))}
            </select>
          </div>
          <button className="action-button" onClick={addEmployee}>
            Add Employee
          </button>
        </div>

        <div className="section">
          <h3>Booth Activities</h3>
          {booths.map(booth => {
            const boothQueue = citizenQueue.filter(c => c.assignedBooth === booth.id);
            const boothEmployee = employees.find(e => e.boothId === booth.id);
            const todayServices = serviceRecords.filter(s => s.boothId === booth.id && s.date === getFormattedDate());
            const isActive = activeBooths.has(booth.id);

            return (
              <div key={booth.id} className="booth-card" style={{
                border: `2px solid ${isActive ? '#228b22' : '#dc2626'}`,
                background: isActive ? 'rgba(34, 139, 34, 0.1)' : 'rgba(220, 38, 38, 0.1)',
                boxShadow: isActive ? 
                  '0 0 20px rgba(34, 139, 34, 0.5), 0 0 40px rgba(34, 139, 34, 0.3)' : 
                  '0 0 20px rgba(220, 38, 38, 0.5), 0 0 40px rgba(220, 38, 38, 0.3)'
              }}>
                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: isActive ? '#228b22' : '#dc2626',
                    boxShadow: isActive ? '0 0 10px #228b22' : '0 0 10px #dc2626'
                  }}></div>
                  <strong>{booth.name}</strong>
                  {isActive && (
                    <span style={{color: '#228b22', fontWeight: 'bold'}}>
                      ACTIVE
                    </span>
                  )}
                </div>
                Employee: {boothEmployee?.name || 'Not Assigned'}<br />
                Password: {boothEmployee?.password || 'N/A'}<br />
                Queue: {boothQueue.length} citizens<br />
                Today's Services: {todayServices.length}<br />
                {currentServing[booth.id] && (
                  <span className="status-being-served">
                    Currently Serving: {currentServing[booth.id].name}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        <div className="section">
          <h3>Biometric Key Search</h3>
          <div className="form-group">
            <label className="form-label">Search by ID Number or Name</label>
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
                🔍 Search
              </button>
            </div>
          </div>
          
          {biometricResults && biometricResults.length > 0 && (
            <div style={{ marginTop: '15px' }}>
              <h4 style={{ color: '#ffffff', marginBottom: '10px' }}>Search Results:</h4>
              <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                {biometricResults.map(citizen => (
                  <div key={citizen.id} style={{
                    background: 'rgba(34, 139, 34, 0.1)',
                    border: '1px solid rgba(34, 139, 34, 0.3)',
                    borderRadius: '8px',
                    padding: '12px',
                    marginBottom: '8px',
                    color: '#ffffff'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <div>
                        <strong>{citizen.firstName} {citizen.lastName}</strong><br/>
                        <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>ID: {citizen.idNumber}</span><br/>
                        <span style={{ fontSize: '0.9rem', opacity: 0.8 }}>Phone: {citizen.phoneNumber}</span>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        {citizen.biometricKey ? (
                          <div>
                            <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>Biometric Key:</span><br/>
                            <code style={{ 
                              background: 'rgba(0,0,0,0.3)', 
                              padding: '4px 8px', 
                              borderRadius: '4px',
                              fontSize: '0.85rem',
                              color: '#00ff00'
                            }}>
                              {citizen.biometricKey}
                            </code>
                          </div>
                        ) : (
                          <span style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>No Biometric Key</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {biometricSearch && biometricResults && biometricResults.length === 0 && (
            <div style={{ 
              marginTop: '15px', 
              padding: '12px', 
              background: 'rgba(255, 107, 107, 0.1)',
              border: '1px solid rgba(255, 107, 107, 0.3)',
              borderRadius: '8px',
              color: '#ff6b6b',
              textAlign: 'center'
            }}>
              No citizens found matching your search.
            </div>
          )}
        </div>

        <div className="section">
          <h3>System Overview</h3>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{booths.length}</div>
              <div className="stat-label">Total Booths</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{employees.length}</div>
              <div className="stat-label">Total Employees</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{citizenQueue.length}</div>
              <div className="stat-label">Current Queue</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{serviceRecords.filter(s => s.date === getFormattedDate()).length}</div>
              <div className="stat-label">Today's Services</div>
            </div>
          </div>
        </div>
      </div>

      {showChat && (
        <ChatModal
          showChat={showChat}
          setShowChat={setShowChat}
          chats={chats}
          title="Employee Messages"
          replyToMessage={replyToMessage}
        />
      )}
    </div>
  );
};

export default AdminDashboard;