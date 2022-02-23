export const fileUpload = async (file) => {
	const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dg2nreez0/image/upload';

	const formData = new FormData();
	formData.append('upload_preset', 'react-journal-appa');
	formData.append('file', file);

	try {
		const fetchConfig = {
			method: 'POST',
			body: formData,
		};

		const response = await fetch(cloudinaryUrl, fetchConfig);

		if (response.ok) {
			const cloudinaryResponse = await response.json();
			return cloudinaryResponse.secure_url;
		} else {
			throw await response.json();
		}
	} catch (error) {
		console.log(error);
	}
};
