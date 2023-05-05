import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, userUid, ...rest }) => {
  const isAuthenticated = !!userUid; // Check if the user UID exists

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" /> // Redirect to the home page if not authenticated
        )
      }
    />
  );
};

export default ProtectedRoute;
