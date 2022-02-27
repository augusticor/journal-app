import React from 'react';
import { useSelector } from 'react-redux';

import NoteScreen from '../notes/NoteScreen';
import NothingSelected from './NothingSelected';
import SideBar from './Sidebar';

const JournalScreen = () => {
	const { active } = useSelector((selector) => selector.notes);

	return (
		<div className='journal__main-content animate__animated animate__fadeIn'>
			<SideBar />

			<main>{active ? <NoteScreen /> : <NothingSelected />}</main>
		</div>
	);
};

export default JournalScreen;
