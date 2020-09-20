import React, { Component } from 'react';
import { connect } from 'react-redux';
import RequiresLogin from './RequiresLogin';
import { fetchVehicleData } from '../actions';

class Profile extends Component {
	componentDidMount() {
		document.title = 'Profile | Vehicle Tracker';
		this.props.dispatch(fetchVehicleData());
	}

	render() {
		return (
			<section className='main-blue-transparent-bg'>
				<h2>Profile Information</h2>
				<p>User Name: {this.props.username}</p>
				<p>Name: {this.props.name}</p>
				<p>Currently Selected Vehicle: {this.props.vehicleName}</p>
				<p>{this.props.vehicleName}'s Oil Change Frequency: {this.props.oilChangeFrequency}</p>
			</section>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.authReducer;
	const { vehicles } = state.vehicleReducer;
	let selectedVehicle = '';
	if (vehicles.length > 0) {
		vehicles.forEach(vehicle => {
			if (vehicle.id === user.selectedVehicle) {
				selectedVehicle = vehicle;
			}
		})
	}


	return {
		username: user.username,
		name: user.name,
		vehicleName: selectedVehicle.vehicleName,
		oilChangeFrequency: selectedVehicle.oilChangeFrequency,
	};
};

export default RequiresLogin()(connect(mapStateToProps)(Profile));
