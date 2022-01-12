import { types } from '../types/types';
import { googleAuthProvider } from '../firebase/firebase-config';
import { updateProfile, createUserWithEmailAndPassword, getAuth, signInWithPopup } from 'firebase/auth';

export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		setTimeout(() => {
			dispatch(login(123, 'Pedro'));
		}, 2500);
	};
};

export const startRegisterUser = (email, password, userName) => {
	return (dispatch) => {
		createUserWithEmailAndPassword(getAuth(), email, password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName: userName });

				dispatch(login(user.uid, userName));
			})
			.catch((e) => console.log(e));
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
