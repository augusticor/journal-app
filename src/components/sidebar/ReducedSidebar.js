import React from "react";
import PropTypes from "prop-types";

export const ReducedSidebar = ({ handleAddNewEntry, handleResizeSidebar: handleExpandSidebar }) => {
	return (
		<>
			<i className='far fa-moon' />

			<div className='journal__new-entry' onClick={handleAddNewEntry}>
				<i className='far fa-calendar-plus fa-2x' />
			</div>

			<i onClick={handleExpandSidebar} className='fa fa-arrow-right fa-2x' style={{ cursor: "pointer" }} aria-hidden='true' />
		</>
	);
};

ReducedSidebar.propTypes = {
	handleAddNewEntry: PropTypes.func.isRequired,
	handleResizeSidebar: PropTypes.func.isRequired,
};
