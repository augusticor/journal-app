import moment from 'moment';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { saveNoteOnFirebase, startUploading } from '../../actions/notes';

const NoteAppBar = () => {
	const { active: note } = useSelector((state) => state.notes);
	const noteDate = moment(note.date);

	const dispatch = useDispatch();

	const handlePictureUpload = () => {
		document.getElementById('inputFileSelector').click();
	};

	const handleSave = () => {
		dispatch(saveNoteOnFirebase(note));
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			dispatch(startUploading(file));
		}
	};

	return (
		<div className='notes__app-bar'>
			<span>{noteDate.format('dddd, MMMM Do YYYY, h:mm a')}</span>

			<input id='inputFileSelector' type='file' style={{ display: 'none' }} onChange={handleFileChange} />

			<div>
				<button onClick={handlePictureUpload} className='btn'>
					Picture
				</button>

				<button onClick={handleSave} className='btn'>
					Save
				</button>
			</div>
		</div>
	);
};

export default NoteAppBar;
