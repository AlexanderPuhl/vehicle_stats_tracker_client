import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import requiresLogin from './RequiresLogin';
import { fetchFuelPurchaseData, fetchVehicleData } from '../actions';
import VehicleSelectionForm from './VehicleSelectionForm';
import '../styles/dashboard.css';

class Dashboard extends Component {
	componentDidMount() {
		document.title = 'Dashboard | Vehicle Tracker';
		this.props.dispatch(fetchFuelPurchaseData());
		this.props.dispatch(fetchVehicleData());
	}

	render() {
		// If we are logged in redirect straight to the user's dashboard
		if (this.props.onBoarding === 'true') {
			return <Redirect to='/onboarding' />;
		}

		const firstTwoFuelPurchases = this.props.filteredFuelPurchases.slice(0, 2);
		const milesOfFirst2 = firstTwoFuelPurchases.map(fuelPurchase => fuelPurchase.miles);
		const differenceOfMiles = milesOfFirst2[0] - milesOfFirst2[1];
		const amountOfFirst2 = firstTwoFuelPurchases.map(fuelPurchase => fuelPurchase.amount);
		const costOfFirst2 = firstTwoFuelPurchases.map(
			fuelPurchase => fuelPurchase.price * fuelPurchase.amount,
		);
		let calculatedMPG, calculateMilerPerDollar, costPerMiles;
		calculatedMPG = calculateMilerPerDollar = costPerMiles = 'Needs more data';
		if (differenceOfMiles && amountOfFirst2[1]) {
			calculatedMPG = (differenceOfMiles / amountOfFirst2[0]).toFixed(2);
			calculateMilerPerDollar = (differenceOfMiles / costOfFirst2[0]).toFixed(
				2,
			);
			costPerMiles = '$' + (costOfFirst2[0] / differenceOfMiles).toFixed(2);
		}
		let needDataMessage;
		if (calculatedMPG === 'Needs more data') {
			needDataMessage = (
				<p>The app needs more data, log fuel purchases to give it more data.</p>
			);
		}

		return (
			<section className='dashboard main-blue-transparent-bg'>
				<h2>Dashboard</h2>
				<p><i className='fas fa-car' /> <b>Current Vehicle:</b> {this.props.vehicleName}</p>
				<p><i className='fas fa-oil-can' /> <b>Oil Change Frequency:</b> {this.props.oilChangeFrequency}</p>
				<div className='dashboard-computed-data'>
					<div className='computed-data-info'>
						<h3>Current MPG</h3>
						<i className='fas fa-gas-pump' />
						<p>{calculatedMPG}</p>
					</div>
					<div className='computed-data-info'>
						<h3>Miles per dollar</h3>
						<i className='fas fa-dollar-sign' />
						<p>{calculateMilerPerDollar}</p>
					</div>
					<div className='computed-data-info'>
						<h3>Cost per Mile</h3>
						<i className='fas fa-road' />
						<p>{costPerMiles}</p>
					</div>
					{needDataMessage}
				</div>
				<VehicleSelectionForm />
				<button className='button'>
					<Link className='main-dark-text-color' to='/logFuelPage'>
						Log Fuel Purchase
          </Link>
				</button>
				<button className='button'>
					<Link className='main-dark-text-color' to='/FuelPurchaseHistory'>
						Fuel Purchase History
          </Link>
				</button>
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
		console.log(vehicle);
		console.log(user);
		if (vehicle.vehicle_id === user.selectedVehicle) {
			selectedVehicle = vehicle;
		}
	});

	function filterFuelPurchases(fuelPurchase) {
		return fuelPurchase.vehicle_id === selectedVehicle.vehicle_id;
	}

	let filteredFuelPurchases = [];
	filteredFuelPurchases = fuelPurchases.filter(filterFuelPurchases);

	return {
		onBoarding: `${user.onboarding}`,
		fuelPurchaseData: state.fuelPurchaseReducer.data,
		vehicleName: selectedVehicle.vehicle_name,
		oilChangeFrequency: selectedVehicle.oil_change_frequency,
		filteredFuelPurchases: filteredFuelPurchases,
	};
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
