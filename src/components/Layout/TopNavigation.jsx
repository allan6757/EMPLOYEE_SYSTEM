import React from 'react';

const TopNavigation = ({ currentUser, showChat, setShowChat, logout, onBackToServices }) => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem',
      background: 'rgba(220, 38, 38, 0.1)',
      borderRadius: '12px',
      marginBottom: '1.5rem',
      border: '1px solid rgba(220, 38, 38, 0.3)'
    }}>
      <button 
        onClick={onBackToServices}
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
        onMouseOver={(e) => e.target.style.background = 'rgba(34, 139, 34, 0.3)'}
        onMouseOut={(e) => e.target.style.background = 'rgba(34, 139, 34, 0.2)'}
      >
        <span style={{fontSize: '16px'}}>←</span>
        Back
      </button>

      {currentUser && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flex: 1,
          justifyContent: 'center'
        }}>
          <span style={{color: '#ffffff', fontWeight: '600'}}>
            {currentUser.name} - {currentUser.booth?.name}
          </span>
        </div>
      )}

      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
        {currentUser && (
          <button 
            onClick={() => setShowChat(!showChat)}
            style={{
              background: '#228b22',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 12px',
              color: 'white',
              fontSize: '0.9rem',
              cursor: 'pointer',
              fontWeight: '500',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => e.target.style.background = '#1e7e1e'}
            onMouseOut={(e) => e.target.style.background = '#228b22'}
          >
            Chat
          </button>
        )}
        
        <button 
          onClick={logout}
          style={{
            background: 'rgba(220, 38, 38, 0.8)',
            border: '1px solid rgba(220, 38, 38, 0.6)',
            borderRadius: '8px',
            padding: '8px 16px',
            color: '#ffffff',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(220, 38, 38, 1)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(220, 38, 38, 0.8)'}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default TopNavigation;