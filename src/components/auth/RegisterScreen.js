import React from 'react';

import { Link } from 'react-router-dom';

import { useForm } from '../../hooks/useForm';

const RegisterScreen = () => {
	const [formValues, handleInputChange] = useForm({
		username: 'Oscar',
		email: 'rojascruzoscar@gmail.com',
		password: '1234567890',
		password2: '1234567890',
	});

	const { username, email, password, password2 } = formValues;

	const isFormValid = () => {
		return false;
	};

	const handleRegister = (e) => {
		e.preventDefault();
		console.log(formValues);
	};

	return (
		<>
			<h3 className='auth__title'>Register</h3>

			<form onSubmit={handleRegister}>
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
