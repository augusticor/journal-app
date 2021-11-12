import React from 'react';

const JournalEntry = () => {
	return (
		<div className='journal__entry pointer'>
			<div
				className='journal__entry-picture'
				style={{ backgroundSize: 'cover', backgroundImage: 'url(https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510__340.jpg)' }}
			></div>

			<div className='journal__entry-body'>
				<p className='journal__entry-title'>Un nuevo día</p>
				<p className='journal__entry-content'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore</p>
			</div>

			<div className='journal__entry-date-box'>
				<span>Monday</span>
				<h4>28</h4>
			</div>
		</div>
	);
};

export default JournalEntry;
