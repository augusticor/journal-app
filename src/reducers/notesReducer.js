import { types } from '../types/types';

/*
state:
{
	notes: [],
	active: {
		id: DA2DADK2,
		title: 'new day...',
		body: 'blablalabla',
		imageUrl: 'https://...',
		date: 13213121
	}
}
*/

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

		case types.notesSetActiveNote:
			return {
				...state,
				active: {
					...action.payload,
				},
			};

		case types.notesLoadNotes:
			return {
				...state,
				notes: action.payload.notes,
			};

		case types.notesUpdateNoteOnSidebar:
			return {
				...state,
				notes: state.notes.map((note) => {
					return note.id === action.payload.id ? action.payload.note : note;
				}),
			};

		case types.notesDeleteNote:
			return {
				...state,
				active: null,
				notes: state.notes.filter((note) => note.id !== action.payload),
			};

		case types.notesLogoutCleaning:
			return initialState;

		case types.notesUpdateNewestAddedNote:
			return {
				...state,
				notes: [...state.notes, action.payload],
			};

		default:
			return state;
	}
};
