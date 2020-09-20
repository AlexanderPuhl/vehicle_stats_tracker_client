import React, { Component } from 'react';
import { connect } from 'react-redux';
import requiresLogin from './RequiresLogin';
import OnboardingForm from './OnboardingForm';

export class OnboardingPage extends Component {
	render() {
		return (
			<div className='main-blue-transparent-bg onboarding-page'>
				<div className='onboarding-name'>
					<h2>Hello {this.props.name}</h2>
				</div>
				<p>Welcome to the Vehicle Tracker.</p>
				<p>Lets add your first vehicle!</p>
				<OnboardingForm />
			</div>
		);
	}
}

const mapStateToProps = state => {
	const { user } = state.authReducer;
	return {
		name: `${user.name}`
	};
};

export default requiresLogin()(connect(mapStateToProps)(OnboardingPage));
