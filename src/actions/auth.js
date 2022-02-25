import { types } from '../types/types';
import { googleAuthProvider } from '../firebase/firebase-config';
import { updateProfile, createUserWithEmailAndPassword, getAuth, signInWithPopup, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import Swal from 'sweetalert2';

import { startLoading, stopLoading } from './ui';
import { cleanNotesOnLogout } from './notes';

export const startLoginEmailPassword = (email, password) => {
	return (dispatch) => {
		dispatch(startLoading());

		signInWithEmailAndPassword(getAuth(), email, password)
			.then(({ user }) => {
				dispatch(login(user.uid, user.displayName));

				dispatch(stopLoading());
			})

			.catch(() => {
				dispatch(stopLoading());

				Swal.fire({
					title: 'Error on Login',
					text: 'Wrong email or password',
					icon: 'error',
				});
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
				Swal.fire({
					title: 'Register Error',
					text: 'Email address is already in use',
					icon: 'error',
				});
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
				dispatch(stopLoading());
				Swal.fire({
					text: 'Login with google error',
					icon: 'error',
				});
			});
	};
};

export const startLogout = () => {
	return async (dispatch) => {
		await signOut(getAuth());

		dispatch(logout());

		dispatch(cleanNotesOnLogout());
	};
};

export const logout = () => ({ type: types.logout });
