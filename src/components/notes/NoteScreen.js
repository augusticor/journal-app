import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import NoteAppBar from './NoteAppBar';

const NoteScreen = () => {
	const { active: activeNote } = useSelector((state) => state.notes);

	const [formValues, handleInputChange, resetForm] = useForm(activeNote);
	const { title, body, imageUrl } = formValues;

	const activeNoteIdRef = useRef(activeNote.id);

	useEffect(() => {
		if (activeNote.id !== activeNoteIdRef.current) {
			resetForm(activeNote);
			activeNoteIdRef.current = activeNote.id;
		}
	}, [activeNote, resetForm]);

	return (
		<div className='notes__main-content'>
			<NoteAppBar />

			<form className='notes__content'>
				<input type='text' className='notes__title-input' placeholder='Today was a good day' value={title} onChange={handleInputChange} />

				<textarea placeholder='What happened today ...' className='notes__text-area' value={body} onChange={handleInputChange}></textarea>

				{imageUrl && (
					<div className='notes__image'>
						<img src='https://thegoalchaser.com/wp-content/uploads/Self-Inspirational-Quotes.jpg.webp' alt='Sunset three' />
					</div>
				)}
			</form>
		</div>
	);
};

export default NoteScreen;
