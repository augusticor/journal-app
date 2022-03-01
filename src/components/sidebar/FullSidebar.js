import React from "react";
import PropTypes from "prop-types";

import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import JournalEntries from "../journal/JournalEntries";

export const FullSidebar = ({ handleAddNewEntry, handleResizeSidebar: handleReduceSidebar }) => {
	const dispatch = useDispatch();

	const { name: userName } = useSelector((sel) => sel.auth);

	const handleLogout = () => dispatch(startLogout());

	return (
		<>
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

			<i onClick={handleReduceSidebar} className='journal__hide-sidebar fa fa-arrow-left fa-2x' aria-hidden='true' />
		</>
	);
};

FullSidebar.propTypes = {
	handleAddNewEntry: PropTypes.func.isRequired,
	handleResizeSidebar: PropTypes.func.isRequired,
};
