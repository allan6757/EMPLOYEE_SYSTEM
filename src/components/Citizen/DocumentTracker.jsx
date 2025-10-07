import React from 'react';

const DocumentTracker = ({ citizen, documentProduction, showPopup }) => {
  const userDocuments = documentProduction.filter(doc => doc.citizenId === citizen.id);

  const getStageProgress = (stage) => {
    const stages = ['submitted', 'verification', 'production', 'quality_check', 'ready'];
    return stages.indexOf(stage) + 1;
  };

  const getStageColor = (stage) => {
    switch (stage) {
      case 'submitted': return '#3b82f6';
      case 'verification': return '#f59e0b';
      case 'production': return '#8b5cf6';
      case 'quality_check': return '#06b6d4';
      case 'ready': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <div className="section">
      <h3>Document Status Tracker</h3>
      {userDocuments.length === 0 ? (
        <p style={{ color: '#9ca3af', textAlign: 'center' }}>No documents in production</p>
      ) : (
        userDocuments.map(doc => (
          <div key={doc.id} className="queue-item" style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div>
                <strong>{doc.documentType}</strong>
                <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                  Order Date: {doc.orderDate}
                </div>
              </div>
              <div style={{
                padding: '4px 8px',
                borderRadius: '6px',
                background: getStageColor(doc.productionStage),
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: '500'
              }}>
                {doc.productionStage.toUpperCase().replace('_', ' ')}
              </div>
            </div>
            
            <div style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                <span style={{ fontSize: '0.9rem' }}>Progress</span>
                <span style={{ fontSize: '0.9rem' }}>{getStageProgress(doc.productionStage)}/5</span>
              </div>
              <div style={{
                width: '100%',
                height: '8px',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(getStageProgress(doc.productionStage) / 5) * 100}%`,
                  height: '100%',
                  background: getStageColor(doc.productionStage),
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>

            {doc.expectedCompletion && (
              <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>
                Expected Completion: {doc.expectedCompletion}
              </div>
            )}

            {doc.productionStage === 'ready' && (
              <div style={{
                marginTop: '10px',
                padding: '8px',
                background: 'rgba(16, 185, 129, 0.2)',
                borderRadius: '6px',
                color: '#10b981',
                fontSize: '0.9rem',
                fontWeight: '500'
              }}>
                Document ready for collection at Nairobi Registration Bureau
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default DocumentTracker;