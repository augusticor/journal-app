import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import JournalScreen from '../components/journal/JournalScreen';
import LoadingScreen from '../components/journal/LoadingScreen';

const JournalRouter = () => {
	return (
		<Routes>
			<Route index element={<JournalScreen />} />

			<Route path='loading' element={<LoadingScreen />} />

			<Route path='*' element={<Navigate to={'/'} />} />
		</Routes>
	);
};

export default JournalRouter;
