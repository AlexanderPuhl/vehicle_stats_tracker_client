import React, { Component } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { login, registerUser } from '../actions';
import Input from './Input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends Component {
	onSubmit(values) {
		const { name, username, email, password } = values;
		let onboarding = true;
		let selectedVehicle = 'placeholder';
		const user = { name, username, email, password, onboarding, selectedVehicle };
		return this.props
			.dispatch(registerUser(user))
			.then(() => this.props.dispatch(login(username, password)));
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
			<form
				className='login-form'
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
			>
				{error}
				<label htmlFor='name'>Name</label>
				<Field
					component={Input}
					type='text'
					name='name'
					validate={[required, nonEmpty, isTrimmed]}
				/>
				<label htmlFor='username'>Username</label>
				<Field
					component={Input}
					type='text'
					name='username'
					validate={[required, nonEmpty, isTrimmed]}
				/>
				<label htmlFor='email'>Email</label>
				<Field
					component={Input}
					type='email'
					name='email'
					validate={[required, nonEmpty, isTrimmed]}
				/>
				<label htmlFor='password'>Password</label>
				<Field
					component={Input}
					type='password'
					name='password'
					validate={[required, passwordLength, isTrimmed]}
				/>
				<label htmlFor='passwordConfirm'>Confirm password</label>
				<Field
					component={Input}
					type='password'
					name='passwordConfirm'
					validate={[required, nonEmpty, matchesPassword]}
				/>
				<button
					className='button'
					type='submit'
					disabled={this.props.pristine || this.props.submitting}
				>
					Register
        </button>
			</form>
		);
	}
}

export default reduxForm({
	form: 'registration',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('registration', Object.keys(errors)[0])),
})(RegistrationForm);
