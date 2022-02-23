import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/firebase-config';
import { types } from '../types/types';
import Swal from 'sweetalert2';
import { loadNotes } from '../helpers/loadNotes';
import { fileUpload } from '../helpers/fileUpload';

//react-journal-appa

export const startNewNote = () => {
	return async (dispatch, getState) => {
		const state = getState();
		const { uid } = state.auth;

		const newNote = {
			title: '',
			body: '',
			imageUrl: '',
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

export const saveNoteOnFirebase = (note) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		if (!note.imageUrl) {
			delete note.imageUrl;
		}

		const noteToFirestore = { ...note };
		delete noteToFirestore.id;

		const noteReference = doc(db, `${uid}/journal/notes/${note.id}`);

		await updateDoc(noteReference, noteToFirestore);

		dispatch(refreshNoteOnSidebar(note.id, noteToFirestore));

		Swal.fire({
			title: 'Saved',
			text: 'Note sucesfully saved',
			icon: 'success',
		});
	};
};

export const refreshNoteOnSidebar = (id, note) => {
	return {
		type: types.notesUpdateNoteOnSidebar,
		payload: {
			id,
			note: {
				id,
				...note,
			},
		},
	};
};

export const startUploading = (file) => {
	return async (dispatch, getState) => {
		const { active: activeNote } = getState().notes;
		console.log(file);

		const fileUrl = await fileUpload(file);
		console.log(fileUrl);
	};
};
