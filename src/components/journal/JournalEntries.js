import React from 'react';
import { useSelector } from 'react-redux';
import JournalEntry from './JournalEntry';

const JournalEntries = () => {
	const { notes } = useSelector((state) => state.notes);

	return (
		<div className='journal__entries'>
			{notes.map((inote) => (
				<JournalEntry key={inote.id} {...inote} />
			))}
		</div>
	);
};

export default JournalEntries;
