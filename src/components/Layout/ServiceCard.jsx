import React from 'react';

const ServiceCard = ({ icon, title, description, onClick, className = '' }) => {
  return (
    <div className={`service-card ${className}`} onClick={onClick}>
      <div className="service-icon">{icon}</div>
      <div className="service-title">{title}</div>
      <div className="service-description">{description}</div>
    </div>
  );
};

export default ServiceCard;