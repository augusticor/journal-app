import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';

import { hideUIError, showUIError } from '../../actions/ui';

const RegisterScreen = () => {
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		username: 'Oscar',
		email: 'rojascruzoscar@gmail.com',
		password: '1234567890',
		password2: '1234567890',
	});

	const { username, email, password, password2 } = formValues;

	const isFormValid = () => {
		if (username.trim().length < 2) {
			console.log('Name is required');
			dispatch(showUIError('001', 'Name is required'));
			return false;
		}

		if (!validator.isEmail(email)) {
			console.log('Not valid email');
			dispatch(showUIError('002', 'Not valid email'));
			return false;
		}

		if (password !== password2) {
			console.log('Passwords do not match');
			dispatch(showUIError('003', 'Passwords do not match'));
			return false;
		}

		if (password.length < 7) {
			console.log('Passwords should be at least 7 characters long');
			dispatch(showUIError('004', 'Passwords should be at least 7 characters long'));
			return false;
		}

		dispatch(hideUIError());
		return true;
	};

	const handleRegister = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			console.log('Form correcto');
		}

		// console.log(formValues);
	};

	return (
		<>
			<h3 className='auth__title'>Register</h3>

			<form onSubmit={handleRegister}>
				<div className='auth__alert-error'>Hola error mundo</div>

				<label htmlFor='lblname'>Username</label>
				<input className='auth__input' id='lblusername' type='text' name='username' value={username} onChange={handleInputChange} />

				<label htmlFor='lblemail'>Email</label>
				<input
					className='auth__input'
					id='lblemail'
					type='text'
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

				<button className='btn btn-primary btn-block mb-5'>Create account</button>
			</form>

			<hr className='mb-5' />

			<Link to='/auth/login' className='link'>
				Already have an account ? Login
			</Link>
		</>
	);
};

export default RegisterScreen;
