import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumbs = ({ routes }) => {
  return (
    <div className="breadcrumbs">
      {routes.map((route, index) => (
        <span key={index}>
          <Link to={route.path}>{route.name}</Link>
          {index < routes.length - 1 && ' > '}
        </span>
      ))}
    </div>
  );
};

export default Breadcrumbs;
