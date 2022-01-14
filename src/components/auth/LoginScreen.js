import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { startLoginEmailPassword, startGoogleLogin } from '../../actions/auth';
import { hideUIError, showUIError } from '../../actions/ui';
import { useForm } from '../../hooks/useForm';

const LoginScreen = () => {
	// hook from redux for dispatch anywhere
	const dispatch = useDispatch();
	const uiState = useSelector((state) => state.ui);

	const [formValues, handleInputChange] = useForm({
		email: '',
		password: '',
	});

	const { email, password } = formValues;

	const isFormValid = () => {
		if (!validator.isEmail(email)) {
			dispatch(showUIError('002', 'Not a valid email'));
			return false;
		}

		if (password.length < 6) {
			dispatch(showUIError('004', 'Passwords should be at least 7 characters long'));
			return false;
		}

		dispatch(hideUIError());
		return true;
	};

	const handleLogin = (event) => {
		event.preventDefault();

		if (isFormValid()) {
			dispatch(startLoginEmailPassword(email, password));
		}
	};

	const handleGoogleLogin = () => {
		dispatch(startGoogleLogin());
	};

	return (
		<>
			<h3 className='auth__title'>Login</h3>

			{uiState.message && <div className='auth__alert-error'>{uiState.message}</div>}

			<form onSubmit={handleLogin}>
				<label htmlFor='lblemail'>Email</label>
				<input
					className='auth__input'
					id='lblemail'
					type='text'
					placeholder='email@example.com'
					name='email'
					value={email}
					onChange={handleInputChange}
					required
				/>

				<label htmlFor='lblpass'>Password</label>
				<input className='auth__input' id='lblpass' type='password' name='password' value={password} onChange={handleInputChange} required />

				<button disabled={uiState.loading} className='btn btn-primary btn-block mb-5'>
					Login
				</button>
			</form>

			<hr />
			<div className='auth__social-networks mt-5 mb-5'>
				<p>Login with social networks</p>
				<div className='google-btn mb-5' onClick={handleGoogleLogin}>
					<div className='google-icon-wrapper'>
						<img className='google-icon' src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' alt='google button' />
					</div>
					<p className='btn-text'>
						<b>Sign in with google</b>
					</p>
				</div>
			</div>

			<Link to='/auth/register' className='link'>
				Don't have an account yet ? Create new
			</Link>
		</>
	);
};

export default LoginScreen;
