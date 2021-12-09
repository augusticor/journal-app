import { types } from '../types/types';

export const login = (uid, displayName) => {
	//action :
	return {
		type: types.login,
		payload: {
			uid,
			displayName,
		},
	};
};
