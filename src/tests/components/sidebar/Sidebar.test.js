import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Sidebar from '../../../components/sidebar/Sidebar';

const mockStoreInitialState = {
	auth: { name: 'Testing user' },
	notes: { notes: [] },
};

// Configure mock store
const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
let store = mockStore(mockStoreInitialState);

// Mock functions
// TODO ...

// ******* TESTS *******
const wrapper = mount(
	<Provider store={store}>
		<Sidebar />
	</Provider>
);

describe('Tests on <Sidebar/> component', () => {
	test('Should match snapshot', () => expect(wrapper).toMatchSnapshot());

	// TODO TEST useState changes ...
	
});
