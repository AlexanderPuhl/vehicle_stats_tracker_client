import React, { Component } from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { postFuelPurchase } from '../actions';
import { required, isPositive } from '../validators';
import Input from './Input';

export class FuelForm extends Component {
	state = {
		formSubmitted: false,
	};

	onSubmit(fuelPurchase) {
		fuelPurchase.vehicleId = this.props.selectedVehicleId;
		return this.props.dispatch(postFuelPurchase(fuelPurchase)).then(() => {
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
			return <Redirect to='/dashboard' />;
		}
		return (
			<form
				className='purchase-fuel-form'
				onSubmit={this.props.handleSubmit(values => this.onSubmit(values))}
			>
				{error}
				<label htmlFor='miles'>Current Mileage</label>
				<Field
					component={Input}
					type='number'
					name='miles'
					id='miles'
					validate={[required, isPositive]}
				/>
				<label htmlFor='amount'>Number of Gallons</label>
				<Field
					component={Input}
					type='number'
					name='amount'
					id='amount'
					validate={[required, isPositive]}
				/>
				<label htmlFor='price'>Price Per Gallon</label>
				<Field
					component={Input}
					type='number'
					name='price'
					id='price'
					validate={[required, isPositive]}
				/>
				<button
					className='button'
					type='submit'
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
	const { vehicles } = state.vehicleReducer;
	const { data: fuelPurchase } = state.fuelPurchaseReducer;

	let selectedVehicle = '';
	vehicles.forEach(vehicle => {
		if (vehicle.id === user.selectedVehicle) {
			selectedVehicle = vehicle;
		}
	});

	function filterFuelPurchases(fuelPurchase) {
		return fuelPurchase.vehicleId === selectedVehicle.id;
	}

	let filteredFuelPurchases = [];
	filteredFuelPurchases = fuelPurchase.filter(filterFuelPurchases);

	let setMiles = 0;
	if (filteredFuelPurchases.length > 0) {
		setMiles = filteredFuelPurchases[0].miles;
	}
	return {
		initialValues: {
			miles: setMiles,
		},
		selectedVehicleId: user.selectedVehicle,
	};
};

const fuelForm = reduxForm({
	form: 'fuelPurchase',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('fuelPurchase', Object.keys(errors)[0])),
})(FuelForm);

export default connect(mapStateToProps)(fuelForm);
