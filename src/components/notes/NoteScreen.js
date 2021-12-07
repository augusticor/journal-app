import React from 'react';
import NoteAppBar from './NoteAppBar';

const NoteScreen = () => {
	return (
		<div className='notes__main-content'>
			<NoteAppBar />

			<form className='notes__content'>
				<input type='text' className='notes__title-input' placeholder='Today was a good day' />

				<textarea placeholder='What happened today ...' className='notes__text-area'></textarea>

				<div className='notes__image'>
					<img src='https://thegoalchaser.com/wp-content/uploads/Self-Inspirational-Quotes.jpg.webp' alt='Sunset three' />
				</div>
			</form>
		</div>
	);
};

export default NoteScreen;
