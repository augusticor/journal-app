import { collection, deleteDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
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

		Swal.fire({
			title: 'Upload',
			text: 'Uploading image ...',
			allowOutsideClick: false,
			allowEscapeKey: false,
			didOpen: () => {
				Swal.showLoading();
			},
			didClose: () => {
				Swal.fire({
					title: 'Upload',
					text: 'Picture uploaded !',
					icon: 'success',
				});
			},
		});

		const fileUrl = await fileUpload(file);
		activeNote.imageUrl = fileUrl;

		Swal.close();

		dispatch(saveNoteOnFirebase(activeNote));
	};
};

export const startDeletingNote = (id) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const noteReference = doc(db, `${uid}/journal/notes/${id}`);

		await deleteDoc(noteReference);
		dispatch(deleteNoteStore(id));

		Swal.fire({
			title: 'Delete',
			text: 'Note deleted',
			icon: 'success',
		});
	};
};

export const deleteNoteStore = (id) => {
	return {
		type: types.notesDeleteNote,
		payload: id,
	};
};
