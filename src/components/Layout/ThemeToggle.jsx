import React from 'react';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      style={{
        fontSize: '0.8rem',
        fontWeight: '600',
        width: '60px',
        height: '30px',
        borderRadius: '15px'
      }}
    >
      {theme === 'dark' ? 'Light' : 'Dark'}
    </button>
  );
};

export default ThemeToggle;