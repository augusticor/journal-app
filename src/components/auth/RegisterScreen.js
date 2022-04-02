import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';

import { hideUIError, showUIError } from '../../actions/ui';
import { startRegisterUser } from '../../actions/auth';

const RegisterScreen = () => {
	const dispatch = useDispatch();
	const state = useSelector((state) => state.ui);
	const { message: errorMessage, loading: loadingState } = state;

	const [formValues, handleInputChange] = useForm({
		username: '',
		email: '',
		password: '',
		password2: '',
	});

	const { username, email, password, password2 } = formValues;

	const isFormValid = () => {
		if (username.trim().length < 2) {
			dispatch(showUIError('001', 'Name is required'));
			return false;
		}

		if (!validator.isEmail(email)) {
			dispatch(showUIError('002', 'Not valid email'));
			return false;
		}

		if (password !== password2) {
			dispatch(showUIError('003', 'Passwords do not match'));
			return false;
		}

		if (password.length < 7) {
			dispatch(showUIError('004', 'Passwords should be at least 7 characters long'));
			return false;
		}

		dispatch(hideUIError());
		return true;
	};

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			dispatch(startRegisterUser(email, password, username));
		}
	};

	return (
		<>
			<h3 className='auth__title'>Register</h3>

			<form onSubmit={handleRegister}>
				{errorMessage && <div className='auth__alert-error'>{errorMessage}</div>}

				<label htmlFor='lblname'>Username</label>
				<input className='auth__input' id='lblusername' type='text' name='username' value={username} onChange={handleInputChange} />

				<label htmlFor='lblemail'>Email</label>
				<input
					className='auth__input'
					id='lblemail'
					type='email'
					placeholder='email@example.com'
					name='email'
					value={email}
					autoComplete='none'
					onChange={handleInputChange}
				/>

				<label htmlFor='lblpass'>Password</label>
				<input className='auth__input' id='lblpass' type='password' name='password' value={password} onChange={handleInputChange} />

				<label htmlFor='lblpass2'>Confirm password</label>
				<input className='auth__input' id='lblpass2' type='password' name='password2' value={password2} onChange={handleInputChange} />

				<button className='btn btn-primary btn-block mb-5' disabled={loadingState}>
					Create account
				</button>
			</form>

			<hr className='mb-5' />

			<Link to='/auth/login' className='link'>
				Already have an account ? Login
			</Link>
		</>
	);
};

export default RegisterScreen;
