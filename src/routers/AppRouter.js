import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { login } from '../actions/auth';

import LoginScreen from '../components/auth/LoginScreen';
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';
import LoadingScreen from '../components/journal/LoadingScreen';

const AppRouter = () => {
	const dispatch = useDispatch();

	const [checkingLogin, setCheckingLogin] = useState(true);
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		onAuthStateChanged(getAuth(), (user) => {
			if (user) {
				dispatch(login(user.uid, user.displayName));
				setIsLoggedIn(true);
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
				{/* main route */}
				<Route path='/' element={<JournalScreen />} />

				<Route path='auth/*' element={<AuthRouter />} />

				<Route path='*' element={<LoginScreen />} />
			</Routes>
		</BrowserRouter>
	);
};

export default AppRouter;
