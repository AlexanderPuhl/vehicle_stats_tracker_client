import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './RequiresLogin';
import {
	fetchFuelPurchaseData,
	fetchVehicleData,
	deleteFuelPurchase,
} from '../actions';
import VehicleSelectionForm from './VehicleSelectionForm';
import '../styles/fuelPurchaseHistory.css';

export class FuelPurchaseHistory extends Component {
	componentDidMount() {
		document.title = 'Fuel Purchase History | Vehicle Tracker';
		this.props.dispatch(fetchFuelPurchaseData());
		this.props.dispatch(fetchVehicleData());
	}

	deleteFuelPurchases(id) {
		this.props
			.dispatch(deleteFuelPurchase(id))
			.then(this.props.dispatch(fetchFuelPurchaseData()));
	}

	render() {
		const fuelPurchaseDataList = this.props.selectedVehicleFuelPurchases.map(
			(fuelPurchase, index) => (
				<li
					className='block main-blue-transparent-bg position-relative'
					key={index}
				>
					<p>
						<b>Current Mileage: </b>
						{fuelPurchase.odometer}
					</p>
					<p>
						<b>Price per Gallon:</b> ${fuelPurchase.price}
					</p>
					<p>
						<b>Number of Gallons:</b> {fuelPurchase.amount}
					</p>
					<p>
						<b>Date: </b>
						{moment(fuelPurchase.createdAt).format('MMMM Do YYYY, h:mma')}
					</p>
					<button
						className='delete-button'
						onClick={() => this.deleteFuelPurchases(fuelPurchase.fuel_purchase_id)}
					>
						X
          </button>
				</li>
			),
		);

		return (
			<section className='main-blue-transparent-bg'>
				<h2>Fuel Purchase History</h2>
				<p>Current Vehicle: {this.props.vehicleName}</p>
				<p>Oil Change Frequency: {this.props.oilChangeFrequency}</p>
				<VehicleSelectionForm />
				<button className='button'>
					<Link className='main-dark-text-color' to='/logGasPage'>
						Log Fuel Purchase
          </Link>
				</button>
				<button className='button'>
					<Link className='main-dark-text-color' to='/dashboard'>
						Go Back
          </Link>
				</button>
				<ul className='fuel-purchase-list'>{fuelPurchaseDataList}</ul>
			</section>
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

	return {
		vehicleName: selectedVehicle.vehicle_name,
		oilChangeFrequency: selectedVehicle.oil_change_frequency,
		selectedVehicleFuelPurchases: selectedVehicleFuelPurchases,
	};
};

export default requiresLogin()(connect(mapStateToProps)(FuelPurchaseHistory));
