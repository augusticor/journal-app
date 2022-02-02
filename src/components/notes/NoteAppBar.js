import moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';

const NoteAppBar = () => {
	const { active: note } = useSelector((state) => state.notes);
	const noteDate = moment(note.date);

	return (
		<div className='notes__app-bar'>
			<span>{noteDate.format('dddd, MMMM Do YYYY, h:mm a')}</span>

			<div>
				<button className='btn'>Picture</button>

				<button className='btn'>Save</button>
			</div>
		</div>
	);
};

export default NoteAppBar;
