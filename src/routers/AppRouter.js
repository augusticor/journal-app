import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LoginScreen from '../components/auth/LoginScreen';
import JournalScreen from '../components/journal/JournalScreen';
import AuthRouter from './AuthRouter';

const AppRouter = () => {
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
