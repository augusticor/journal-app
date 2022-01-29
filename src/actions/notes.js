import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import { loadNotes } from '../helpers/loadNotes';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		const state = getState();
		const { uid } = state.auth;

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		const noteReference = doc(collection(db, `${uid}/journal/notes`));
		await setDoc(noteReference, newNote);

		dispatch(setActiveNote(noteReference.id, newNote));
	};
};

export const setActiveNote = (id, note) => {
	return {
		type: types.notesSetActiveNote,
		payload: {
			id,
			...note,
		},
	};
};

export const startLoadingNotesFromFirebase = (uid) => {
	return async (dispatch) => {
		const notes = await loadNotes(uid);
		dispatch(loadNotesOnReduxStore(notes));
	};
};

export const loadNotesOnReduxStore = (notes = []) => {
	return {
		type: types.notesLoadNotes,
		payload: {
			notes,
		},
	};
};
