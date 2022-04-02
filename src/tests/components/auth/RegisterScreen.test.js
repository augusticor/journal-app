import thunk from 'redux-thunk';
import createMockStore from 'redux-mock-store';
import { mount } from 'enzyme';
import RegisterScreen from '../../../components/auth/RegisterScreen';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { showUIError, hideUIError } from '../../../actions/ui';
import { startRegisterUser } from '../../../actions/auth';

// Store mocked initial state
const storeMockInitialState = {
	ui: {
		loading: false,
		message: '',
	},
};

// Configure mock store
const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
let store = mockStore(storeMockInitialState);
store.dispatch = jest.fn();

// Mocked functions
jest.mock('../../../actions/ui', () => {
	return {
		showUIError: jest.fn(),
		hideUIError: jest.fn(),
	};
});

jest.mock('../../../actions/auth', () => {
	return {
		startRegisterUser: jest.fn(),
	};
});

// ------ Tests ------
const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<RegisterScreen />
		</MemoryRouter>
	</Provider>
);

describe('Tests on <RegisterScreen/> component', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		store = mockStore(storeMockInitialState);
	});

	test('Should match snapshot', () => expect(wrapper).toMatchSnapshot());

	test('Should dispatch showUIError to show error when email is not valid', () => {
		wrapper.find('#lblusername').simulate('change', { target: { name: 'username', value: 'Test User name' } });
		// Now username input has a value and the other ones are still empty

		// form submit
		wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

		// Functions asserts
		expect(showUIError).toHaveBeenCalled();
		expect(showUIError).toHaveBeenCalledWith(expect.any(String), 'Not valid email');
		expect(showUIError).toHaveBeenCalledTimes(1);
		expect(startRegisterUser).toHaveBeenCalledTimes(0);
		expect(startRegisterUser).not.toHaveBeenCalled();
	});

	test('Should show a preloaded password error message', () => {
		const storeInitialState = {
			ui: {
				loading: false,
				message: 'Passwords should be at least 7 characters long',
			},
		};

		const store = mockStore(storeInitialState);

		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter>
					<RegisterScreen />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find('.auth__alert-error').exists()).toBeTruthy();
		expect(wrapper.find('.auth__alert-error').text().trim()).toBe(storeInitialState.ui.message);
		expect(wrapper).toMatchSnapshot();
	});

	test('Should dispatch showUIError to show error when passwords do not match', () => {
		// Fill form with data
		wrapper.find('#lblusername').simulate('change', { target: { name: 'username', value: 'Test User name' } });
		wrapper.find('#lblemail').simulate('change', { target: { name: 'email', value: 'testemail@email.com' } });
		wrapper.find('#lblpass').simulate('change', { target: { name: 'password', value: 'SuperstrongPassword1$%' } });
		wrapper.find('#lblpass2').simulate('change', { target: { name: 'password2', value: 'Weakpassword' } });

		wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

		expect(showUIError).toHaveBeenCalled();
		expect(showUIError).toHaveBeenCalledWith(expect.any(String), 'Passwords do not match');
		expect(showUIError).toHaveBeenCalledTimes(1);
		expect(startRegisterUser).toHaveBeenCalledTimes(0);
		expect(startRegisterUser).not.toHaveBeenCalled();

		expect(wrapper).toMatchSnapshot();
	});

	test('Should send the form to register the user if the form is valid', () => {
		// Fill form with correct data
		wrapper.find('#lblusername').simulate('change', { target: { name: 'username', value: 'Test User name' } });
		wrapper.find('#lblemail').simulate('change', { target: { name: 'email', value: 'testemail@email.com' } });
		wrapper.find('#lblpass').simulate('change', { target: { name: 'password', value: 'SuperstrongPassword1$%' } });
		wrapper.find('#lblpass2').simulate('change', { target: { name: 'password2', value: 'SuperstrongPassword1$%' } });

		wrapper.find('form').prop('onSubmit')({ preventDefault() {} });

		expect(showUIError).not.toHaveBeenCalled();
		expect(showUIError).toHaveBeenCalledTimes(0);
		expect(hideUIError).toHaveBeenCalled();
		expect(hideUIError).toHaveBeenCalledTimes(1);

		expect(startRegisterUser).toHaveBeenCalled();
		expect(startRegisterUser).toHaveBeenCalledTimes(1);
		expect(startRegisterUser).toHaveBeenCalledWith('testemail@email.com', 'SuperstrongPassword1$%', 'Test User name');
	});
});
