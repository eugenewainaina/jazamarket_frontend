import React from 'react';

const Placeholder: React.FC<{ title: string }> = ({ title }) => {
  return (
    <div style={{ border: '1px solid #dee2e6', padding: '2rem', borderRadius: '0.25rem' }}>
      <h2>{title}</h2>
      <p>This is a placeholder page.</p>
    </div>
  );
};

export default Placeholder;
