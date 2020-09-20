import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './RequiresLogin';
import FuelForm from './LogFuelForm';
import { fetchFuelPurchaseData, fetchVehicleData } from '../actions';

export class LogFuelPage extends Component {
	componentWillMount() {
		document.title = 'Log Fuel Purchase | Vehicle Tracker';
		this.props.dispatch(fetchFuelPurchaseData());
		this.props.dispatch(fetchVehicleData());
	}
	render() {
		return (
			<section className='main-blue-transparent-bg'>
				<h2>Log Fuel Purchase</h2>
				<p>Current Vehicle: {this.props.vehicleName}</p>
				<FuelForm />
				<button className='button'>
					<Link className='main-dark-text-color' to='/dashboard'>
						Go Back
          </Link>
				</button>
			</section>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.authReducer;
	const { vehicles } = state.vehicleReducer;
	let selectedVehicleName = '';
	vehicles.forEach(vehicle => {
		if (vehicle.id === user.selectedVehicle) {
			selectedVehicleName = vehicle.vehicleName;
		}
	});
	return {
		name: `${user.name}`,
		vehicleName: selectedVehicleName,
	};
};

export default requiresLogin()(connect(mapStateToProps)(LogFuelPage));
