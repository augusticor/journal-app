import { shallow } from 'enzyme';
import { ReducedSidebar } from '../../../components/sidebar/ReducedSidebar';

// Mock functions
const handleAddNewEntry = jest.fn();
const handleResizeSidebar = jest.fn();

// TESTS
const wrapper = shallow(<ReducedSidebar handleAddNewEntry={handleAddNewEntry} handleResizeSidebar={handleResizeSidebar} />);

describe('Test on <FullSidebar/> component', () => {
	test('Should match snapshot', () => expect(wrapper).toMatchSnapshot());

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

	test('Should render 1 div and icons should have appropiate size', () => {
		expect(wrapper.find('div')).toHaveLength(1);

		const icons = wrapper.find('i');
		icons.forEach((icon) => {
			expect(icon.hasClass(/fa-\w+/)).toBeTruthy();
		});

		expect(icons.at(1).prop('className')).toBe('far fa-calendar-plus fa-2x');
		expect(icons.last().prop('className')).toBe('fa fa-arrow-right fa-2x');
	});
});
