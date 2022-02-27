import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote, startDeletingNote } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import NoteAppBar from './NoteAppBar';

const NoteScreen = () => {
	const { active: activeNote } = useSelector((state) => state.notes);
	const dispatch = useDispatch();

	const [formValues, handleInputChange, resetForm] = useForm(activeNote);
	const { title, body, imageUrl } = formValues;

	const activeNoteIdRef = useRef(activeNote.id);

	useEffect(() => {
		if (activeNote.id !== activeNoteIdRef.current) {
			resetForm(activeNote);
			activeNoteIdRef.current = activeNote.id;
		}
	}, [activeNote, resetForm]);

	useEffect(() => {
		dispatch(setActiveNote(formValues.id, { ...formValues }));
	}, [formValues, dispatch]);

	const handleDelete = () => {
		dispatch(startDeletingNote(activeNote.id));
	};

	return (
		<div className='notes__main-content'>
			<NoteAppBar />

			<form className='notes__content animate__animated animate__fadeIn'>
				<input type='text' className='notes__title-input' placeholder='Today was a good day' value={title} name='title' onChange={handleInputChange} />

				<textarea placeholder='What happened today ...' className='notes__text-area' value={body} name='body' onChange={handleInputChange}></textarea>

				<div className='notes__bottom'>
					{
						imageUrl ? 
							(<div className='notes__image'>
								<img src={imageUrl} alt='Sunset three' />
							</div>) : 
							<p>.</p>
					}

					<button type='button' onClick={handleDelete} className='btn btn-danger'>
						<i className='fa fa-trash' />
						&nbsp;
						Delete note
					</button>
				</div>
			</form>

		</div>
	);
};

export default NoteScreen;
