import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import ServiceCard from './components/Layout/ServiceCard';
import EmployeeLogin from './components/Employee/EmployeeLogin';
import EmployeeDashboard from './components/Employee/EmployeeDashboard';
import CitizenServices from './components/Citizen/CitizenServices';
import RegistrationForm from './components/Registration/RegistrationForm';
import AdminDashboard from './components/Admin/AdminDashboard';
import Popup from './components/Layout/Popup';
import SidePanel from './components/Layout/SidePanel';
import CitizenLogin from './components/Citizen/CitizenLogin';
import LoginScreen from './components/Auth/LoginScreen';
import SignupForm from './components/Auth/SignupForm';
import ErrorBoundary from './components/Layout/ErrorBoundary';
import LoadingSpinner from './components/Layout/LoadingSpinner';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import ThemeToggle from './components/Layout/ThemeToggle';
import { 
  getFormattedDate, 
  getFormattedTime, 
  generateQueueNumber, 
  generateIdNumber, 
  findOptimalBooth, 
  runFraudChecks 
} from './utils/helpers';
import { globalStyles } from './styles/globalStyles';
import { logger } from './utils/logger';
import { sanitizeInput, checkRateLimit, isSessionValid } from './utils/security';

const App = () => {
  const appId = 'registration-bureau-app';
  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'allan123';
  const SECURITY_KEY = import.meta.env.VITE_SECURITY_KEY || 'ALLAN123';
  const [isLoading, setIsLoading] = useState(true);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [showSignup, setShowSignup] = useState(false);
  const [userAccounts, setUserAccounts] = useLocalStorage(`userAccounts_${appId}`, []);
  const { theme, toggleTheme } = useTheme();

  // Authentication & User State
  const [currentUser, setCurrentUser] = useState(null);
  const [loginForm, setLoginForm] = useState({ boothId: '', password: '' });
  const [viewMode, setViewMode] = useState('login');
  const [message, setMessage] = useState('');
  const [isPasswordPromptVisible, setIsPasswordPromptVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showEmployeeLogin, setShowEmployeeLogin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [currentCitizen, setCurrentCitizen] = useState(null);
  const [citizenLoginForm, setCitizenLoginForm] = useState({ idNumber: '', phoneNumber: '' });
  const [showCitizenLogin, setShowCitizenLogin] = useState(false);
  const [showDigitalID, setShowDigitalID] = useState(false);
  const [lostReports, setLostReports] = useLocalStorage(`lostReports_${appId}`, []);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mainLoginForm, setMainLoginForm] = useState({ identifier: '', password: '' });
  const [showSecurityPrompt, setShowSecurityPrompt] = useState(false);
  const [securityKey, setSecurityKey] = useState('');
  const [pendingAction, setPendingAction] = useState(null);

  // Sample data
  const sampleBooths = [
    { id: 'B001', name: 'ID Verification Booth 1', serviceType: 'new-id' },
    { id: 'B002', name: 'Replacement Services Booth', serviceType: 'replacement' },
    { id: 'B003', name: 'Correction Services Booth', serviceType: 'correction' }
  ];

  const sampleEmployees = [
    { id: 'EMP001', name: 'ALLAN MAINA', password: 'emp123', boothId: 'B002' },
    { id: 'EMP002', name: 'MARY WANJIKU', password: 'emp456', boothId: 'B001' },
    { id: 'EMP003', name: 'JOHN KAMAU', password: 'emp789', boothId: 'B003' }
  ];

  const sampleDocuments = [
    {
      id: 1,
      citizenId: 1,
      idNumber: '12345678',
      citizenName: 'JAMES MWANGI',
      documentType: 'National ID',
      productionStage: 'ready',
      orderDate: '2024-01-20',
      expectedCompletion: '2024-02-01',
      status: 'completed'
    },
    {
      id: 2,
      citizenId: 2,
      idNumber: '87654321',
      citizenName: 'GRACE NJERI',
      documentType: 'ID Replacement',
      productionStage: 'production',
      orderDate: '2024-10-01',
      expectedCompletion: '2024-10-15',
      status: 'in_production'
    }
  ];

  const sampleCitizens = [
    {
      id: 1,
      idNumber: '12345678',
      firstName: 'JAMES',
      lastName: 'MWANGI',
      dateOfBirth: '1990-05-15',
      placeOfBirth: 'Nairobi',
      nationality: 'Kenyan',
      gender: 'Male',
      phoneNumber: '0712345678',
      email: 'james.mwangi@email.com',
      address: 'Nairobi, Kenya',
      registrationDate: '2024-01-15',
      issueDate: '2024-02-01',
      expiryDate: '2034-02-01',
      status: 'active',
      documentStatus: 'issued',
      biometricKey: 'BIO-12345678-2024'
    },
    {
      id: 2,
      idNumber: '87654321',
      firstName: 'GRACE',
      lastName: 'NJERI',
      dateOfBirth: '1985-08-22',
      placeOfBirth: 'Mombasa',
      nationality: 'Kenyan',
      gender: 'Female',
      phoneNumber: '0723456789',
      email: 'grace.njeri@email.com',
      address: 'Mombasa, Kenya',
      registrationDate: '2024-02-10',
      issueDate: '2024-03-01',
      expiryDate: '2025-03-01',
      status: 'expires_soon',
      documentStatus: 'issued',
      biometricKey: 'BIO-87654321-2024'
    },
    {
      id: 3,
      idNumber: '11223344',
      firstName: 'PETER',
      lastName: 'KIPROTICH',
      dateOfBirth: '1992-12-03',
      placeOfBirth: 'Eldoret',
      nationality: 'Kenyan',
      gender: 'Male',
      phoneNumber: '0734567890',
      email: 'peter.kiprotich@email.com',
      address: 'Eldoret, Kenya',
      registrationDate: '2024-03-05',
      issueDate: '2020-04-01',
      expiryDate: '2024-04-01',
      status: 'expired',
      documentStatus: 'expired',
      biometricKey: 'BIO-11223344-2020'
    },
    {
      id: 4,
      idNumber: '99887766',
      firstName: 'MARY',
      lastName: 'WANJIKU',
      dateOfBirth: '1988-07-12',
      placeOfBirth: 'Kisumu',
      nationality: 'Kenyan',
      gender: 'Female',
      phoneNumber: '0745678901',
      email: 'mary.wanjiku@email.com',
      address: 'Kisumu, Kenya',
      registrationDate: '2024-01-20',
      issueDate: '2024-02-15',
      expiryDate: '2034-02-15',
      status: 'active',
      documentStatus: 'issued',
      biometricKey: 'BIO-99887766-2024'
    },
    {
      id: 5,
      idNumber: '55443322',
      firstName: 'DAVID',
      lastName: 'OTIENO',
      dateOfBirth: '1995-03-08',
      placeOfBirth: 'Nakuru',
      nationality: 'Kenyan',
      gender: 'Male',
      phoneNumber: '0756789012',
      email: 'david.otieno@email.com',
      address: 'Nakuru, Kenya',
      registrationDate: '2024-03-10',
      issueDate: '2024-04-01',
      expiryDate: '2034-04-01',
      status: 'active',
      documentStatus: 'issued',
      biometricKey: 'BIO-55443322-2024'
    }
  ];

  // Initialize app and session management
  useEffect(() => {
    const initializeApp = async () => {
      try {
        logger.info('Initializing Nairobi Registration Bureau System');
        
        // Check session validity
        const storedActivity = localStorage.getItem('lastActivity');
        if (storedActivity && !isSessionValid(parseInt(storedActivity))) {
          logger.warn('Session expired, clearing data');
          localStorage.clear();
        }
        
        // In development, clear data for fresh start
        if (import.meta.env.DEV) {
          localStorage.removeItem(`citizenDatabase_${appId}`);
          localStorage.removeItem(`booths_${appId}`);
          localStorage.removeItem(`employees_${appId}`);
        }
        
        setIsLoading(false);
      } catch (error) {
        logger.error('App initialization failed', error);
        setIsLoading(false);
      }
    };
    
    initializeApp();
    
    // Update activity on user interaction
    const updateActivity = () => {
      const now = Date.now();
      setLastActivity(now);
      localStorage.setItem('lastActivity', now.toString());
    };
    
    document.addEventListener('click', updateActivity);
    document.addEventListener('keypress', updateActivity);
    
    return () => {
      document.removeEventListener('click', updateActivity);
      document.removeEventListener('keypress', updateActivity);
    };
  }, []);

  // Data Management with localStorage
  const [booths, setBooths] = useLocalStorage(`booths_${appId}`, sampleBooths);
  const [employees, setEmployees] = useLocalStorage(`employees_${appId}`, sampleEmployees);
  const [citizenQueue, setCitizenQueue] = useLocalStorage(`citizenQueue_${appId}`, []);
  const [appointments, setAppointments] = useLocalStorage(`appointments_${appId}`, []);
  const [serviceRecords, setServiceRecords] = useLocalStorage(`serviceRecords_${appId}`, []);
  const [citizenDatabase, setCitizenDatabase] = useLocalStorage(`citizenDatabase_${appId}`, sampleCitizens);
  const [documentProduction, setDocumentProduction] = useLocalStorage(`documentProduction_${appId}`, sampleDocuments);
  const [fraudAlerts, setFraudAlerts] = useLocalStorage(`fraudAlerts_${appId}`, []);

  // State Management
  const [activeBooths, setActiveBooths] = useState(new Set());
  const [currentServing, setCurrentServing] = useState({});
  const [chats, setChats] = useLocalStorage(`chats_${appId}`, [
    {
      id: 1,
      from: 'ALLAN MAINA',
      fromType: 'employee',
      boothId: 'B002',
      message: 'Good morning Admin! The replacement booth is ready for service.',
      timestamp: '09:15 AM',
      date: getFormattedDate()
    },
    {
      id: 2,
      from: 'Admin',
      fromType: 'admin',
      replyTo: 1,
      message: 'Good morning Allan! Thank you for the update. How many citizens are in queue?',
      timestamp: '09:18 AM',
      date: getFormattedDate()
    }
  ]);
  const [showChat, setShowChat] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [popup, setPopup] = useState(null);

  // Form States
  const [newBooth, setNewBooth] = useState({ id: '', name: '', serviceType: 'new-id' });
  const [newEmployee, setNewEmployee] = useState({ id: '', name: '', password: '', boothId: '' });
  const [citizenForm, setCitizenForm] = useState({
    name: '', phoneNumber: '', idNumber: '', serviceType: 'new-id', 
    appointmentDate: '', appointmentTime: ''
  });
  const [registrationForm, setRegistrationForm] = useState({
    firstName: '', lastName: '', dateOfBirth: '', placeOfBirth: '',
    nationality: 'Kenyan', gender: '', phoneNumber: '', email: '',
    address: '', nextOfKin: '', fingerprint: '', photo: '', requestBiometric: false
  });
  const [biometricSearch, setBiometricSearch] = useState('');
  const [biometricResults, setBiometricResults] = useState([]);
  const [showBiometricSearch, setShowBiometricSearch] = useState(false);
  const [securityFeatures] = useState({
    hologram: true, watermark: true, rfidChip: true, biometricData: true
  });

  // Popup function
  const showPopup = (message, type = 'info') => {
    setPopup({ message, type });
  };

  // Main Authentication with security enhancements
  const handleMainLogin = (loginData) => {
    const sanitizedIdentifier = sanitizeInput(loginData.identifier);
    
    // Rate limiting
    if (!checkRateLimit(sanitizedIdentifier)) {
      showPopup('Too many login attempts. Please try again later.', 'error');
      return;
    }
    
    // Check user accounts first
    const userAccount = userAccounts.find(u => 
      (u.email === sanitizedIdentifier || u.phoneNumber === sanitizedIdentifier) &&
      u.password === loginData.password
    );
    
    if (userAccount) {
      // Find corresponding citizen data
      const citizen = citizenDatabase.find(c => c.email === userAccount.email);
      if (citizen) {
        setCurrentCitizen(citizen);
        setIsAuthenticated(true);
        setLastActivity(Date.now());
        logger.info('User authenticated successfully', { userId: citizen.id });
        showPopup(`Welcome ${citizen.firstName} ${citizen.lastName}!`, 'success');
        return;
      }
    }
    
    // Fallback to default demo account
    const citizen = citizenDatabase.find(c => 
      (c.email === sanitizedIdentifier || c.phoneNumber === sanitizedIdentifier) &&
      loginData.password === 'kenya123'
    );
    
    if (citizen) {
      setCurrentCitizen(citizen);
      setIsAuthenticated(true);
      setLastActivity(Date.now());
      logger.info('User authenticated successfully', { userId: citizen.id });
      showPopup(`Welcome ${citizen.firstName} ${citizen.lastName}!`, 'success');
    } else {
      logger.warn('Authentication failed', { identifier: sanitizedIdentifier });
      showPopup('Invalid credentials. Try creating an account or use demo: james.mwangi@email.com / kenya123', 'error');
    }
  };

  // User Signup
  const handleSignup = (signupData) => {
    // Check if user already exists
    const existingUser = userAccounts.find(u => 
      u.email === signupData.email || u.phoneNumber === signupData.phoneNumber || u.idNumber === signupData.idNumber
    );
    
    if (existingUser) {
      showPopup('Account already exists with this email, phone, or ID number', 'error');
      return;
    }
    
    // Check if citizen with same ID exists
    const existingCitizen = citizenDatabase.find(c => c.idNumber === signupData.idNumber);
    if (existingCitizen) {
      showPopup('A citizen record already exists with this ID number', 'error');
      return;
    }
    
    // Create user account
    const newUserAccount = {
      id: Date.now(),
      email: signupData.email,
      phoneNumber: signupData.phoneNumber,
      password: signupData.password,
      idNumber: signupData.idNumber,
      createdAt: new Date().toISOString()
    };
    
    // Create citizen record
    const newCitizen = {
      id: Date.now() + 1,
      idNumber: signupData.idNumber,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      dateOfBirth: signupData.dateOfBirth || '1990-01-01',
      placeOfBirth: 'Kenya',
      nationality: 'Kenyan',
      gender: 'Not Specified',
      phoneNumber: signupData.phoneNumber,
      email: signupData.email,
      address: 'Kenya',
      registrationDate: new Date().toISOString().split('T')[0],
      issueDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 10 years
      status: 'active',
      documentStatus: 'issued',
      biometricKey: `BIO-${signupData.idNumber}-${new Date().getFullYear()}`
    };
    
    // Save to storage
    setUserAccounts([...userAccounts, newUserAccount]);
    setCitizenDatabase([...citizenDatabase, newCitizen]);
    
    logger.info('New user account created', { userId: newUserAccount.id });
    showPopup(`Account created successfully! Welcome ${signupData.firstName}!`, 'success');
    
    // Auto login
    setCurrentCitizen(newCitizen);
    setIsAuthenticated(true);
    setLastActivity(Date.now());
    setShowSignup(false);
  };

  // Citizen Authentication
  const handleCitizenLogin = () => {
    const citizen = citizenDatabase.find(c => 
      c.idNumber === citizenLoginForm.idNumber && 
      c.phoneNumber === citizenLoginForm.phoneNumber
    );
    
    if (citizen) {
      setCurrentCitizen(citizen);
      setShowCitizenLogin(false);
      setViewMode('citizen');
      showPopup(`Welcome ${citizen.firstName} ${citizen.lastName}!`, 'success');
    } else {
      showPopup(`Invalid credentials. Try: ID: 12345678, Phone: 0712345678`, 'error');
    }
  };

  // Authentication Functions
  const handleEmployeeLogin = () => {
    const boothId = loginForm.boothId.trim().toUpperCase();
    const password = loginForm.password.trim();
    
    const booth = booths.find(b => b.id.toUpperCase() === boothId);
    const employee = employees.find(emp => 
      emp.boothId.toUpperCase() === boothId && emp.password === password
    );

    if (booth && employee) {
      setCurrentUser({ ...employee, booth });
      setActiveBooths(prev => new Set([...prev, booth.id]));
      setViewMode('employee-dashboard');
      setShowEmployeeLogin(false);
      setLoginForm({ boothId: '', password: '' });
      showPopup(`Welcome ${employee.name}! Logged into ${booth.name}`, 'success');
    } else {
      showPopup(`Invalid credentials. Try: B002/emp123, B001/emp456, or B003/emp789`, 'error');
    }
  };

  const handleAdminLogin = () => {
    if (passwordInput === ADMIN_PASSWORD) {
      setViewMode('admin');
      setShowAdminLogin(false);
      showPopup('Admin access granted', 'success');
    } else {
      showPopup('Incorrect admin password', 'error');
    }
  };

  const logout = () => {
    if (currentUser?.boothId) {
      setActiveBooths(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentUser.boothId);
        return newSet;
      });
    }
    setCurrentUser(null);
    setViewMode('login');
    setLoginForm({ boothId: '', password: '' });
    setShowAdminLogin(false);
    setPasswordInput('');
    showPopup('Logged out successfully', 'info');
  };

  // Security Key Functions
  const handleSecurityKeySubmit = () => {
    if (securityKey === SECURITY_KEY) {
      setShowSecurityPrompt(false);
      setSecurityKey('');
      if (pendingAction === 'employee') {
        setShowEmployeeLogin(true);
      } else if (pendingAction === 'admin') {
        setShowAdminLogin(true);
      }
      setPendingAction(null);
    } else {
      showPopup('Invalid security key', 'error');
    }
  };

  const promptSecurityKey = (action) => {
    setPendingAction(action);
    setShowSecurityPrompt(true);
  };

  // Admin Functions
  const addBooth = () => {
    if (!newBooth.id || !newBooth.name) {
      setMessage('Please fill all booth details');
      return;
    }
    if (booths.some(b => b.id === newBooth.id)) {
      setMessage('Booth ID already exists');
      return;
    }
    setBooths([...booths, { ...newBooth }]);
    setNewBooth({ id: '', name: '', serviceType: 'new-id' });
    setMessage('Booth added successfully');
  };

  const addEmployee = () => {
    if (!newEmployee.id || !newEmployee.name || !newEmployee.password || !newEmployee.boothId) {
      setMessage('Please fill all employee details');
      return;
    }
    if (employees.some(e => e.id === newEmployee.id)) {
      setMessage('Employee ID already exists');
      return;
    }
    if (!booths.some(b => b.id === newEmployee.boothId)) {
      setMessage('Invalid booth ID');
      return;
    }
    setEmployees([...employees, { ...newEmployee }]);
    setNewEmployee({ id: '', name: '', password: '', boothId: '' });
    setMessage('Employee added successfully');
  };

  // Citizen Functions
  const bookAppointment = () => {
    if (!citizenForm.name || !citizenForm.phoneNumber || !citizenForm.idNumber || 
        !citizenForm.appointmentDate || !citizenForm.appointmentTime) {
      setMessage('Please fill all required fields: Name, Phone Number, ID Number, Date and Time');
      return;
    }

    const optimalBooth = findOptimalBooth(booths, employees, citizenQueue, citizenForm.serviceType);
    if (!optimalBooth) {
      setMessage('No available booth for this service');
      return;
    }

    const appointment = {
      id: Date.now(),
      ...citizenForm,
      assignedBooth: optimalBooth.id,
      boothName: optimalBooth.name,
      status: 'scheduled',
      bookingTime: getFormattedTime()
    };

    setAppointments([appointment, ...appointments]);
    setCitizenForm({ 
      name: '', phoneNumber: '', idNumber: '', serviceType: 'new-id', 
      appointmentDate: '', appointmentTime: '' 
    });
    setMessage(`Appointment booked at ${optimalBooth.name}`);
  };

  // Employee Functions
  const markAppointmentDone = (appointmentId) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId
          ? { ...apt, status: 'completed', completedTime: getFormattedTime() }
          : apt
      )
    );
    setMessage('Appointment marked as completed');
  };

  const updateAppointmentNotes = (appointmentId, notes) => {
    setAppointments(prev =>
      prev.map(apt =>
        apt.id === appointmentId ? { ...apt, notes } : apt
      )
    );
  };

  // Registration Functions
  const registerCitizen = () => {
    const requiredFields = ['firstName', 'lastName', 'gender', 'phoneNumber', 'photo'];
    const missingFields = requiredFields.filter(field => !registrationForm[field]);

    if (missingFields.length > 0) {
      setMessage(`Please fill required fields: ${missingFields.join(', ')}`);
      return;
    }

    if (!registrationForm.photo) {
      setMessage('Please take or upload a photo for the ID');
      return;
    }

    const fraudChecks = runFraudChecks(registrationForm, citizenDatabase);

    if (fraudChecks.some(alert => alert.severity === 'high')) {
      setFraudAlerts([...fraudAlerts, ...fraudChecks.map(alert => ({
        ...alert,
        id: Date.now() + Math.random(),
        timestamp: getFormattedTime(),
        applicant: `${registrationForm.firstName} ${registrationForm.lastName}`
      }))]);
      setMessage('Registration blocked due to security concerns. Please review fraud alerts.');
      return;
    }

    const idNumber = generateIdNumber();
    const biometricKey = registrationForm.requestBiometric ? `BIO-${idNumber}-${new Date().getFullYear()}` : null;
    
    const newCitizen = {
      id: Date.now(),
      idNumber,
      ...registrationForm,
      biometricKey,
      registrationDate: getFormattedDate(),
      registrationTime: getFormattedTime(),
      status: 'active',
      documentStatus: 'issued',
      issueDate: getFormattedDate(),
      expiryDate: new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      registeredBy: currentUser?.id || 'system'
    };

    setCitizenDatabase([newCitizen, ...citizenDatabase]);

    const documentOrder = {
      id: Date.now(),
      citizenId: newCitizen.id,
      idNumber,
      citizenName: `${registrationForm.firstName} ${registrationForm.lastName}`,
      documentType: 'National ID',
      productionStage: 'data_verification',
      orderDate: getFormattedDate(),
      expectedCompletion: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      securityFeatures: { ...securityFeatures },
      status: 'in_production'
    };

    setDocumentProduction([documentOrder, ...documentProduction]);

    setRegistrationForm({
      firstName: '', lastName: '', dateOfBirth: '', placeOfBirth: '',
      nationality: 'Kenyan', gender: '', phoneNumber: '', email: '',
      address: '', nextOfKin: '', fingerprint: '', photo: '', requestBiometric: false
    });

    const successMessage = `Citizen registered successfully. ID Number: ${idNumber}${biometricKey ? `. Biometric Key: ${biometricKey}` : ''}`;
    setMessage(successMessage);
  };

  // Biometric Search Function
  const searchBiometric = () => {
    if (!biometricSearch.trim()) {
      setBiometricResults([]);
      return;
    }
    
    const results = citizenDatabase.filter(citizen => 
      citizen.idNumber.includes(biometricSearch) ||
      citizen.firstName.toLowerCase().includes(biometricSearch.toLowerCase()) ||
      citizen.lastName.toLowerCase().includes(biometricSearch.toLowerCase())
    );
    
    setBiometricResults(results);
  };

  // Chat Functions
  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now() + Math.random(),
      from: currentUser?.name || 'Employee',
      fromType: 'employee',
      boothId: currentUser?.boothId || null,
      message: newMessage,
      timestamp: getFormattedTime(),
      date: getFormattedDate()
    };
    
    setChats(prevChats => [...prevChats, message]);
    setNewMessage('');
  };

  const replyToMessage = (messageId, reply) => {
    if (!reply.trim()) return;
    
    const replyMessage = {
      id: Date.now() + Math.random(),
      from: 'Admin',
      fromType: 'admin',
      replyTo: messageId,
      message: reply,
      timestamp: getFormattedTime(),
      date: getFormattedDate()
    };
    
    setChats(prevChats => [...prevChats, replyMessage]);
  };

  const sendAdminMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: Date.now() + Math.random(),
      from: 'Admin',
      fromType: 'admin',
      boothId: null,
      message: newMessage,
      timestamp: getFormattedTime(),
      date: getFormattedDate()
    };
    
    setChats(prevChats => [...prevChats, message]);
    setNewMessage('');
  };

  if (isLoading) {
    return (
      <ErrorBoundary>
        <div className="app-container">
          <style>{globalStyles}</style>
          <LoadingSpinner message="Initializing Nairobi Registration Bureau..." />
        </div>
      </ErrorBoundary>
    );
  }

  if (!isAuthenticated) {
    return (
      <ErrorBoundary>
        <div className="app-container">
          <style>{globalStyles}</style>
          {popup && (
            <Popup
              message={popup.message}
              type={popup.type}
              onClose={() => setPopup(null)}
            />
          )}
          {showSignup ? (
            <SignupForm 
              onSignup={handleSignup} 
              showPopup={showPopup}
              onBackToLogin={() => setShowSignup(false)}
            />
          ) : (
            <LoginScreen 
              onLogin={handleMainLogin} 
              showPopup={showPopup}
              onShowSignup={() => setShowSignup(true)}
            />
          )}
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="app-container">
        <style>{globalStyles}</style>
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

        <div className="main-card">
        <Header />
        <div className="coat-of-arms"></div>

        {popup && (
          <Popup
            message={popup.message}
            type={popup.type}
            onClose={() => setPopup(null)}
          />
        )}

        {/* Login View */}
        {viewMode === 'login' && (
          <div>
            <div className="floating-services">
              <ServiceCard
                icon="SVC"
                title="Citizen Services"
                description="Book appointments and join service queues"
                onClick={() => setShowCitizenLogin(true)}
              />
              <ServiceCard
                icon="REG"
                title="Registration"
                description="Register new Kenyan citizens (18+ years)"
                onClick={() => setViewMode('registration')}
              />
              <ServiceCard
                icon="EMP"
                title="Employee Login"
                description="Access your booth dashboard and manage daily operations • For staff use only"
                className="employee-card"
                onClick={() => promptSecurityKey('employee')}
              />
              <ServiceCard
                icon="ADM"
                title="Admin Panel"
                description="System management and oversight • For admin use only"
                className="admin-card"
                onClick={() => promptSecurityKey('admin')}
              />
            </div>

            {showEmployeeLogin && (
              <SidePanel 
                isOpen={showEmployeeLogin} 
                onClose={() => setShowEmployeeLogin(false)} 
                title="Employee Login"
              >
                <EmployeeLogin
                  loginForm={loginForm}
                  setLoginForm={setLoginForm}
                  handleEmployeeLogin={handleEmployeeLogin}
                />
              </SidePanel>
            )}

            {showAdminLogin && (
              <SidePanel 
                isOpen={showAdminLogin} 
                onClose={() => setShowAdminLogin(false)} 
                title="Admin Login"
              >
                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Enter admin password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                  />
                </div>
                <div className="button-group">
                  <button className="action-button" onClick={handleAdminLogin}>Login</button>
                  <button className="action-button secondary-button" onClick={() => setShowAdminLogin(false)}>Cancel</button>
                </div>
              </SidePanel>
            )}

            {showSecurityPrompt && (
              <SidePanel 
                isOpen={showSecurityPrompt} 
                onClose={() => {
                  setShowSecurityPrompt(false);
                  setSecurityKey('');
                  setPendingAction(null);
                }} 
                title="Security Access"
              >
                <div className="form-group">
                  <label className="form-label">Security Key</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Enter security key"
                    value={securityKey}
                    onChange={(e) => setSecurityKey(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSecurityKeySubmit()}
                  />
                </div>
                <div className="button-group">
                  <button className="action-button" onClick={handleSecurityKeySubmit}>Access</button>
                  <button className="action-button secondary-button" onClick={() => {
                    setShowSecurityPrompt(false);
                    setSecurityKey('');
                    setPendingAction(null);
                  }}>Cancel</button>
                </div>
              </SidePanel>
            )}

            {showCitizenLogin && (
              <SidePanel 
                isOpen={showCitizenLogin} 
                onClose={() => setShowCitizenLogin(false)} 
                title="Citizen Login"
              >
                <CitizenLogin
                  citizenLoginForm={citizenLoginForm}
                  setCitizenLoginForm={setCitizenLoginForm}
                  handleCitizenLogin={handleCitizenLogin}
                />
              </SidePanel>
            )}
          </div>
        )}

        {/* Employee Dashboard */}
        {viewMode === 'employee-dashboard' && currentUser && (
          <EmployeeDashboard
            currentUser={currentUser}
            appointments={appointments}
            serviceRecords={serviceRecords}
            showChat={showChat}
            setShowChat={setShowChat}
            chats={chats}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            sendMessage={sendMessage}
            markAppointmentDone={markAppointmentDone}
            updateAppointmentNotes={updateAppointmentNotes}
            logout={logout}
            getFormattedDate={getFormattedDate}
            onBackToServices={() => setViewMode('login')}
            citizenDatabase={citizenDatabase}
            biometricSearch={biometricSearch}
            setBiometricSearch={setBiometricSearch}
            biometricResults={biometricResults}
            searchBiometric={searchBiometric}
            showBiometricSearch={showBiometricSearch}
            setShowBiometricSearch={setShowBiometricSearch}
          />
        )}

        {/* Citizen Services */}
        {viewMode === 'citizen' && currentCitizen && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1.5rem'
            }}>
              <button 
                onClick={() => { setViewMode('login'); setCurrentCitizen(null); }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(34, 139, 34, 0.2)',
                  border: '1px solid rgba(34, 139, 34, 0.4)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{fontSize: '16px'}}>←</span>
                Back to Services
              </button>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => setShowDigitalID(true)}
                  style={{
                    background: 'linear-gradient(135deg, #dc2626 0%, #228b22 100%)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 16px',
                    color: '#ffffff',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease'
                  }}
                >
                  My Digital ID
                </button>
                
                {(currentCitizen.status === 'expired' || currentCitizen.status === 'expires_soon') && (
                  <button 
                    onClick={() => {
                      setCitizenForm({ 
                        ...citizenForm, 
                        name: `${currentCitizen.firstName} ${currentCitizen.lastName}`,
                        phoneNumber: currentCitizen.phoneNumber,
                        idNumber: currentCitizen.idNumber,
                        serviceType: 'replacement'
                      });
                    }}
                    style={{
                      background: '#f59e0b',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '8px 16px',
                      color: '#ffffff',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Renew ID
                  </button>
                )}
              </div>
            </div>

            <CitizenServices
              citizenForm={citizenForm}
              setCitizenForm={setCitizenForm}
              bookAppointment={bookAppointment}
              currentCitizen={currentCitizen}
              showDigitalID={showDigitalID}
              setShowDigitalID={setShowDigitalID}
              documentProduction={documentProduction}
              lostReports={lostReports}
              setLostReports={setLostReports}
              showPopup={showPopup}
            />
          </div>
        )}

        {/* Registration Portal */}
        {viewMode === 'registration' && (
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'flex-start',
              marginBottom: '1.5rem'
            }}>
              <button 
                onClick={() => setViewMode('login')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'rgba(34, 139, 34, 0.2)',
                  border: '1px solid rgba(34, 139, 34, 0.4)',
                  borderRadius: '8px',
                  padding: '8px 12px',
                  color: '#ffffff',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.3s ease'
                }}
              >
                <span style={{fontSize: '16px'}}>←</span>
                Back to Services
              </button>
            </div>

            <RegistrationForm
              registrationForm={registrationForm}
              setRegistrationForm={setRegistrationForm}
              registerCitizen={registerCitizen}
              showPopup={showPopup}
            />
          </div>
        )}

        {/* Admin Dashboard */}
        {viewMode === 'admin' && (
          <AdminDashboard
            booths={booths}
            employees={employees}
            citizenQueue={citizenQueue}
            serviceRecords={serviceRecords}
            activeBooths={activeBooths}
            currentServing={currentServing}
            newBooth={newBooth}
            setNewBooth={setNewBooth}
            addBooth={addBooth}
            newEmployee={newEmployee}
            setNewEmployee={setNewEmployee}
            addEmployee={addEmployee}
            showChat={showChat}
            setShowChat={setShowChat}
            chats={chats}
            replyToMessage={replyToMessage}
            sendAdminMessage={sendAdminMessage}
            newMessage={newMessage}
            setNewMessage={setNewMessage}
            logout={logout}
            getFormattedDate={getFormattedDate}
            onBackToServices={logout}
            citizenDatabase={citizenDatabase}
            biometricSearch={biometricSearch}
            setBiometricSearch={setBiometricSearch}
            biometricResults={biometricResults}
            searchBiometric={searchBiometric}
            showBiometricSearch={showBiometricSearch}
            setShowBiometricSearch={setShowBiometricSearch}
          />
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
};

export default App;