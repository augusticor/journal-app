import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { startLogout } from '../../actions/auth';
import { startNewNote } from '../../actions/notes';

import JournalEntries from './JournalEntries';

const Sidebar = () => {
	const { name: userName } = useSelector((sel) => sel.auth);

	const dispatch = useDispatch();

	const handleLogout = () => dispatch(startLogout());

	const handleAddNewEntry = () => {
		dispatch(startNewNote());
	};

	const handleHideSidebar = () => {
		console.log('gotcha !');
	}

	return (
		<aside className='journal__sidebar'>
			<div className='journal__sidebar-navbar'>
				<h3 className='mt-5'>
					<i className='far fa-moon' />
					<span> {userName}</span>
				</h3>

				<button className='btn' onClick={handleLogout}>
					Logout
				</button>
			</div>

			<div className='journal__new-entry' onClick={handleAddNewEntry}>
				<i className='far fa-calendar-plus fa-5x' />
				<p className='mt-5'>New entry</p>
			</div>

			<JournalEntries />

			<i onClick={handleHideSidebar} className='journal__hide-sidebar fa fa-arrow-left fa-2x' aria-hidden='true' />
		</aside>
	);
};

export default Sidebar;
