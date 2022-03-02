import { fileUpload } from '../../helpers/fileUpload';

describe('Tests on fileUpload', () => {
	test('Should load a file and return the image url', async () => {
		const response = await fetch('https://imgv3.fotor.com/images/homepage-feature-card/Upload-an-image.jpg');
		const fileBlobPart = await response.blob();
		const file = new File([fileBlobPart], 'image.jpg');

		const cloudinaryUrl = await fileUpload(file);

		expect(typeof cloudinaryUrl).toBe('string');
	});

	test('Should return error', async () => {
		const file = new File([], 'image.png');

		const cloudinaryUrl = await fileUpload(file);

		expect(cloudinaryUrl).toBe(null);
	});
});
