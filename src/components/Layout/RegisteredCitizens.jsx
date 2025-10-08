import React, { useState } from 'react';

const RegisteredCitizens = ({ 
  citizenDatabase, 
  onBack, 
  title = "Registered Citizens" 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('all');

  const filteredCitizens = citizenDatabase.filter(citizen => {
    if (!searchTerm) return true;
    
    const searchLower = searchTerm.toLowerCase();
    
    switch (searchType) {
      case 'id':
        return citizen.idNumber.includes(searchTerm);
      case 'phone':
        return citizen.phoneNumber.includes(searchTerm);
      case 'name':
        return citizen.firstName.toLowerCase().includes(searchLower) ||
               citizen.lastName.toLowerCase().includes(searchLower);
      default:
        return citizen.idNumber.includes(searchTerm) ||
               citizen.phoneNumber.includes(searchTerm) ||
               citizen.firstName.toLowerCase().includes(searchLower) ||
               citizen.lastName.toLowerCase().includes(searchLower) ||
               citizen.email?.toLowerCase().includes(searchLower);
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return '#38a169';
      case 'Expired': return '#e53e3e';
      case 'Expires Soon': return '#d69e2e';
      default: return '#718096';
    }
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem',
        padding: '1rem',
        background: 'var(--bg-section)',
        borderRadius: '12px',
        border: '1px solid var(--border-secondary)'
      }}>
        <h2 style={{ 
          margin: 0, 
          color: 'var(--text-primary)',
          fontSize: '1.5rem',
          fontWeight: '600'
        }}>
          {title}
        </h2>
        <button 
          className="secondary-button"
          onClick={onBack}
          style={{ padding: '0.5rem 1rem' }}
        >
          Back
        </button>
      </div>

      <div className="section">
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <div style={{ flex: 1, minWidth: '250px' }}>
            <input
              className="input-field"
              placeholder="Search citizens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ 
                width: '100%',
                margin: 0
              }}
            />
          </div>
          <select
            className="input-field"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            style={{ 
              width: 'auto',
              minWidth: '150px',
              margin: 0
            }}
          >
            <option value="all">All Fields</option>
            <option value="id">ID Number</option>
            <option value="phone">Phone Number</option>
            <option value="name">Name</option>
          </select>
        </div>

        <div style={{
          marginBottom: '1rem',
          padding: '0.75rem',
          background: 'var(--bg-input)',
          borderRadius: '8px',
          border: '1px solid var(--border-secondary)',
          color: 'var(--text-secondary)',
          fontSize: '0.9rem'
        }}>
          Showing {filteredCitizens.length} of {citizenDatabase.length} registered citizens
        </div>

        <div style={{
          maxHeight: '70vh',
          overflowY: 'auto',
          border: '1px solid var(--border-secondary)',
          borderRadius: '12px',
          background: 'var(--bg-input)'
        }}>
          {filteredCitizens.length === 0 ? (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              color: 'var(--text-muted)'
            }}>
              {searchTerm ? 'No citizens found matching your search.' : 'No registered citizens found.'}
            </div>
          ) : (
            filteredCitizens.map((citizen, index) => (
              <div
                key={citizen.id || index}
                style={{
                  padding: '1rem',
                  borderBottom: index < filteredCitizens.length - 1 ? '1px solid var(--border-secondary)' : 'none',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-section)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '1rem',
                  alignItems: 'start'
                }}>
                  <div>
                    <div style={{
                      fontWeight: '600',
                      fontSize: '1.1rem',
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem'
                    }}>
                      {citizen.firstName} {citizen.lastName}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.25rem'
                    }}>
                      ID: {citizen.idNumber}
                    </div>
                    <div style={{
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)'
                    }}>
                      Phone: {citizen.phoneNumber}
                    </div>
                  </div>

                  <div>
                    {citizen.email && (
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.25rem'
                      }}>
                        Email: {citizen.email}
                      </div>
                    )}
                    {citizen.dateOfBirth && (
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '0.25rem'
                      }}>
                        DOB: {citizen.dateOfBirth}
                      </div>
                    )}
                    {citizen.gender && (
                      <div style={{
                        fontSize: '0.9rem',
                        color: 'var(--text-secondary)'
                      }}>
                        Gender: {citizen.gender}
                      </div>
                    )}
                  </div>

                  <div>
                    {citizen.status && (
                      <div style={{
                        display: 'inline-block',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: '500',
                        color: '#ffffff',
                        background: getStatusColor(citizen.status),
                        marginBottom: '0.5rem'
                      }}>
                        {citizen.status}
                      </div>
                    )}
                    {citizen.biometricKey && (
                      <div style={{
                        fontSize: '0.8rem',
                        color: 'var(--text-muted)',
                        marginTop: '0.5rem'
                      }}>
                        <div style={{ marginBottom: '0.25rem' }}>Biometric Key:</div>
                        <code style={{
                          background: 'rgba(34, 139, 34, 0.1)',
                          padding: '0.25rem 0.5rem',
                          borderRadius: '4px',
                          fontSize: '0.75rem',
                          color: 'var(--accent-green)',
                          border: '1px solid rgba(34, 139, 34, 0.2)'
                        }}>
                          {citizen.biometricKey}
                        </code>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RegisteredCitizens;