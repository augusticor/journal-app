import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { setActiveNote, startDeletingNote } from '../../../actions/notes';
import NoteScreen from '../../../components/notes/NoteScreen';

const mockStoreInitialState = {
	notes: {
		notes: [],
		active: {
			id: 'ENWVboxycDhEorGGl5VV',
			title: 'Testing note 1',
			body: 'Eu id aliqua pariatur laboris voluptate aliquip fugiat non. Labore ipsum qui sit ad mollit commodo cupidatat nisi adipisicing laborum qui',
			date: 1646083697953,
		},
	},
};

// Configure mock store
const middlewares = [thunk];
const mockStore = createMockStore(middlewares);
let store = mockStore(mockStoreInitialState);

// Mock functions
store.dispatch = jest.fn();

jest.mock('../../../actions/notes', () => {
	return {
		setActiveNote: jest.fn(),
		startDeletingNote: jest.fn(),
	};
});

// ******* TESTS *******
const wrapper = mount(
	<Provider store={store}>
		<NoteScreen />
	</Provider>
);

describe('Tests on <NoteScreen/> component', () => {
	test('Should match snapshot', () => expect(wrapper).toMatchSnapshot());

	test('Should call setActiveNote action when note body changes', () => {
		const temporalNote = {
			...mockStoreInitialState.notes.active,
			body: 'Eu id aliqua pariatur laboris voluptate aliquip fugiat non.',
		};

		wrapper.find('textarea').simulate('change', {
			target: {
				name: 'body',
				value: 'Eu id aliqua pariatur laboris voluptate aliquip fugiat non.',
			},
		});

		expect(setActiveNote).toHaveBeenCalled();
		expect(setActiveNote).toHaveBeenCalledTimes(1);
		expect(setActiveNote).toHaveBeenCalledWith(temporalNote.id, { ...temporalNote });
	});

	test('Should not find image and date should be correct', () => {
		expect(wrapper.find('.img').exists()).toBeFalsy();
		expect(wrapper.find('span').text().trim()).toBe('Monday, February 28th 2022, 4:28 pm');
	});

	test('Should call startDeletingNote action when delete button is pressed', () => {
		const btnDeleteNote = wrapper.find('button').last();
		btnDeleteNote.prop('onClick')();

		expect(startDeletingNote).toHaveBeenCalled();
		expect(startDeletingNote).toHaveBeenCalledTimes(1);
	});
});
