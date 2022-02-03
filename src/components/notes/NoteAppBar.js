import moment from 'moment';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveNoteOnFirebase } from '../../actions/notes';

const NoteAppBar = () => {
	const { active: note } = useSelector((state) => state.notes);
	const noteDate = moment(note.date);

	const dispatch = useDispatch();

	const handleSave = () => {
		dispatch(saveNoteOnFirebase(note));
	};

	return (
		<div className='notes__app-bar'>
			<span>{noteDate.format('dddd, MMMM Do YYYY, h:mm a')}</span>

			<div>
				<button className='btn'>Picture</button>

				<button onClick={handleSave} className='btn'>
					Save
				</button>
			</div>
		</div>
	);
};

export default NoteAppBar;
