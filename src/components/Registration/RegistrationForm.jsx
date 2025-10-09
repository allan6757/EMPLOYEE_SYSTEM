import React, { useState, useRef } from 'react';

const RegistrationForm = ({ 
  registrationForm, 
  setRegistrationForm, 
  registerCitizen, 
  showPopup 
}) => {
  const [showCamera, setShowCamera] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const clearForm = () => {
    setRegistrationForm({
      firstName: '', lastName: '', dateOfBirth: '', placeOfBirth: '',
      nationality: 'Kenyan', gender: '', phoneNumber: '', email: '',
      address: '', nextOfKin: '', fingerprint: '', photo: '', requestBiometric: false
    });
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setShowCamera(true);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (error) {
      showPopup('Camera access denied or not available', 'error');
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0);
    
    const photoData = canvas.toDataURL('image/jpeg', 0.8);
    setRegistrationForm({ ...registrationForm, photo: photoData });
    
    // Stop camera
    const stream = video.srcObject;
    const tracks = stream.getTracks();
    tracks.forEach(track => track.stop());
    setShowCamera(false);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setRegistrationForm({ ...registrationForm, photo: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    if (!isRegistered) {
      setRegistrationForm({ ...registrationForm, photo: '' });
    }
  };

  const handleRegisterCitizen = () => {
    registerCitizen();
    setIsRegistered(true);
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
            <label className="form-label">Biometric Data *</label>
            <input
              className="input-field"
              placeholder="Fingerprint scan code (Required)"
              value={registrationForm.fingerprint}
              onChange={(e) => setRegistrationForm({ ...registrationForm, fingerprint: e.target.value })}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">ID Photo *</label>
            {!registrationForm.photo ? (
              <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    type="button"
                    onClick={startCamera}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    📷 Take Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    style={{
                      flex: 1,
                      padding: '12px',
                      background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                      fontWeight: '600'
                    }}
                  >
                    📁 Upload Photo
                  </button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                />
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <img
                  src={registrationForm.photo}
                  alt="ID Photo"
                  style={{
                    width: '120px',
                    height: '120px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '2px solid #228b22',
                    marginBottom: '10px'
                  }}
                />
                <div>
                  {!isRegistered && (
                    <button
                      type="button"
                      onClick={retakePhoto}
                      style={{
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                    >
                      🔄 Retake Photo
                    </button>
                  )}
                  {isRegistered && (
                    <p style={{ color: '#228b22', fontSize: '0.85rem', marginTop: '5px' }}>
                      ✅ Photo locked after registration
                    </p>
                  )}
                </div>
              </div>
            )}
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
        <button 
          className="action-button" 
          onClick={handleRegisterCitizen}
          disabled={isRegistered || !registrationForm.fingerprint}
          style={{
            opacity: (isRegistered || !registrationForm.fingerprint) ? 0.6 : 1,
            cursor: (isRegistered || !registrationForm.fingerprint) ? 'not-allowed' : 'pointer'
          }}
        >
          {isRegistered ? 'Citizen Registered' : 'Register Citizen'}
        </button>
        <button 
          className="action-button secondary-button" 
          onClick={() => {
            clearForm();
            setIsRegistered(false);
          }}
        >
          Clear Form
        </button>
      </div>
      
      {showCamera && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            background: '#ffffff',
            borderRadius: '15px',
            padding: '20px',
            textAlign: 'center',
            maxWidth: '500px',
            width: '90%'
          }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>Take ID Photo</h3>
            <video
              ref={videoRef}
              autoPlay
              style={{
                width: '100%',
                maxWidth: '300px',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '8px',
                marginBottom: '15px'
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={capturePhoto}
                style={{
                  padding: '12px 24px',
                  background: '#228b22',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                📸 Capture
              </button>
              <button
                onClick={() => {
                  const stream = videoRef.current?.srcObject;
                  if (stream) {
                    const tracks = stream.getTracks();
                    tracks.forEach(track => track.stop());
                  }
                  setShowCamera(false);
                }}
                style={{
                  padding: '12px 24px',
                  background: '#dc2626',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default RegistrationForm;