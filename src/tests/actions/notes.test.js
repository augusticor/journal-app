/**
 * @jest-environment node
 */

// this comment is because of the bug
// stackoverflow.com/questions/70327245/cant-write-firestore-tests-because-of-firestore-9-6-1-internal-assertion-fai
// Mock store configuration, redux-mock-store for testing redux store
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	addNewestNoteToSideBar,
	cleanNotesOnLogout,
	deleteNoteStore,
	loadNotesOnReduxStore,
	refreshNoteOnSidebar,
	saveNoteOnFirebase,
	setActiveNote,
	startDeletingNote,
	startLoadingNotesFromFirebase,
	startNewNote,
} from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { types } from '../../types/types';

// Here go the middlewares if using any
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const storeInitialState = {
	auth: {
		uid: '3d6558rf8AS46Fd5D46',
		name: 'Testing user',
	},
	notes: {
		notes: [
			{
				id: 'Axgco59TY0otVxyaSykc',
				title: 'Testing note 1',
				body: 'Eu id aliqua pariatur laboris voluptate aliquip fugiat non. Labore ipsum qui sit ad mollit commodo cupidatat nisi adipisicing laborum qui.',
				imageUrl: '',
				date: 1646083697953,
			},
			{
				id: 'XW18hSeTcwtyEzWDW74X',
				title: 'Testing note 2',
				body: 'Reprehenderit consectetur commodo officia ex sunt ex.',
				imageUrl: '',
				date: 1646081373439,
			},
		],
		active: {
			id: 'Axgco59TY0otVxyaSykc',
			title: 'Testing note 1',
			body: 'Eu id aliqua pariatur laboris voluptate aliquip fugiat non. Labore ipsum qui sit ad mollit commodo cupidatat nisi adipisicing laborum qui.',
			imageUrl: '',
			date: 1646083697953,
		},
	},
};

// Store mock for testing
let store = mockStore(storeInitialState);

describe('Tests on notes actions', () => {
	beforeEach(() => {
		store = mockStore(storeInitialState);
	});

	test('Should create a new note startNewNote', async () => {
		await store.dispatch(startNewNote());

		// Gets all the actions that will be called by the reducer
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesSetActiveNote,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				imageUrl: '',
				date: expect.any(Number),
			},
		});

		expect(actions[1]).toEqual({
			type: types.notesUpdateNewestAddedNote,
			payload: {
				id: expect.any(String),
				title: '',
				body: '',
				imageUrl: '',
				date: expect.any(Number),
			},
		});

		// Delete note after test
		const { id: noteId } = actions[0].payload;
		const noteReference = doc(db, `${storeInitialState.auth.uid}/journal/notes/${noteId}`);
		await deleteDoc(noteReference);
	});

	test('Should set a note as active', () => {
		const { notes } = storeInitialState.notes;
		const activeNote = setActiveNote(notes[0].id, notes[0]);

		expect(activeNote).toEqual({ type: types.notesSetActiveNote, payload: storeInitialState.notes.active });
	});

	test('Should start loading notes from firebase', async () => {
		await store.dispatch(startLoadingNotesFromFirebase(storeInitialState.auth.uid));

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesLoadNotes,
			payload: {
				notes: expect.any(Array),
			},
		});

		const expectedValues = {
			id: expect.any(String),
			title: expect.any(String),
			body: expect.any(String),
			imageUrl: expect.any(String),
			date: expect.any(Number),
		};

		expect(actions[0].payload.notes[0]).toMatchObject(expectedValues);
	});

	test('Should match notes to set in store loadNotesOnReduxStore', () => {
		const storeState = loadNotesOnReduxStore(storeInitialState.notes.notes);
		expect(storeState).toEqual({
			type: types.notesLoadNotes,
			payload: { notes: storeInitialState.notes.notes },
		});
	});

	test('Should save a note on firebase', async () => {
		const note = {
			id: 'ENWVboxycDhEorGGl5VV',
			title: 'Real note on firebase',
			body: 'Ad ut tempor quis dolor mollit ad.',
			imageUrl: '',
			date: 1648050955451,
		};

		await store.dispatch(saveNoteOnFirebase(note));
		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesUpdateNoteOnSidebar,
			payload: {
				id: 'ENWVboxycDhEorGGl5VV',
				note: expect.any(Object),
			},
		});

		expect(actions[0].payload.note).toEqual(note);

		const noteReference = doc(db, `${storeInitialState.auth.uid}/journal/notes/${note.id}`);
		const noteFromFirebase = await getDoc(noteReference);
		expect(noteFromFirebase.data().body).toBe(note.body);
	});

	test('Should refresh note on sidebar', () => {
		const noteToRefresh = storeInitialState.notes.notes[0];
		const refreshAction = refreshNoteOnSidebar(noteToRefresh.id, noteToRefresh);

		expect(refreshAction).toEqual({
			type: types.notesUpdateNoteOnSidebar,
			payload: {
				id: noteToRefresh.id,
				note: noteToRefresh,
			},
		});
	});

	test('Should start uploading an image', () => {
		// to do ...
	});

	test('Should start deleting note', async () => {
		await store.dispatch(startNewNote());
		const actions = store.getActions();
		const { id } = actions[0].payload;

		await store.dispatch(startDeletingNote(id));

		expect(actions[2]).toEqual({
			type: types.notesDeleteNote,
			payload: id,
		});

		const noteReference = doc(db, `${storeInitialState.auth.uid}/journal/notes/${id}`);
		const noteDocSnap = await getDoc(noteReference);
		expect(noteDocSnap.exists()).toBeFalsy();
	});

	test('Should return the object to delete a note from store', () => {
		const id = storeInitialState.notes.notes[0].id;
		expect(deleteNoteStore(id)).toEqual({ type: types.notesDeleteNote, payload: id });
	});

	test('Should clean notes from store', () => expect(cleanNotesOnLogout()).toEqual({ type: types.notesLogoutCleaning }));

	test('Should add newest note to sidebar', () => {
		const note = storeInitialState.notes.notes[0];
		const newestNoteAction = addNewestNoteToSideBar(note.id, note);

		expect(newestNoteAction).toEqual({
			type: types.notesUpdateNewestAddedNote,
			payload: note,
		});
	});
});
