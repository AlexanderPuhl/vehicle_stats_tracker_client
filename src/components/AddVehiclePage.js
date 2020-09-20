import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './RequiresLogin';
import VehicleForm from './AddVehicleForm';

export class AddVehiclePage extends Component {
	componentWillMount() {
		document.title = 'Add Vehicle | Vehicle Tracker';
	}
	render() {
		return (
			<section className='main-blue-transparent-bg'>
				<h2>Add Vehicle</h2>
				<VehicleForm />
				<button className='button'>
					<Link className='main-dark-text-color' to='/vehicles'>
						Go Back
          </Link>
				</button>
			</section>
		);
	}
}

export default requiresLogin()(connect()(AddVehiclePage));