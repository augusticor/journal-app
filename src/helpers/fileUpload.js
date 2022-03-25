export const fileUpload = async (file) => {
	const cloudinaryUrl = process.env.REACT_APP_CLOUDINARYURL;

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
			return null;
		}
	} catch (error) {
		console.log(error);
	}
};
