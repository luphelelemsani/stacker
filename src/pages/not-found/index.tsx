import React from 'react';
import '../../theme/pages/notFoundPage.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404</h1>
      <p className="not-found-message">Page not found</p>
    </div>
  );
};

export default NotFoundPage;
