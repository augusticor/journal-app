import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { login, logout, startLoginEmailPassword, startLogout } from '../../actions/auth';
import { types } from '../../types/types';

// Increase jest timeout
jest.setTimeout(10000);

// Configure mock store
const storeInitialState = {
	auth: {
		uid: '3d6558rf8AS46Fd5D46',
		name: 'Testing user',
	},
};

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(storeInitialState);

// --- Tests ---
describe('Tests on auth actions', () => {
	beforeEach(() => {
		store = mockStore(storeInitialState);
	});

	test('Should start login with email and password', async () => {
		await store.dispatch(startLoginEmailPassword('test@testingemail.com', '843788frh37hBhbu3'));

		const actions = store.getActions();
		const [startLoadingAction, loginAction, stopLoadingAction] = actions;

		expect(startLoadingAction).toEqual({ type: types.uiStartLoading });
		expect(loginAction).toEqual({
			type: types.login,
			payload: {
				uid: 'LHfmkgE8yYWYFw9DowRef03YmoY2',
				displayName: null,
			},
		});
		expect(stopLoadingAction).toEqual({ type: types.uiStopLoading });
	});

	test('Should login user', () => {
		const { uid, name } = storeInitialState.auth;
		const loginAction = login(uid, name);

		expect(loginAction).toEqual({
			type: types.login,
			payload: { uid, displayName: name },
		});
	});

	test('Should start logout', async () => {
		await store.dispatch(startLogout());

		const actions = store.getActions();
		const [logoutAction, logoutCleaningAction] = actions;

		expect(logoutAction).toEqual({ type: types.logout });
		expect(logoutCleaningAction).toEqual({ type: types.notesLogoutCleaning });
	});

	test('Should logout user', () => {
		expect(logout()).toEqual({ type: types.logout });
	});
});
