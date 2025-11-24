import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="container py-5 text-center">
      <div style={{ fontSize: '100px' }}>404</div>
      <h1 className="mt-3">{t('notFound.title') || 'Page Not Found'}</h1>
      <p className="lead mt-3">{t('notFound.description') || 'The page you are looking for does not exist.'}</p>
      <Link to="/" className="btn btn-success btn-lg mt-3">
        {t('notFound.backHome') || 'Back to Home'}
      </Link>
    </div>
  );
};

export default NotFound;
