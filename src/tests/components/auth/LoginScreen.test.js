import LoginScreen from '../../../components/auth/LoginScreen';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { startGoogleLogin, startLoginEmailPassword } from '../../../actions/auth';

// Store mocked initial state
const storeInitialState = {
	auth: {},
	ui: {
		loading: false,
	},
};

// Configure mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
let store = mockStore(storeInitialState);
store.dispatch = jest.fn();

// Functions Mocks
jest.mock('../../../actions/auth', () => {
	return {
		startGoogleLogin: jest.fn(),
		startLoginEmailPassword: jest.fn(),
	};
});

// --- Tests ---
const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<LoginScreen />
		</MemoryRouter>
	</Provider>
);

describe('Tests on <LoginScreen /> component', () => {
	beforeEach(() => {
		store = mockStore(storeInitialState);
		jest.clearAllMocks();
	});

	test('Should match snapshot', () => expect(wrapper).toMatchSnapshot());

	test('Should startGoogleLogin action when Sign in with google btn is clicked', () => {
		wrapper.find('.google-btn').prop('onClick')();

		expect(startGoogleLogin).toHaveBeenCalled();
	});

	test('Should startLoginWithEmailPassword action when Login btn is clicked', () => {
		const inputEmail = wrapper.find('#lblemail');
		inputEmail.simulate('change', { target: { name: 'email', value: 'test@testingemail.com' } });

		const inputPassword = wrapper.find('#lblpass');
		inputPassword.simulate('change', { target: { name: 'password', value: 'SuperPassword#$3579' } });

		const loginButton = wrapper.find('form');
		loginButton.simulate('submit', { preventDefault() {} });

		expect(startLoginEmailPassword).toHaveBeenCalled();
		expect(startLoginEmailPassword).toHaveBeenCalledWith('test@testingemail.com', 'SuperPassword#$3579');
	});
});
