import { types } from '../types/types';

export const showUIError = (errorCode, errorMessage) => {
	return {
		type: types.uiShowError,
		payload: {
			errorCode: errorCode,
			message: errorMessage,
		},
	};
};

export const hideUIError = () => {
	return {
		type: types.uiHideError,
	};
};

export const startLoading = () => {
	return {
		type: types.uiStartLoading,
	};
};

export const stopLoading = () => ({ type: types.uiStopLoading });
