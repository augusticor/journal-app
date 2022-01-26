import { collection, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

export const startNewNote = () => {
	return (dispatch, getState) => {
		const state = getState();
		const { uid } = state.auth;

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		const noteReference = doc(collection(db, `${uid}/journal/notes`));
		setDoc(noteReference, newNote);
	};
};
