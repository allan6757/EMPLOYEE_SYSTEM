export const globalStyles = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap');

:root {
  /* Dark theme variables */
  --bg-primary: linear-gradient(135deg, #000000 0%, #1a0000 25%, #000000 50%, #001a00 75%, #000000 100%);
  --bg-secondary: rgba(0, 0, 0, 0.95);
  --bg-card: linear-gradient(135deg, rgba(15, 15, 15, 0.9) 0%, rgba(25, 5, 5, 0.8) 50%, rgba(15, 15, 15, 0.9) 100%);
  --bg-section: linear-gradient(135deg, rgba(31, 31, 31, 0.9) 0%, rgba(15, 5, 5, 0.8) 50%, rgba(31, 31, 31, 0.9) 100%);
  --bg-input: rgba(31, 31, 31, 0.8);
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
  --text-muted: #6b7280;
  --border-primary: rgba(220, 38, 38, 0.3);
  --border-secondary: rgba(55, 55, 55, 0.3);
  --accent-red: #dc2626;
  --accent-green: #228b22;
  --shadow-primary: rgba(0, 0, 0, 0.9);
  --shadow-secondary: rgba(0, 0, 0, 0.7);
}

[data-theme="light"] {
  /* Light theme variables */
  --bg-primary: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 25%, #f1f5f9 50%, #e8f5e8 75%, #f8fafc 100%);
  --bg-secondary: rgba(255, 255, 255, 0.95);
  --bg-card: linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.8) 50%, rgba(255, 255, 255, 0.9) 100%);
  --bg-section: linear-gradient(135deg, rgba(248, 250, 252, 0.9) 0%, rgba(241, 245, 249, 0.8) 50%, rgba(248, 250, 252, 0.9) 100%);
  --bg-input: rgba(255, 255, 255, 0.9);
  --text-primary: #1f2937;
  --text-secondary: #4b5563;
  --text-muted: #9ca3af;
  --border-primary: rgba(220, 38, 38, 0.3);
  --border-secondary: rgba(209, 213, 219, 0.5);
  --accent-red: #dc2626;
  --accent-green: #16a34a;
  --shadow-primary: rgba(0, 0, 0, 0.1);
  --shadow-secondary: rgba(0, 0, 0, 0.05);
}

* {
  box-sizing: border-box;
}

body, .app-container {
  background: var(--bg-primary),
             radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
             radial-gradient(circle at 80% 80%, rgba(34, 139, 34, 0.1) 0%, transparent 50%);
  min-height: 100vh;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--text-primary);
  margin: 0;
  padding: 0;
  line-height: 1.6;
  overflow-x: hidden;
  position: relative;
  transition: all 0.3s ease;
}

body::before, .app-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.05) 0%, transparent 25%),
    radial-gradient(circle at 75% 75%, rgba(34, 139, 34, 0.05) 0%, transparent 25%),
    linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.02) 49%, rgba(255, 255, 255, 0.02) 51%, transparent 52%);
  background-size: 200px 200px, 200px 200px, 50px 50px;
  pointer-events: none;
  z-index: -1;
}

.app-container::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(circle at 20% 80%, rgba(220, 38, 38, 0.08) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(34, 139, 34, 0.06) 0%, transparent 50%),
    radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.02) 0%, transparent 50%);
  pointer-events: none;
  z-index: -1;
}

.main-card {
  background: var(--bg-secondary);
  backdrop-filter: blur(30px);
  border-radius: 32px;
  box-shadow: 
    0 32px 64px -12px var(--shadow-primary),
    0 0 0 1px var(--border-primary),
    inset 0 1px 0 rgba(255, 255, 255, 0.05),
    0 0 50px rgba(220, 38, 38, 0.1);
  padding: 3rem;
  max-width: 1600px;
  margin: 2rem auto;
  border: 2px solid var(--border-primary);
  position: relative;
  transition: all 0.3s ease;
}

.main-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(220, 38, 38, 0.8) 20%, 
    rgba(255, 255, 255, 0.6) 35%, 
    rgba(34, 139, 34, 0.8) 50%, 
    rgba(255, 255, 255, 0.6) 65%,
    rgba(220, 38, 38, 0.8) 80%,
    transparent 100%
  );
  border-radius: 32px 32px 0 0;
}

.main-card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(34, 139, 34, 0.8) 20%, 
    rgba(255, 255, 255, 0.6) 35%, 
    rgba(220, 38, 38, 0.8) 50%, 
    rgba(255, 255, 255, 0.6) 65%,
    rgba(34, 139, 34, 0.8) 80%,
    transparent 100%
  );
  border-radius: 0 0 32px 32px;
}

.title-header {
  position: relative;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Kenya.svg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-radius: 24px 24px 0 0;
  padding: 3rem 2rem;
  margin: -3rem -3rem 2rem -3rem;
  overflow: hidden;
}

.title-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 1;
}

.app-title {
  font-family: 'Poppins', sans-serif;
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  text-align: center;
  letter-spacing: -0.02em;
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  animation: titleGlow 3s ease-in-out infinite alternate;
  position: relative;
  z-index: 2;
}

@keyframes titleGlow {
  from { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 255, 255, 0.3); }
  to { text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 255, 255, 0.5); }
}

.subtitle {
  text-align: center;
  color: #ffffff;
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 0;
  opacity: 0.9;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 2;
}

.floating-services {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
  padding: 0 1rem;
  position: relative;
}

.service-card {
  background: var(--bg-card);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 2rem;
  border: 2px solid var(--border-primary);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 25px -5px var(--shadow-secondary),
    0 0 0 1px var(--border-primary),
    inset 0 1px 0 rgba(220, 38, 38, 0.1);
}

.service-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 
    0 25px 50px -12px rgba(0, 0, 0, 0.8),
    0 0 0 1px rgba(220, 38, 38, 0.3),
    0 0 40px rgba(220, 38, 38, 0.2);
  border-color: rgba(220, 38, 38, 0.5);
}

.service-card.employee-card:hover {
  box-shadow: 
    0 25px 50px -12px rgba(34, 139, 34, 0.8),
    0 0 0 1px rgba(34, 139, 34, 0.5),
    0 0 40px rgba(34, 139, 34, 0.4);
  border-color: rgba(34, 139, 34, 0.6);
}

.service-card.admin-card:hover {
  box-shadow: 
    0 25px 50px -12px rgba(34, 139, 34, 0.8),
    0 0 0 1px rgba(34, 139, 34, 0.5),
    0 0 40px rgba(34, 139, 34, 0.4);
  border-color: rgba(34, 139, 34, 0.6);
}

.service-card.admin-glow {
  animation: adminGlow 2s ease-in-out infinite alternate;
}

@keyframes adminGlow {
  from { 
    box-shadow: 
      0 25px 50px -12px rgba(220, 38, 38, 0.4),
      0 0 0 1px rgba(220, 38, 38, 0.3),
      0 0 30px rgba(220, 38, 38, 0.3);
  }
  to { 
    box-shadow: 
      0 25px 50px -12px rgba(220, 38, 38, 0.6),
      0 0 0 1px rgba(220, 38, 38, 0.5),
      0 0 40px rgba(220, 38, 38, 0.5);
  }
}

.service-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #dc2626 0%, #000000 30%, #228b22 70%, #000000 100%);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: white;
  box-shadow: 
    0 8px 16px rgba(220, 38, 38, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.2),
    0 0 20px rgba(34, 139, 34, 0.3);
  border: 1px solid rgba(220, 38, 38, 0.5);
}

.service-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  font-family: 'Poppins', sans-serif;
}

.service-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  line-height: 1.5;
}

.input-field, select {
  padding: 0.875rem 1rem;
  border-radius: 12px;
  border: 1px solid var(--border-secondary);
  background: var(--bg-input);
  color: var(--text-primary);
  font-size: 0.95rem;
  margin: 0.375rem auto;
  outline: none;
  width: 240px;
  transition: all 0.3s ease;
  font-family: inherit;
  display: block;
}

.input-field:focus, select:focus {
  border-color: var(--accent-red);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  background: var(--bg-input);
}

.input-field::placeholder {
  color: var(--text-muted);
}

.action-button {
  padding: 0.875rem 1.5rem;
  font-weight: 500;
  color: #ffffff;
  border-radius: 12px;
  background: linear-gradient(135deg, #228b22 0%, #1e7e1e 100%);
  border: none;
  cursor: pointer;
  margin: 0.375rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(34, 139, 34, 0.3);
  font-family: inherit;
}

.action-button:hover {
  background: linear-gradient(135deg, #1e7e1e 0%, #196619 100%);
  box-shadow: 0 6px 16px rgba(34, 139, 34, 0.4);
  transform: translateY(-1px);
}

.secondary-button {
  background: rgba(55, 55, 55, 0.8);
  color: #ffffff;
  border: 1px solid rgba(75, 75, 75, 0.5);
}

.secondary-button:hover {
  background: rgba(75, 75, 75, 0.8);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.section {
  background: var(--bg-section);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 16px;
  border: 1px solid var(--border-secondary);
  position: relative;
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Coat_of_arms_of_Kenya.svg/1200px-Coat_of_arms_of_Kenya.svg.png');
  background-size: 150px 150px;
  background-position: center;
  background-repeat: no-repeat;
  transition: all 0.3s ease;
}

.section::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 16px;
  z-index: 1;
}

.section > * {
  position: relative;
  z-index: 2;
}

.section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, #dc2626 0%, #ffffff 25%, #228b22 50%, #ffffff 75%, #dc2626 100%);
  border-radius: 2px 0 0 2px;
}

.section h3 {
  margin: 0 0 1rem 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  align-items: center;
  text-align: center;
}

.form-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.button-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1.5rem;
}

.booth-card, .queue-item {
  background: var(--bg-input);
  padding: 1rem;
  border-radius: 12px;
  margin: 0.75rem 0;
  border: 1px solid var(--border-secondary);
  transition: all 0.3s ease;
  color: var(--text-primary);
}

.booth-card:hover, .queue-item:hover {
  background: var(--bg-section);
  border-color: var(--border-primary);
}

.status-waiting { color: #f59e0b; }
.status-being-served { color: #10b981; }
.status-scheduled { color: #3b82f6; }

.message {
  background: rgba(220, 38, 38, 0.15);
  border: 1px solid rgba(220, 38, 38, 0.3);
  color: #ffffff;
  padding: 1rem;
  border-radius: 12px;
  margin: 1.5rem 0;
  text-align: center;
  font-weight: 500;
  backdrop-filter: blur(10px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.stat-card {
  background: var(--bg-input);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--border-secondary);
  text-align: center;
  transition: all 0.3s ease;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: var(--accent-red);
  margin-bottom: 0.5rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
}

.user-info {
  background: rgba(220, 38, 38, 0.1);
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 1rem;
  border: 1px solid rgba(220, 38, 38, 0.3);
}

@media (max-width: 768px) {
  .main-card {
    margin: 1rem;
    padding: 1.5rem;
  }
  
  .app-title {
    font-size: 2rem;
  }
  
  .grid {
    grid-template-columns: 1fr;
  }
  
  .input-field, select {
    width: 100%;
  }
}

.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  background: var(--bg-card);
  border: 2px solid var(--border-primary);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 12px var(--shadow-secondary);
}

.theme-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px var(--shadow-primary);
  border-color: var(--accent-red);
}

[data-theme="light"] .theme-toggle {
  background: var(--bg-card);
  color: var(--text-primary);
}

[data-theme="dark"] .theme-toggle {
  background: var(--bg-card);
  color: var(--text-primary);
}
`;