import React, { useState, useEffect } from 'react';

// Main App Component
const App = () => {
  // Global App ID for unique local storage key
  const appId = 'local-app-id';

  // State variables for the app
  const [employeeIdInput, setEmployeeIdInput] = useState('');
  const [viewMode, setViewMode] = useState('employee'); // 'employee' or 'employer'
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // No database, so no loading state is needed
  
  // State for employer password protection
  const [isPasswordPromptVisible, setIsPasswordPromptVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const EMPLOYER_PASSWORD = 'allan123'; // Hardcoded password for this simple demo

  // Effect to load data from local storage on initial render
  useEffect(() => {
    try {
      const storedRecords = JSON.parse(localStorage.getItem(`attendanceRecords_${appId}`));
      if (storedRecords) {
        setAttendanceRecords(storedRecords);
      }
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }, [appId]);

  // Effect to save data to local storage whenever attendanceRecords changes
  useEffect(() => {
    try {
      localStorage.setItem(`attendanceRecords_${appId}`, JSON.stringify(attendanceRecords));
    } catch (error) {
      console.error("Error saving to local storage:", error);
    }
  }, [attendanceRecords, appId]);

  // Helper function to format date
  const getFormattedDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  // Helper function to format time
  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Handle employee sign-in
  const handleSignIn = () => {
    if (!employeeIdInput) {
      setMessage("Please enter your Employee ID.");
      return;
    }

    const today = getFormattedDate();
    const recordExists = attendanceRecords.find(rec => rec.employeeId === employeeIdInput && rec.date === today);

    if (recordExists && recordExists.signInTime) {
      setMessage(`Employee ID: ${employeeIdInput} has already signed in today.`);
      return;
    }

    const newRecord = {
      employeeId: employeeIdInput,
      date: today,
      signInTime: getFormattedTime(),
      signOutTime: null,
      status: 'signed-in',
    };
    
    // Create a new array and add the new record
    const updatedRecords = recordExists 
      ? attendanceRecords.map(rec => rec.employeeId === employeeIdInput && rec.date === today ? { ...rec, ...newRecord } : rec)
      : [...attendanceRecords, newRecord];
    
    // Sort records by date in descending order
    updatedRecords.sort((a, b) => new Date(b.date) - new Date(a.date));

    setAttendanceRecords(updatedRecords);
    setMessage(`Signed in successfully as Employee ID: ${employeeIdInput}`);
  };

  // Handle employee sign-out
  const handleSignOut = () => {
    if (!employeeIdInput) {
      setMessage("Please enter your Employee ID.");
      return;
    }

    const today = getFormattedDate();
    const recordIndex = attendanceRecords.findIndex(rec => rec.employeeId === employeeIdInput && rec.date === today);

    if (recordIndex === -1) {
      setMessage(`No sign-in record found for Employee ID: ${employeeIdInput} today. Please sign in first.`);
      return;
    }
    
    const updatedRecords = [...attendanceRecords];
    updatedRecords[recordIndex] = {
      ...updatedRecords[recordIndex],
      signOutTime: getFormattedTime(),
      status: 'present',
    };

    setAttendanceRecords(updatedRecords);
    setMessage(`Signed out successfully as Employee ID: ${employeeIdInput}`);
  };

  // Handle marking an employee as absent
  const handleMarkAbsent = (employeeId, date) => {
    const recordIndex = attendanceRecords.findIndex(rec => rec.employeeId === employeeId && rec.date === date);
    
    if (recordIndex !== -1) {
      const updatedRecords = [...attendanceRecords];
      updatedRecords[recordIndex] = {
        ...updatedRecords[recordIndex],
        signInTime: null,
        signOutTime: null,
        status: 'absent',
      };
      setAttendanceRecords(updatedRecords);
      setMessage(`Marked Employee ID: ${employeeId} as absent on ${date}.`);
    } else {
      // Create a new record if it doesn't exist
      const newRecord = {
        employeeId,
        date,
        signInTime: null,
        signOutTime: null,
        status: 'absent',
      };
      const updatedRecords = [...attendanceRecords, newRecord];
      updatedRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
      setAttendanceRecords(updatedRecords);
      setMessage(`Marked Employee ID: ${employeeId} as absent on ${date}.`);
    }
  };
  
  // Handle employer login
  const handleEmployerLogin = () => {
    if (passwordInput === EMPLOYER_PASSWORD) {
      setViewMode('employer');
      setIsPasswordPromptVisible(false);
      setMessage('');
    } else {
      setMessage('Incorrect password. Please try again.');
    }
  };

  // Render loading state if Firebase is still initializing
  if (loading) {
    return (
      <div className="app-container flex-center">
        <div className="text-center">
          <p className="loading-text">Initializing App...</p>
          <p className="loading-subtext">Connecting to database.</p>
        </div>
      </div>
    );
  }

  // Main UI
  return (
    <div className="app-container">
      <style>
        {`
          .app-container {
            min-height: 100vh;
            background-color: #171717;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 1rem;
            font-family: sans-serif;
            color: #d4d4d4;
            max-width: 100vw;
          }
          .main-card {
            background-color: #262626;
            border-radius: 0.5rem;
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            padding: 2rem;
            width: calc(100% - 2rem);
            max-width: 64rem;
          }
          .main-card > div:not(:last-child) {
            margin-bottom: 2rem;
          }
          .text-center {
            text-align: center;
          }
          .app-title {
            font-size: 2.25rem;
            font-weight: 800;
            color: #dc2626;
          }
          .app-subtitle {
            font-size: 1.125rem;
            color: #a3a3a3;
            margin-top: 0.5rem;
          }
          .view-switcher {
            display: flex;
            justify-content: center;
            gap: 1rem;
          }
          .tab-button {
            padding: 0.75rem 1.5rem;
            border-radius: 9999px;
            font-size: 1.125rem;
            font-weight: 500;
            transition: all 0.3s ease-in-out;
            cursor: pointer;
            border: none;
            outline: none;
          }
          .tab-button.active {
            background-color: #dc2626;
            color: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          }
          .tab-button.inactive {
            background-color: #404040;
            color: #d4d4d4;
          }
          .tab-button:hover.inactive {
            background-color: #525252;
          }
          .input-field {
            flex: 1;
            width: 100%;
            padding: 0.75rem 1.25rem;
            border: 1px solid #404040;
            background-color: #262626;
            color: white;
            border-radius: 9999px;
            outline: none;
            transition: border-color 0.3s, box-shadow 0.3s;
          }
          .input-field:focus {
            border-color: #dc2626;
            box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.5);
          }
          .action-button {
            width: 100%;
            padding: 0.75rem 1.5rem;
            font-weight: 600;
            color: white;
            border-radius: 9999px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            transition: background-color 0.3s;
            border: none;
            cursor: pointer;
          }
          .sign-in-button {
            background-color: #16a34a;
          }
          .sign-in-button:hover {
            background-color: #15803d;
          }
          .sign-out-button {
            background-color: #dc2626;
          }
          .sign-out-button:hover {
            background-color: #b91c1c;
          }
          .message-box {
            text-align: center;
            font-size: 1.125rem;
            font-weight: 500;
            padding: 0.75rem;
            background-color: #404040;
            border-radius: 0.5rem;
          }
          .error-message {
            background-color: #991b1b;
            color: white;
          }
          .section-title {
            font-size: 1.5rem;
            font-weight: 700;
            text-align: center;
          }
          .records-container {
            overflow-x: auto;
            background-color: #404040;
            border-radius: 0.5rem;
            box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
          }
          table {
            min-width: 100%;
            border-collapse: collapse;
          }
          thead th {
            padding: 0.75rem 1.5rem;
            text-align: left;
            font-size: 0.75rem;
            font-weight: 700;
            color: #a3a3a3;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background-color: #525252;
          }
          tbody td {
            padding: 1rem 1.5rem;
            white-space: nowrap;
            font-size: 0.875rem;
            color: #d4d4d4;
            border-top: 1px solid #404040;
          }
          .status-badge {
            display: inline-flex;
            padding: 0.25rem 0.5rem;
            font-size: 0.75rem;
            line-height: 1.25rem;
            font-weight: 600;
            border-radius: 9999px;
            color: white;
          }
          .status-present {
            background-color: #16a34a;
          }
          .status-signed-in {
            background-color: #f59e0b;
          }
          .status-absent {
            background-color: #dc2626;
          }
          .action-link {
            font-weight: 600;
            color: #ef4444;
            cursor: pointer;
          }
          .action-link:hover {
            color: #fca5a5;
          }
        `}
      </style>
      <div className="app-container">
        <div className="main-card">
          <div className="text-center">
            <h1 className="app-title">INtake solutions</h1>
            <p className="app-subtitle">App ID: {appId}</p>
          </div>
  
          {/* View Switcher */}
          <div className="view-switcher">
            <button
              onClick={() => {
                setViewMode('employee');
                setIsPasswordPromptVisible(false);
                setMessage('');
              }}
              className={`tab-button ${viewMode === 'employee' ? 'active' : 'inactive'}`}
            >
              Employee View
            </button>
            <button
              onClick={() => setIsPasswordPromptVisible(true)}
              className={`tab-button ${isPasswordPromptVisible || viewMode === 'employer' ? 'active' : 'inactive'}`}
            >
              Employer View
            </button>
          </div>
          
          {/* Password Prompt */}
          {isPasswordPromptVisible && viewMode === 'employee' && (
            <div className="space-y-4 text-center">
              <h2 className="section-title">Enter Employer Password</h2>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="password"
                  placeholder="Password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  onKeyPress={(e) => { if (e.key === 'Enter') handleEmployerLogin(); }}
                  className="input-field flex-1"
                />
                <button
                  onClick={handleEmployerLogin}
                  className="action-button sign-in-button"
                >
                  Go
                </button>
              </div>
              {message && (
                <p className="message-box error-message">{message}</p>
              )}
            </div>
          )}
  
          {/* Employee View */}
          {viewMode === 'employee' && !isPasswordPromptVisible && (
            <div className="space-y-6">
              <h2 className="section-title">Employee Sign In / Out</h2>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <input
                  type="text"
                  placeholder="Enter Employee ID"
                  value={employeeIdInput}
                  onChange={(e) => setEmployeeIdInput(e.target.value)}
                  className="input-field flex-1"
                />
                <button
                  onClick={handleSignIn}
                  className="action-button sign-in-button"
                >
                  Sign In
                </button>
                <button
                  onClick={handleSignOut}
                  className="action-button sign-out-button"
                >
                  Sign Out
                </button>
              </div>
              {message && (
                <p className="message-box">{message}</p>
              )}
            </div>
          )}
  
          {/* Employer View */}
          {viewMode === 'employer' && (
            <div className="space-y-6">
              <h2 className="section-title">Attendance Records</h2>
              <p className="app-subtitle">
                Note: The hardcoded password for this demo is 'password123'.
              </p>
              <div className="records-container">
                <table>
                  <thead>
                    <tr>
                      <th>Employee ID</th>
                      <th>Date</th>
                      <th>Time In</th>
                      <th>Time Out</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceRecords.map((record, index) => (
                      <tr key={index}>
                        <td>{record.employeeId}</td>
                        <td>{record.date}</td>
                        <td>{record.signInTime || '—'}</td>
                        <td>{record.signOutTime || '—'}</td>
                        <td>
                          <span className={`status-badge ${
                            record.status === 'present' ? 'status-present' :
                            record.status === 'signed-in' ? 'status-signed-in' :
                            'status-absent'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => handleMarkAbsent(record.employeeId, record.date)}
                            className="action-link"
                          >
                            Mark Absent
                          </button>
                        </td>
                      </tr>
                    ))}
                    {attendanceRecords.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center' }}>
                          No attendance records found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
  
export default App;