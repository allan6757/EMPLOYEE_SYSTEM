import React from 'react';

const SidePanel = ({ isOpen, onClose, title, children }) => {
  return (
    <>
      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
          }}
          onClick={onClose}
        />
      )}
      
      <div style={{
        position: 'fixed',
        top: 0,
        right: isOpen ? 0 : '-400px',
        width: '400px',
        height: '100vh',
        background: 'rgba(31, 31, 31, 0.95)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(55, 55, 55, 0.5)',
        borderRight: 'none',
        zIndex: 1001,
        transition: 'right 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem',
          borderBottom: '1px solid rgba(55, 55, 55, 0.3)',
          background: 'rgba(220, 38, 38, 0.1)'
        }}>
          <h3 style={{margin: 0, color: '#ffffff', fontSize: '1.1rem'}}>{title}</h3>
          <button 
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              fontSize: '20px',
              cursor: 'pointer',
              padding: '4px 8px',
              borderRadius: '4px',
              transition: 'background 0.2s ease'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseOut={(e) => e.target.style.background = 'none'}
          >
            ×
          </button>
        </div>
        
        <div style={{
          flex: 1,
          padding: '1rem',
          overflowY: 'auto'
        }}>
          {children}
        </div>
      </div>
    </>
  );
};

export default SidePanel;