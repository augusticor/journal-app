import { types } from '../types/types';
import { signInWithPopup, getAuth, googleAuthProvider } from '../firebase/firebase-config';

export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(login(123, 'Pedro'));
		}, 2500);
	};
};

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

export const startGoogleLogin = () => {
	return (dispatch) => {
		//extract user from userCredential object from google auth
		signInWithPopup(getAuth(), googleAuthProvider)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
			})
			.catch((error) => {
				console.log('Error start google login :: ', error);
			});
	};
};
