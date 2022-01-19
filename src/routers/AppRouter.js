import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { login } from '../actions/auth';

import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoadingScreen from '../components/journal/LoadingScreen';
import AuthRouter from './AuthRouter';
import JournalRouter from './JournalRouter';

const AppRouter = () => {
	const dispatch = useDispatch();

	const [checkingLogin, setCheckingLogin] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				dispatch(login(user.uid, user.displayName));
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
			}

			setCheckingLogin(false);
		});
	}, [dispatch]);

	if (checkingLogin) {
		return <LoadingScreen />;
	}

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path='auth/*'
					element={
						<PublicRoute isLoggedIn={isLoggedIn}>
							<AuthRouter />
						</PublicRoute>
					}
				/>

				<Route
					path='/*'
					element={
						<PrivateRoute isLoggedIn={isLoggedIn}>
							<JournalRouter />
						</PrivateRoute>
					}
				/>

				<Route path='*' element={<Navigate to={'/auth/login'} replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
