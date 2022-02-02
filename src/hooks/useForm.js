import { useState } from 'react';

export const useForm = (initialState = {}) => {
	const [formValues, setFormValues] = useState(initialState);

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value,
		});
	};

	const resetForm = (newFormState = initialState) => {
		setFormValues(newFormState);
	};

	return [formValues, handleInputChange, resetForm];
};
