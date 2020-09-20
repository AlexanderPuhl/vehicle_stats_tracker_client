import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { refreshAuthToken } from '../actions';
import HeaderBar from './Header';
import LandingPage from './LandingPage';
import Dashboard from './Dashboard';
import Onboarding from './OnboardingPage';
import Profile from './ProfilePage';
import Vehicles from './VehiclePage';
import AddVehicle from './AddVehiclePage';
import LogFuelPage from './LogFuelPage';
import RegistrationPage from './RegistrationPage';
import FuelPurchaseHistory from './FuelPurchaseHistory';

class App extends Component {
	componentDidUpdate(prevProps) {
		if (!prevProps.loggedIn && this.props.loggedIn) {
			// When we are logged in, refresh the auth token periodically
			this.startPeriodicRefresh();
		} else if (prevProps.loggedIn && !this.props.loggedIn) {
			// Stop refreshing when we log out
			this.stopPeriodicRefresh();
		}
	}

	componentWillUnmount() {
		this.stopPeriodicRefresh();
	}

	startPeriodicRefresh() {
		this.refreshInterval = setInterval(
			() => this.props.dispatch(refreshAuthToken()),
			60 * 60 * 1000, // One hour
		);
	}

	stopPeriodicRefresh() {
		if (!this.refreshInterval) {
			return;
		}

		clearInterval(this.refreshInterval);
	}

	render() {
		return (
			<>
				<HeaderBar />
				<main>
					<Route exact path='/' component={LandingPage} />
					<Route path='/dashboard' component={Dashboard} />
					<Route path='/onboarding' component={Onboarding} />
					<Route path='/profile' component={Profile} />
					<Route path='/vehicles' component={Vehicles} />
					<Route path='/addVehicle' component={AddVehicle} />
					<Route path='/logFuelPage' component={LogFuelPage} />
					<Route path='/register' component={RegistrationPage} />
					<Route path='/FuelPurchaseHistory' component={FuelPurchaseHistory} />
				</main>
			</>
		);
	}
}

const mapStateToProps = state => ({
	hasAuthToken: state.authReducer.authToken !== null,
	loggedIn: state.authReducer.user !== null,
});

export default withRouter(connect(mapStateToProps)(App));
