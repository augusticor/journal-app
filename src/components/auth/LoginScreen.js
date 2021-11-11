import React from 'react';

const LoginScreen = () => {
	return (
		<>
			<h3>Login</h3>
			<form>
				<label htmlFor='lblemail'>Email</label>
				<input id='lblemail' type='text' placeholder='email@example.com' name='email' />

				<label htmlFor='lblpass'>Password</label>
				<input id='lblpass' type='password' name='password' />

				<button>Login</button>
			</form>

			<hr />
			<h4>Login with Google</h4>

			<button>Don't have an account yet ?</button>
		</>
	);
};

export default LoginScreen;
