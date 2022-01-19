import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ isLoggedIn, children }) => {
	return isLoggedIn ? children : <Navigate to={'/auth/login'} />;
};

PrivateRoute.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
};

export default PrivateRoute;
