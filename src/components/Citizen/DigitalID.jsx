import React from 'react';

const DigitalID = ({ citizen }) => {
  const getStatusColor = () => {
    switch (citizen.status) {
      case 'active': return '#228b22';
      case 'expires_soon': return '#f59e0b';
      case 'expired': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusText = () => {
    switch (citizen.status) {
      case 'active': return 'ACTIVE';
      case 'expires_soon': return 'EXPIRES SOON';
      case 'expired': return 'EXPIRED';
      default: return 'UNKNOWN';
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #dc2626 0%, #000000 30%, #228b22 70%, #000000 100%)',
      borderRadius: '16px',
      padding: '20px',
      color: '#ffffff',
      maxWidth: '400px',
      margin: '0 auto',
      border: `2px solid ${getStatusColor()}`,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>REPUBLIC OF KENYA</h3>
        <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>NATIONAL IDENTITY CARD</p>
      </div>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <div style={{
          width: '80px',
          height: '80px',
          background: 'rgba(255, 255, 255, 0.2)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          fontWeight: 'bold',
          overflow: 'hidden'
        }}>
          {citizen.photo ? (
            <img
              src={citizen.photo}
              alt="ID Photo"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          ) : (
            'PHOTO'
          )}
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '8px' }}>
            <strong style={{ fontSize: '1.2rem' }}>
              {citizen.firstName} {citizen.lastName}
            </strong>
          </div>
          <div style={{ fontSize: '0.9rem', opacity: 0.9 }}>
            <div>ID: {citizen.idNumber}</div>
            <div>Gender: {citizen.gender}</div>
            <div>Phone: {citizen.phoneNumber}</div>
          </div>
        </div>
      </div>
      
      <div style={{
        marginTop: '15px',
        padding: '10px',
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '8px',
        fontSize: '0.8rem'
      }}>
        <div>Nationality: {citizen.nationality}</div>
        <div>Issue Date: {citizen.issueDate}</div>
        <div>Expiry Date: {citizen.expiryDate}</div>
        <div style={{ 
          marginTop: '8px', 
          textAlign: 'center', 
          color: getStatusColor(),
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}>
          STATUS: {getStatusText()}
        </div>
      </div>
    </div>
  );
};

export default DigitalID;