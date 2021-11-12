import React from 'react';

import { Link } from 'react-router-dom';

const RegisterScreen = () => {
	return (
		<>
			<h3 className='auth__title'>Register</h3>

			<form>
				<label htmlFor='lblname'>Username</label>
				<input className='auth__input' id='lblusername' type='text' name='username' />

				<label htmlFor='lblemail'>Email</label>
				<input className='auth__input' id='lblemail' type='text' placeholder='email@example.com' name='email' autoComplete='none' />

				<label htmlFor='lblpass'>Password</label>
				<input className='auth__input' id='lblpass' type='password' name='password' />

				<label htmlFor='lblpass2'>Confirm password</label>
				<input className='auth__input' id='lblpass2' type='password' name='password2' />

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
