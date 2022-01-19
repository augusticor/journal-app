import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isLoggedIn, children }) => {
	if (isLoggedIn) {
		return <Navigate to={'/'} replace />;
	}

	return children;
};

PublicRoute.propTypes = {
	isLoggedIn: PropTypes.bool.isRequired,
};

export default PublicRoute;
