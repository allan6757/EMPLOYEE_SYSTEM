import React from 'react';

const VotersCard = ({ citizen }) => {
  const getStatusColor = () => {
    switch (citizen.status) {
      case 'active': return '#228b22';
      case 'expires_soon': return '#f59e0b';
      case 'expired': return '#dc2626';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #1e40af 0%, #000000 30%, #dc2626 70%, #000000 100%)',
      borderRadius: '20px',
      padding: '25px',
      color: '#ffffff',
      maxWidth: '450px',
      margin: '20px auto',
      border: `3px solid ${getStatusColor()}`,
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.7), 0 0 20px rgba(30, 64, 175, 0.3)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #dc2626 0%, #ffffff 25%, #228b22 50%, #ffffff 75%, #dc2626 100%)'
      }} />
      
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h3 style={{ margin: '0 0 5px 0', fontSize: '1.3rem', fontWeight: '800' }}>REPUBLIC OF KENYA</h3>
        <p style={{ margin: 0, fontSize: '1rem', opacity: 0.9, fontWeight: '600' }}>VOTER REGISTRATION CARD</p>
      </div>
      
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div style={{
          width: '90px',
          height: '90px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1rem',
          fontWeight: 'bold',
          border: '2px solid rgba(255, 255, 255, 0.4)'
        }}>
          PHOTO
        </div>
        
        <div style={{ flex: 1 }}>
          <div style={{ marginBottom: '12px' }}>
            <strong style={{ fontSize: '1.4rem', display: 'block' }}>
              {citizen.firstName} {citizen.lastName}
            </strong>
          </div>
          <div style={{ fontSize: '1rem', opacity: 0.95, lineHeight: '1.4' }}>
            <div>Voter ID: {citizen.idNumber}V</div>
            <div>Constituency: NAIROBI CENTRAL</div>
            <div>Ward: CENTRAL WARD</div>
          </div>
        </div>
      </div>
      
      <div style={{
        marginTop: '20px',
        padding: '15px',
        background: 'rgba(0, 0, 0, 0.4)',
        borderRadius: '12px',
        fontSize: '0.9rem',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Registration Date:</span>
          <span>{citizen.registrationDate}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
          <span>Valid Until:</span>
          <span>{citizen.expiryDate}</span>
        </div>
        <div style={{ 
          marginTop: '12px', 
          textAlign: 'center', 
          color: getStatusColor(),
          fontWeight: 'bold',
          fontSize: '1rem',
          textShadow: '0 0 10px currentColor'
        }}>
          VOTING STATUS: {citizen.status === 'active' ? 'ELIGIBLE' : 'RENEWAL REQUIRED'}
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, #228b22 0%, #ffffff 25%, #dc2626 50%, #ffffff 75%, #228b22 100%)'
      }} />
    </div>
  );
};

export default VotersCard;