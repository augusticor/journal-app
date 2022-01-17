import { types } from '../types/types';
import { googleAuthProvider } from '../firebase/firebase-config';
import { updateProfile, createUserWithEmailAndPassword, getAuth, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { startLoading, stopLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		dispatch(startLoading());

		signInWithEmailAndPassword(getAuth(), email, password)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));

				dispatch(stopLoading());
			})

			.catch((error) => {
				console.log(error);
				dispatch(stopLoading());
			});
	};
};

export const startRegisterUser = (email, password, userName) => {
	return (dispatch) => {
		dispatch(startLoading());

		createUserWithEmailAndPassword(getAuth(), email, password)
			.then(async ({ user }) => {
				await updateProfile(user, { displayName: userName });

				dispatch(login(user.uid, userName));
				dispatch(stopLoading());
			})
			.catch((e) => {
				dispatch(stopLoading());
				console.log(e);
			});
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
		dispatch(startLoading());

		//extract user from userCredential object from google auth
		signInWithPopup(getAuth(), googleAuthProvider)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));
				dispatch(stopLoading());
			})
			.catch((error) => {
				console.log('Error start google login :: ', error);
				dispatch(stopLoading());
			});
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		await signOut(getAuth());

		dispatch(logout());
	};
};

export const logout = () => ({ type: types.logout });
