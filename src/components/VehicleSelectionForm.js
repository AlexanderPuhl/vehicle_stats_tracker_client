import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateSelectedVehicle } from '../actions';
import '../styles/vehicleSelectionForm.css';

class VehicleSelectionForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			vehicles: [],
			selectedVehicle: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		let vehiclesForUser = nextProps.vehicles.map(vehicle => {
			return { value: vehicle.vehicle_id, display: vehicle.vehicle_name };
		});
		this.setState({
			vehicles: [{ value: '', display: '(Select a vehicle)' }].concat(
				vehiclesForUser,
			),
		});
	}

	handleVehicleChange = e => {
		this.setState({
			selectedVehicle: e.target.value,
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		this.props.dispatch(updateSelectedVehicle(parseInt(this.state.selectedVehicle)));
	};

	render() {
		return (
			<form className='vehicle-selection-form' onSubmit={e => this.handleSubmit(e)}>
				<select
					value={this.state.selectedVehicle}
					onChange={e => this.handleVehicleChange(e)}
				>
					{this.state.vehicles.map(vehicle => (
						<option key={vehicle.value} value={vehicle.value}>
							{vehicle.display}
						</option>
					))}
				</select>
				<button className='button' type='submit'>
					Change Vehicle
        </button>
			</form>
		);
	}
}

const mapStateToProps = state => {
	const { vehicles } = state.vehicleReducer;
	return {
		vehicles: vehicles,
	};
};

export default connect(mapStateToProps)(VehicleSelectionForm);
