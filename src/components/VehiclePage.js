import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import RequiresLogin from './RequiresLogin';
import VehicleSelectionForm from './VehicleSelectionForm';
import { fetchFuelPurchaseData, fetchVehicleData, deleteVehicle } from '../actions';
import '../styles/vehiclePage.css';

class Vehicles extends Component {
	componentDidMount() {
		document.title = 'Vehicles | Vehicle Tracker';
		this.props.dispatch(fetchFuelPurchaseData());
		this.props.dispatch(fetchVehicleData());
	}

	deleteVehicle(id) {
		this.props
			.dispatch(deleteVehicle(id))
			.then(this.props.dispatch(fetchVehicleData()));
	}

	render() {
		const vehicleList = this.props.vehicles.map((vehicle, index) => (
			<li className='main-blue-transparent-bg position-relative' key={index}>
				<p>
					<b>Vehicle Name: </b>
					{vehicle.vehicle_name}
				</p>
				<p>
					<b>Oil Change Frequency: </b>
					{vehicle.oil_change_frequency}
				</p>
				<p>
					<b>Vehicle added on: </b>
					{moment(vehicle.createdAt).format('MMMM Do YYYY, h:mma')}
				</p>
				<button
					className='delete-button'
					onClick={() => this.deleteVehicle(vehicle.id)}
				>
					X
        </button>
			</li>
		));

		return (
			<section className='main-blue-transparent-bg'>
				<h2>Vehicles</h2>
				<p>Current Vehicle: {this.props.currentVehicleName}</p>
				<p>
					Oil Change Frequency: {this.props.currentVehicleOilChangeFrequency}
				</p>
				<VehicleSelectionForm />
				<button className='button'>
					<Link className='main-dark-text-color' to='/fuelPurchaseHistory'>
						Fuel Purchase History
          </Link>
				</button>
				<ul className='vehicle-list'>{vehicleList}</ul>
				<Link id='addVehicleButton' to='/addVehicle'>
					<button className='button'>Add Vehicle</button>
				</Link>
			</section>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.authReducer;
	const { vehicles } = state.vehicleReducer;
	let selectedVehicle = '';
	vehicles.forEach(vehicle => {
		if (vehicle.vehicle_id === user.selected_vehicle_id) {
			selectedVehicle = vehicle;
		}
	});
	return {
		vehicles: vehicles,
		currentVehicleName: selectedVehicle.vehicle_name,
		currentVehicleOilChangeFrequency: selectedVehicle.oil_change_frequency,
	};
};

export default RequiresLogin()(connect(mapStateToProps)(Vehicles));
