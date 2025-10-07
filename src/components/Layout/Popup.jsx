import React, { useEffect } from 'react';

const Popup = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case 'success':
        return {
          background: 'rgba(34, 139, 34, 0.9)',
          border: '1px solid rgba(34, 139, 34, 0.6)'
        };
      case 'error':
        return {
          background: 'rgba(220, 38, 38, 0.9)',
          border: '1px solid rgba(220, 38, 38, 0.6)'
        };
      case 'warning':
        return {
          background: 'rgba(245, 158, 11, 0.9)',
          border: '1px solid rgba(245, 158, 11, 0.6)'
        };
      default:
        return {
          background: 'rgba(59, 130, 246, 0.9)',
          border: '1px solid rgba(59, 130, 246, 0.6)'
        };
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      right: '20px',
      ...getTypeStyles(),
      color: '#ffffff',
      padding: '12px 16px',
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      zIndex: 2000,
      maxWidth: '300px',
      fontSize: '0.9rem',
      fontWeight: '500',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      animation: 'slideIn 0.3s ease-out'
    }}>
      <style>
        {`
          @keyframes slideIn {
            from {
              transform: translateX(100%);
              opacity: 0;
            }
            to {
              transform: translateX(0);
              opacity: 1;
            }
          }
        `}
      </style>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>{message}</span>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            fontSize: '16px',
            cursor: 'pointer',
            marginLeft: '10px',
            padding: '0 4px'
          }}
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Popup;