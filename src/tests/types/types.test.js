import { types } from '../../types/types';

describe('Tests on types', () => {
	test('Should match types object', () => {
		expect(types).toEqual({
			login: '[Auth] Login',
			logout: '[Auth] Logout',

			uiShowError: '[UI] Show Error',
			uiHideError: '[UI] Hide Error',
			uiStartLoading: '[UI] Start Loading',
			uiStopLoading: '[UI] Stop Loading',

			notesCreateNote: '[Notes] Create Note',
			notesSetActiveNote: '[Notes] Set Active Note',
			notesLoadNotes: '[Notes] Load Notes',
			notesUpdateNoteOnSidebar: '[Notes] Update Note',
			notesUpdateNewestAddedNote: '[Notes] Update Newest Added Note',
			notesDeleteNote: '[Notes] Delete Note',
			notesLogoutCleaning: '[Notes] Logout Cleaning',
		});
	});
});
