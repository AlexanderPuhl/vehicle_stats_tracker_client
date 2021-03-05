import React, { Component } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './Input';
import { login } from '../actions';
import { required, nonEmpty } from '../validators';
import '../styles/landing-page.css';

export class LoginForm extends Component {
	onSubmit(values) {
		return this.props.dispatch(login(values.username, values.password));
	}

	demoLogin(username, password) {
		return this.props.dispatch(login(username, password));
	}

	render() {
		let error;
		if (this.props.error) {
			error = (
				<div className='form-error' aria-live='polite'>
					{this.props.error}
				</div>
			);
		}
		return (
			<>
				<form
					className='login-form'
					onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
				>
					{error}
					<label htmlFor='username'>Username:</label>
					<Field
						component={Input}
						type='text'
						name='username'
						id='username'
						validate={[required, nonEmpty]}
					/>
					<label htmlFor='password'>Password:</label>
					<Field
						component={Input}
						type='password'
						name='password'
						id='password'
						validate={[required, nonEmpty]}
					/>
					<button
						className='button'
						disabled={this.props.pristine || this.props.submitting}
					>
						Login
					</button>
				</form>
				<p>Or click the button below to log into a demo account.</p>
				<button
					className='button'
					onClick={() => this.demoLogin('demo', 'thinkful123')}
				>
					Demo Account
					</button>
			</>
		);
	}
}

export default reduxForm({
	form: 'login',
	onSubmitFail: (errors, dispatch) => dispatch(focus('login', 'username')),
})(LoginForm);
