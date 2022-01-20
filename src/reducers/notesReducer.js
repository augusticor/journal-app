import { types } from '../types/types';

const initialState = {
	notes: [],
	active: null,
};

export const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.notesCreateNote:
			return {
				note: 'Nueva nota',
			};

		default:
			return state;
	}
};
