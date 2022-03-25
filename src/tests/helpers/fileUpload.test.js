import { fileUpload } from '../../helpers/fileUpload';
import cloudinary from 'cloudinary';

cloudinary.config({
	cloud_name: process.env.REACT_APP_CLOUD_NAME,
	api_key: process.env.REACT_APP_API_KEY,
	api_secret: process.env.REACT_APP_API_SECRET,
	secure: process.env.REACT_APP_SECURE,
});

describe('Tests on file upload to cloudinary', () => {
	test('Should upload a file and return the URL matching the pattern', async () => {
		const resp = await fetch('https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg');
		const blob = await resp.blob();

		const file = new File([blob], 'tree.jpg');

		const url = await fileUpload(file);
		const cloudName = process.env.REACT_APP_CLOUD_NAME;

		const regex = new RegExp('https://res.cloudinary.com/' + cloudName + '/image/upload/v\\d*/\\w*.jpg');

		expect(url).toMatch(regex);

		//delete image after upload by ID
		const urlSegments = url.split('/');
		const imageId = urlSegments[urlSegments.length - 1].replace('.jpg', '');
		cloudinary.v2.api.delete_resources(imageId);
	});

	//
	test('Should return an error', async () => {
		const file = new File([], 'foto.png');
		const url = await fileUpload(file);

		expect(url).toBe(null);
	});
});
