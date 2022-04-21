import { act } from '@testing-library/react';
import { mount } from 'enzyme/build';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { login } from '../../actions/auth';
import AppRouter from '../../routers/AppRouter';

// Store mock initial state
const storeInitialState = {
	auth: {
		name: 'Testing user',
	},
	notes: {
		notes: [],
		active: {},
	},
};

// Mock Store configuration
const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
let store = mockStore(storeInitialState);
store.dispatch = jest.fn();

// Mocked functions
jest.mock('../../actions/auth', () => ({
	login: jest.fn(),
}));

// ---- TESTS ----

describe('Tests on <AppRouter/> component', () => {
	test('Should call login action when user is already authenticated', async () => {
		let user;

		await act(async () => {
			const userCredentials = await signInWithEmailAndPassword(getAuth(), 'test@testingemail.com', '843788frh37hBhbu3');
			user = userCredentials.user;
			// console.log(user);

			const wrapper = mount(
				<Provider store={store}>
					<AppRouter />
				</Provider>
			);
		});

		expect(login).toHaveBeenCalled();
		expect(login).toHaveBeenCalledWith('LHfmkgE8yYWYFw9DowRef03YmoY2', null);
	});
});
