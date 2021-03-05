import React, { Component } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from './Input';
import { submitOnboardingValues } from '../actions';
import { required, nonEmpty } from '../validators';

export class OnboardingForm extends Component {
	state = {
		onboardingFormSubmitted: false,
	};
	onSubmit(values) {
		const { oilChangeFrequency, vehicleName } = values;

		return this.props
			.dispatch(
				submitOnboardingValues(oilChangeFrequency, vehicleName),
			)
			.then(() => {
				if (!this.props.error) {
					this.setState({ onboardingFormSubmitted: true });
				}
			});
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
		if (this.state.onboardingFormSubmitted) {
			return <Redirect to='/dashboard' />;
		}
		return (
			<form
				className='onboarding-form'
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
			>
				{error}
				<label htmlFor='vehicleName'>Vehicle Name</label>
				<Field
					component={Input}
					type='string'
					name='vehicleName'
					id='vehicleName'
					validate={[required, nonEmpty]}
				/>
				<label htmlFor='oilChangeFrequency'>Oil Change Frequency</label>
				<Field
					component='select'
					name='oilChangeFrequency'
					id='oilChangeFrequency'
					validate={[required, nonEmpty]}
				>
					<option value='' />
					<option value='1000'>1000</option>
					<option value='3000'>3000</option>
					<option value='5000'>5000</option>
					<option value='7500'>7500</option>
					<option value='10000'>10000</option>
				</Field>
				<button
					className='button'
					disabled={this.props.pristine || this.props.submitting}
				>
					Submit
        </button>
			</form>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.authReducer;
	return {
		id: `${user.id}`,
		onboarding: user.onboarding,
	};
};

const onboardingForm = reduxForm({
	form: 'onboarding',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('onboarding', Object.keys(errors)[0])),
})(OnboardingForm);

export default connect(mapStateToProps)(onboardingForm);
