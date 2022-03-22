// Mock store configuration, redux-mock-store for testing redux store
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startNewNote } from '../../actions/notes';
import { types } from '../../types/types';
import {  deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebase-config';

// Here go the middlewares if using any
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Uid for testing
const authTestingUid = '3d6558rf8AS46Fd5D46';

const store = mockStore({
	auth: {
		uid: authTestingUid,
	},
});

describe('Tests on notes actions', () => {
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
		const noteReference = doc(db, `${authTestingUid}/journal/notes/${noteId}`);
		await deleteDoc(noteReference);
	});
});
