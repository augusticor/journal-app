import React from 'react';
import { useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import { login } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

const LoginScreen = () => {
	// hook from redux for dispatch anywhere
	const dispatch = useDispatch();

	const [formValues, handleInputChange] = useForm({
		email: '',
		password: '',
	});

	const { email, password } = formValues;

	const handleLogin = (event) => {
		event.preventDefault();
		dispatch(login(1233, email));
	};

	return (
		<>
			<h3 className='auth__title'>Login</h3>

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

				<button className='btn btn-primary btn-block'>Login</button>
			</form>

			<hr />
			<div className='auth__social-networks'>
				<p>Login with social networks</p>
				<div className='google-btn'>
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
