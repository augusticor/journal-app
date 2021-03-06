import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { setActiveNote } from '../../actions/notes';

const JournalEntry = ({ id, title, body, imageUrl, date }) => {
	const noteDate = moment(date);

	const dispatch = useDispatch();

	const handleEntryClick = () => dispatch(setActiveNote(id, { id, title, body, imageUrl, date }));

	//
	return (
		<div className='journal__entry pointer animate__animated animate__slideInLeft' onClick={handleEntryClick}>
			{imageUrl && <div className='journal__entry-picture' style={{ backgroundSize: 'cover', backgroundImage: `url(${imageUrl})` }}></div>}

			<div className='journal__entry-body'>
				<p className='journal__entry-title'>
					{title.length > 32 ? `${title.substring(0, 29)} ...` : title}
				</p>

				<p className='journal__entry-content'>
					{body.length > 72 ? `${body.substring(0, 65)} ...` : body}
				</p>
			</div>

			<div className='journal__entry-date-box'>
				<span>{noteDate.format('dddd')}</span>
				<h4>{noteDate.format('D')}</h4>
			</div>
		</div>
	);
};

export default JournalEntry;
