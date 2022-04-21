import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startLogout } from '../../../actions/auth';
import { FullSidebar } from '../../../components/sidebar/FullSidebar';

const mockStoreInitialState = {
	auth: { name: 'Testing user' },
	notes: { notes: [] },
};

// Configure mock store
const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
let store = mockStore(mockStoreInitialState);

// Mock functions
store.dispatch = jest.fn();
const handleAddNewEntry = jest.fn();
const handleResizeSidebar = jest.fn();

jest.mock('../../../actions/auth', () => ({
	startLogout: jest.fn(),
}));

// TESTS
const wrapper = mount(
	<Provider store={store}>
		<FullSidebar handleAddNewEntry={handleAddNewEntry} handleResizeSidebar={handleResizeSidebar} />
	</Provider>
);

describe('Test on <FullSidebar/> component', () => {
	test('Should match snapshot', () => expect(wrapper).toMatchSnapshot());

	test('Should show logged username on sidebar', () => {
		const span = wrapper.find('span');
		expect(span.text()).toBe(' ' + mockStoreInitialState.auth.name);
	});

	test('Should call startLogout action', () => {
		wrapper.find('.btn').prop('onClick')();

		expect(startLogout).toHaveBeenCalled();
		expect(startLogout).toHaveBeenCalledTimes(1);
	});

	test('Should call handleAddNewEntry function', () => {
		const divHandleAddNewEntry = wrapper.find('.journal__new-entry');
		divHandleAddNewEntry.simulate('click');

		expect(handleAddNewEntry).toHaveBeenCalled();
		expect(handleAddNewEntry).toHaveBeenCalledTimes(1);
	});

	test('Should call handleResizeSidebar function', () => {
		const resizeBarIcon = wrapper.find('i').last();
		resizeBarIcon.prop('onClick')();

		expect(handleResizeSidebar).toHaveBeenCalled();
		expect(handleResizeSidebar).toHaveBeenCalledTimes(1);
	});

	test('Should render 3 divs and icons should have appropiate size', () => {
		expect(wrapper.find('div')).toHaveLength(3);

		const icons = wrapper.find('i');
		icons.forEach((icon) => {
			expect(icon.hasClass(/fa-\w+/)).toBeTruthy();
		});

		expect(icons.at(1).prop('className')).toBe('far fa-calendar-plus fa-5x');
		expect(icons.last().prop('className')).toBe('journal__hide-sidebar fa fa-arrow-left fa-2x');
	});
});
