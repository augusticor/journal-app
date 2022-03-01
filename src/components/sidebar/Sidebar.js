import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { startNewNote } from '../../actions/notes';
import { FullSidebar } from './FullSidebar';
import { ReducedSidebar } from './ReducedSidebar';

const Sidebar = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const dispatch = useDispatch();

	const handleAddNewEntry = () => {
		dispatch(startNewNote());
	};

	const handleResizeSidebar = () => {
		setShowSidebar(!showSidebar);
	}

	return (
		<aside className={showSidebar ? 'journal__sidebar' : 'journal__sidebar-mini'}>
			{
				showSidebar ? 
				<FullSidebar handleAddNewEntry={handleAddNewEntry} handleResizeSidebar={handleResizeSidebar} /> 
				: 
				<ReducedSidebar handleAddNewEntry={handleAddNewEntry} handleResizeSidebar={handleResizeSidebar} />
			}
		</aside>
	);
};

export default Sidebar;