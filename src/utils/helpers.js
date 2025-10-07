// Helper functions for the application

export const getFormattedDate = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
};

export const getFormattedTime = () => {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

export const generateQueueNumber = () => {
  return 'Q' + Math.floor(Math.random() * 1000).toString().padStart(3, '0');
};

export const generateIdNumber = () => {
  return Math.floor(Math.random() * 100000000).toString().padStart(8, '0');
};

export const calculateAge = (dateOfBirth) => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const findOptimalBooth = (booths, employees, citizenQueue, serviceType) => {
  const availableBooths = booths.filter(booth =>
    booth.serviceType === serviceType &&
    employees.some(emp => emp.boothId === booth.id)
  );

  if (availableBooths.length === 0) return null;

  const boothQueues = availableBooths.map(booth => ({
    ...booth,
    queueCount: citizenQueue.filter(citizen => citizen.assignedBooth === booth.id).length
  }));

  return boothQueues.reduce((min, booth) =>
    booth.queueCount < min.queueCount ? booth : min
  );
};

export const runFraudChecks = (formData, citizenDatabase) => {
  const alerts = [];

  const duplicateName = citizenDatabase.find(citizen =>
    citizen.firstName.toLowerCase() === formData.firstName.toLowerCase() &&
    citizen.lastName.toLowerCase() === formData.lastName.toLowerCase() &&
    citizen.dateOfBirth === formData.dateOfBirth
  );

  if (duplicateName) {
    alerts.push({
      type: 'duplicate',
      message: 'Potential duplicate registration detected',
      severity: 'high',
      details: `Similar record found: ${duplicateName.firstName} ${duplicateName.lastName}`
    });
  }

  const duplicatePhone = citizenDatabase.find(citizen =>
    citizen.phoneNumber === formData.phoneNumber
  );

  if (duplicatePhone) {
    alerts.push({
      type: 'duplicate_phone',
      message: 'Phone number already registered',
      severity: 'medium',
      details: `Phone ${formData.phoneNumber} already in use`
    });
  }

  const age = calculateAge(formData.dateOfBirth);
  if (age < 18) {
    alerts.push({
      type: 'underage',
      message: 'Applicant is under 18 years old',
      severity: 'high',
      details: `Age: ${age} years`
    });
  }

  return alerts;
};