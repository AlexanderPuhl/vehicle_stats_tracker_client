import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm, focus } from 'redux-form';
import { postFuelPurchase } from '../actions';
import { required, isPositive } from '../validators';
import Input from './Input';

export class FuelForm extends Component {
	state = {
		formSubmitted: false,
	};

	onSubmit(fuelPurchase) {
		console.log(fuelPurchase)
		fuelPurchase.odometer = parseFloat(fuelPurchase.odometer);
		fuelPurchase.amount = parseFloat(fuelPurchase.amount);
		fuelPurchase.price = parseFloat(fuelPurchase.price);
		fuelPurchase.vehicle_id = this.props.selectedVehicleId;
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
				<label htmlFor='odometer'>Current Odometer</label>
				<Field
					component={Input}
					type='number'
					name='odometer'
					id='odometer'
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
				<label htmlFor='price'>Date of Fill up</label>
				<Field
					component={Input}
					type='date'
					name='date_of_fill_up'
					id='date_of_fill_up'
					validate={[required]}
				/>
				<label htmlFor='price'>Fuel Type</label>
				<Field
					component={Input}
					type='number'
					name='fuel_type_id'
					id='fuel_type_id'
					validate={[required]}
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
	const { data: fuelPurchases } = state.fuelPurchaseReducer;

	let selectedVehicle = '';
	vehicles.forEach(vehicle => {
		if (vehicle.vehicle_id === user.selected_vehicle_id) {
			selectedVehicle = vehicle;
		}
	});

	function filterFuelPurchases(fuelPurchase) {
		return fuelPurchase.vehicle_id === selectedVehicle.vehicle_id;
	}

	let selectedVehicleFuelPurchases = [];
	selectedVehicleFuelPurchases = fuelPurchases.filter(filterFuelPurchases);

	let setOdometer = 0;
	if (selectedVehicleFuelPurchases.length > 0) {
		setOdometer = selectedVehicleFuelPurchases[0].odometer;
	}

	return {
		initialValues: {
			odometer: setOdometer
		},
		selectedVehicleId: user.selected_vehicle_id,
	};
};

const fuelForm = reduxForm({
	form: 'fuelPurchase',
	onSubmitFail: (errors, dispatch) =>
		dispatch(focus('fuelPurchase', Object.keys(errors)[0])),
})(FuelForm);

export default connect(mapStateToProps)(fuelForm);
