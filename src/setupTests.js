import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { createSerializer } from 'enzyme-to-json';
import Swal from 'sweetalert2';

Enzyme.configure({ adapter: new Adapter() });
expect.addSnapshotSerializer(createSerializer({ mode: 'deep' }));

// Global mock for sweet alert 2
jest.mock('sweetalert2', () => {
	return {
		fire: jest.fn(),
		close: jest.fn(),
	};
});
