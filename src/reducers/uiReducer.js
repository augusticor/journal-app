import { types } from '../types/types';

const initialState = {
	loading: false,
	errorCode: '000',
	message: null,
};

export const uiReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.uiShowError:
			return {
				...state,
				errorCode: action.payload.errorCode,
				message: action.payload.message,
			};

		case types.uiHideError:
			return initialState;

		default:
			return state;
	}
};
