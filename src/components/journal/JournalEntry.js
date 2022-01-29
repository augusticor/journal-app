import React from 'react';
import moment from 'moment';

const JournalEntry = ({ id, title, body, imageUrl, date }) => {
	const noteDate = moment(date);

	return (
		<div className='journal__entry pointer'>
			{imageUrl && <div className='journal__entry-picture' style={{ backgroundSize: 'cover', backgroundImage: `${imageUrl}` }}></div>}

			<div className='journal__entry-body'>
				<p className='journal__entry-title'>{title}</p>
				<p className='journal__entry-content'>{body}</p>
			</div>

			<div className='journal__entry-date-box'>
				<span>{noteDate.format('dddd')}</span>
				<h4>{noteDate.format('D')}</h4>
			</div>
		</div>
	);
};

export default JournalEntry;
