import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setActiveNote } from '../../../actions/notes';
import JournalEntry from '../../../components/journal/JournalEntry';

// No state not necessary for this component
const mockStoreInitialState = {};
const mockNote = {
	id: 'ENWVboxycDhEorGGl5VV',
	title: 'Testing note 1',
	body: 'Eu id aliqua pariatur laboris voluptate aliquip fugiat non. Labore ipsum qui sit ad mollit commodo cupidatat nisi adipisicing laborum qui',
	imageUrl: 'https://res.cloudinary.com/dg2nreez0/image/upload/v1644623078/samples/animals/kitten-playing.gif',
	date: 1646083697953,
};

// Configure mock store
const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
let store = mockStore(mockStoreInitialState);

// Mock functions
store.dispatch = jest.fn();

// Tests
const wrapper = mount(
	<Provider store={store}>
		<JournalEntry {...mockNote} />
	</Provider>
);

describe('Tests on <JournalEntry/> component', () => {
	test('Should match snapshot', () => expect(wrapper).toMatchSnapshot());

	test('Should call setActiveNote action', () => {
		wrapper.find('.journal__entry').prop('onClick')();

		expect(store.dispatch).toHaveBeenCalled();
		expect(store.dispatch).toHaveBeenCalledTimes(1);
		expect(store.dispatch).toHaveBeenCalledWith(setActiveNote(mockNote.id, { ...mockNote }));
	});

	test('Should render the correct image and note date', () => {
		const journalEntryPicture = wrapper.find('.journal__entry-picture');
		expect(journalEntryPicture.exists()).toBe(true);
		expect(journalEntryPicture.prop('style').backgroundImage).toBe(`url(${mockNote.imageUrl})`);

		expect(wrapper.find('span').text()).toBe('Monday');
		expect(wrapper.find('h4').text()).toBe('28');
	});

	test('Should trim note displayed body text to 65 characters', () => {
		const journalBodyTxt = wrapper.find('.journal__entry-content').text();

		expect(journalBodyTxt.length).toBe(69);
		expect(journalBodyTxt).toBe('Eu id aliqua pariatur laboris voluptate aliquip fugiat non. Labor ...');
	});
});
