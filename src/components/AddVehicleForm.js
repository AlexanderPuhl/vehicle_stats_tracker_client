import React, { Component } from 'react';
import { Field, focus, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postVehicle } from '../actions';
import { isPositive, nonEmpty, required } from '../validators';
import Input from './Input';

export class VehicleForm extends Component {
	state = {
		formSubmitted: false,
	};

	onSubmit(vehicle) {
		return this.props.dispatch(postVehicle(vehicle)).then(() => {
			if (!this.props.error) {
				this.setState({ formSubmitted: true });
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
		if (this.state.formSubmitted) {
			return <Redirect to='/vehicles' />;
		}
		return (
			<form
				className='add-vehicle-form'
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
					validate={[isPositive, nonEmpty, required]}
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
		id: user.id,
	};
};

const vehicleForm = reduxForm({
	form: 'addVehicle',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('addVehicle', Object.keys(errors)[0])),
})(VehicleForm);

export default connect(mapStateToProps)(vehicleForm);
