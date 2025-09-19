import React, { useState, useEffect } from 'react';

// Modern, clean, mildly futuristic UI + Suggestion Box feature
const App = () => {
  const appId = 'local-app-id';

  // State for attendance
  const [employeeIdInput, setEmployeeIdInput] = useState('');
  const [employeeNameInput, setEmployeeNameInput] = useState('');
  const [viewMode, setViewMode] = useState('employee');
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [message, setMessage] = useState('');

  // State for employer password protection
  const [isPasswordPromptVisible, setIsPasswordPromptVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const EMPLOYER_PASSWORD = 'allan123';

  // Suggestion Box state
  const [suggestionInput, setSuggestionInput] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    try {
      const storedRecords = JSON.parse(localStorage.getItem(`attendanceRecords_${appId}`));
      if (storedRecords) setAttendanceRecords(storedRecords);
      const storedSuggestions = JSON.parse(localStorage.getItem(`suggestions_${appId}`));
      if (storedSuggestions) setSuggestions(storedSuggestions);
    } catch (error) {
      console.error("Error loading from local storage:", error);
    }
  }, [appId]);

  useEffect(() => {
    try {
      localStorage.setItem(`attendanceRecords_${appId}`, JSON.stringify(attendanceRecords));
    } catch (error) {
      console.error("Error saving attendance to local storage:", error);
    }
  }, [attendanceRecords, appId]);

  useEffect(() => {
    try {
      localStorage.setItem(`suggestions_${appId}`, JSON.stringify(suggestions));
    } catch (error) {
      console.error("Error saving suggestions to local storage:", error);
    }
  }, [suggestions, appId]);

  // Helper functions
  const getFormattedDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getFormattedTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  // Attendance handlers
  const handleSignIn = () => {
    if (!employeeIdInput || !employeeNameInput) {
      setMessage("Please enter both your Employee ID and Name.");
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
      employeeName: employeeNameInput,
      date: today,
      signInTime: getFormattedTime(),
      signOutTime: null,
      status: 'signed-in',
    };

    const updatedRecords = recordExists
      ? attendanceRecords.map(rec => rec.employeeId === employeeIdInput && rec.date === today ? { ...rec, ...newRecord } : rec)
      : [...attendanceRecords, newRecord];

    updatedRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
    setAttendanceRecords(updatedRecords);
    setMessage(`Signed in successfully as ${employeeNameInput} (ID: ${employeeIdInput})`);
  };

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
      const newRecord = {
        employeeId,
        employeeName: '',
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

  const handleEmployerLogin = () => {
    if (passwordInput === EMPLOYER_PASSWORD) {
      setViewMode('employer');
      setIsPasswordPromptVisible(false);
      setMessage('');
    } else {
      setMessage('Incorrect password. Please try again.');
    }
  };

  // Print attendance records
  const handlePrintRecords = () => {
    window.print();
  };

  // Suggestion Box handlers
  const handleSuggestionSubmit = () => {
    if (!suggestionInput.trim()) {
      setMessage("Please enter a suggestion before submitting.");
      return;
    }
    const newSuggestion = {
      text: suggestionInput,
      date: getFormattedDate(),
      time: getFormattedTime(),
    };
    setSuggestions([...suggestions, newSuggestion]);
    setSuggestionInput('');
    setMessage("Suggestion submitted! Thank you for your feedback.");
    setTimeout(() => setMessage(''), 2500);
  };

  // Styling: mild black & red futuristic UI
  return (
    <div className="app-container">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Orbitron:wght@700&display=swap');
        body, .app-container {
          background: #101014;
          min-height: 100vh;
          font-family: 'Orbitron', 'Share Tech Mono', Arial, sans-serif;
          color: #fff;
          margin: 0;
          padding: 0;
        }
        .main-card {
          background: rgba(25,25,28,0.80);
          border-radius: 1.3rem;
          box-shadow: 0 0 30px #dc2626cc, 0 4px 18px #000a;
          padding: 2rem 1.3rem 1.7rem 1.3rem;
          max-width: 700px;
          margin: 3rem auto;
          border: 1.5px solid #dc2626;
        }
        .app-title {
          font-size: 2.2rem;
          font-family: 'Orbitron', 'Share Tech Mono', monospace;
          font-weight: 700;
          color: #dc2626;
          margin-bottom: 0.3rem;
          letter-spacing: 2px;
          text-shadow: 0 0 20px #dc2626bb, 0 0 3px #fff3;
        }
        .app-subtitle {
          font-size: 1rem;
          color: #fff;
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        .view-switcher {
          display: flex;
          gap: 1.1rem;
          justify-content: center;
          margin-bottom: 2.1rem;
        }
        .tab-button {
          padding: 0.7rem 2rem;
          border-radius: 9999px;
          font-size: 1.07rem;
          font-family: 'Orbitron', 'Share Tech Mono', monospace;
          font-weight: 700;
          letter-spacing: 1px;
          border: none;
          cursor: pointer;
          background: #19191c;
          color: #dc2626;
          box-shadow: 0 0 8px #dc262650;
          transition: background 0.18s, color 0.18s;
        }
        .tab-button.active {
          background: #dc2626;
          color: #fff;
          box-shadow: 0 0 18px #dc2626, 0 2px 8px #000a;
        }
        .tab-button.inactive:hover {
          background: #311414;
          color: #fff;
        }
        .input-field {
          padding: 0.7rem 1.1rem;
          border-radius: 9999px;
          border: 1.5px solid #dc2626;
          background: #19191c;
          color: #dc2626;
          font-size: 1rem;
          font-family: 'Share Tech Mono', monospace;
          margin-bottom: 0.7rem;
          margin-right: 0.5rem;
          outline: none;
          box-shadow: 0 0 5px #dc2626bb;
          transition: border-color 0.2s, background 0.2s, color 0.2s;
        }
        .input-field:focus {
          border-color: #fff;
          background: #262626;
          color: #fff;
        }
        .action-button {
          padding: 0.8rem 1.6rem;
          font-weight: 700;
          color: #fff;
          border-radius: 9999px;
          background: linear-gradient(90deg,#dc2626 60%, #a10000 100%);
          border: none;
          cursor: pointer;
          margin-right: 0.5rem;
          font-family: 'Orbitron', Arial, sans-serif;
          letter-spacing: 1px;
          font-size: 1.03rem;
          box-shadow: 0 0 14px #dc2626bb;
          transition: background 0.2s, color 0.2s;
        }
        .action-button:hover {
          background: linear-gradient(90deg,#fff 20%, #dc2626 100%);
          color: #dc2626;
        }
        .sign-in-button {
          background: linear-gradient(90deg,#dc2626 70%, #a10000 100%);
        }
        .sign-out-button {
          background: linear-gradient(90deg,#000 20%, #dc2626 100%);
        }
        .sign-out-button:hover {
          background: linear-gradient(90deg,#dc2626 70%, #fff 100%);
          color: #000;
        }
        .message-box {
          text-align: center;
          font-size: 1.07rem;
          font-weight: 500;
          margin: 1rem 0;
          padding: 0.7rem;
          border-radius: 0.5rem;
          background: rgba(220,38,38,0.14);
          color: #fff;
          box-shadow: 0 0 10px #dc2626a0;
          border: 1px solid #dc2626;
          letter-spacing: 1px;
        }
        .error-message {
          background: rgba(220,38,38,0.38);
          color: #fff;
        }
        .section-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          text-align: center;
          color: #dc2626;
          letter-spacing: 1.2px;
          text-shadow: 0 0 13px #dc2626bb;
        }
        .records-container {
          overflow-x: auto;
          background: rgba(0,0,0,0.7);
          border-radius: 0.8rem;
          margin-top: 1rem;
          box-shadow: 0 2px 14px #dc2626bb;
        }
        table {
          min-width: 100%;
          border-collapse: collapse;
          background: rgba(20,20,20,0.96);
          color: #fff;
          border-radius: 0.5rem;
          font-family: 'Share Tech Mono', 'Orbitron', monospace;
        }
        thead th {
          padding: 0.8rem 1.1rem;
          text-align: left;
          font-size: 0.95rem;
          font-weight: 700;
          background: #dc2626;
          color: #fff;
          text-transform: uppercase;
          border-bottom: 2px solid #fff2;
          letter-spacing: 1px;
        }
        tbody td {
          padding: 0.8rem 1.1rem;
          font-size: 1rem;
          color: #fff;
          border-top: 1px solid #dc2626;
          background: rgba(0,0,0,0.6);
        }
        tbody tr:hover td {
          background: #dc2626aa;
          transition: background 0.2s;
        }
        .status-badge {
          display: inline-block;
          padding: 0.3rem 0.7rem;
          font-size: 0.95rem;
          border-radius: 9999px;
          font-weight: 700;
          color: #fff;
          letter-spacing: 1px;
          box-shadow: 0 0 8px #dc2626bb;
          border: 1.2px solid #fff;
          background: #dc2626;
        }
        .status-present { background: #dc2626; }
        .status-signed-in { background: #a10000; }
        .status-absent {
          background: #19191c;
          color: #dc2626;
          border: 1.2px solid #dc2626;
        }
        .action-link {
          font-weight: 600;
          color: #fff;
          background: #dc2626;
          border: none;
          cursor: pointer;
          padding: 0.3rem 0.8rem;
          border-radius: 9999px;
          font-family: 'Orbitron', Arial, sans-serif;
          font-size: 0.98rem;
          transition: background 0.15s, color 0.15s;
          box-shadow: 0 0 10px #dc2626bb;
        }
        .action-link:hover {
          background: #fff;
          color: #dc2626;
        }
        .suggestion-box {
          background: rgba(220,38,38,0.05);
          border-radius: 0.8rem;
          box-shadow: 0 0 8px #dc262650;
          border: 1px solid #dc2626;
          padding: 1.2rem 1rem;
          margin-top: 2rem;
        }
        .suggestion-title {
          font-size: 1.1rem;
          font-weight: 700;
          color: #dc2626;
          margin-bottom: 0.8rem;
          letter-spacing: 1px;
        }
        .suggestion-list {
          list-style: none;
          padding: 0;
          margin-top: 1rem;
        }
        .suggestion-item {
          background: rgba(220,38,38,0.12);
          padding: 0.7rem 1rem;
          border-radius: 0.6rem;
          margin-bottom: 0.7rem;
          color: #fff;
          font-size: 1rem;
          box-shadow: 0 0 8px #dc2626bb;
          border-left: 3px solid #dc2626;
        }
        .suggestion-date {
          font-size: 0.85rem;
          color: #dc2626;
          opacity: 0.7;
          margin-left: 0.7rem;
        }
        @media (max-width: 700px) {
          .main-card { padding: 1rem; }
          table, .records-container { font-size: 0.89rem; }
          .section-title { font-size: 1.1rem; }
          .app-title { font-size: 1.3rem;}
        }
        `}
      </style>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Enter Employee ID"
                value={employeeIdInput}
                onChange={(e) => setEmployeeIdInput(e.target.value)}
                className="input-field"
                style={{ flex: 1, minWidth: '140px' }}
              />
              <input
                type="text"
                placeholder="Enter Employee Name"
                value={employeeNameInput}
                onChange={(e) => setEmployeeNameInput(e.target.value)}
                className="input-field"
                style={{ flex: 2, minWidth: '140px' }}
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
            {/* Suggestion Box */}
            <div className="suggestion-box">
              <div className="suggestion-title">Suggestion Box</div>
              <input
                type="text"
                placeholder="Enter your suggestion here..."
                value={suggestionInput}
                onChange={(e) => setSuggestionInput(e.target.value)}
                className="input-field"
                style={{ width: '80%', marginBottom: '0.8rem' }}
                maxLength={150}
              />
              <button
                className="action-button sign-in-button"
                onClick={handleSuggestionSubmit}
              >
                Submit Suggestion
              </button>
            </div>
          </div>
        )}
        {/* Employer View */}
        {viewMode === 'employer' && (
          <div className="space-y-6">
            <h2 className="section-title">Attendance Records</h2>
            <p className="app-subtitle">
              VIEW ONLY: Employer mode is read-only. Employees must sign in/out themselves.
            </p>
            {/* Print Button */}
            <div style={{ textAlign: "right", marginBottom: "1rem" }}>
              <button
                className="action-button sign-in-button"
                onClick={handlePrintRecords}
                style={{ maxWidth: "200px" }}
              >
                Print Records
              </button>
            </div>
            <div className="records-container">
              <table>
                <thead>
                  <tr>
                    <th>Employee ID</th>
                    <th>Employee Name</th>
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
                      <td>{record.employeeName || '—'}</td>
                      <td>{record.date}</td>
                      <td>{record.signInTime || '—'}</td>
                      <td>{record.signOutTime || '—'}</td>
                      <td>
                        <span className={`status-badge ${record.status === 'present' ? 'status-present' :
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
                      <td colSpan="7" style={{ textAlign: 'center' }}>
                        No attendance records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Suggestion List for Employer */}
            <div className="suggestion-box">
              <div className="suggestion-title">Employee Suggestions</div>
              <ul className="suggestion-list">
                {suggestions.length === 0 && (
                  <li style={{ color: '#dc2626', opacity: 0.7, fontStyle: 'italic' }}>No suggestions yet.</li>
                )}
                {suggestions.map((sugg, idx) => (
                  <li key={idx} className="suggestion-item">
                    {sugg.text}
                    <span className="suggestion-date">&mdash; {sugg.date}, {sugg.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;