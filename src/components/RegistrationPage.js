import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import RegistrationForm from './RegistrationForm';

export function RegistrationPage(props) {

	if (props.loggedIn) {
		return <Redirect to='/onboarding' />;
	}
	return (
		<section className='main-blue-transparent-bg'>
			<h2>Sign Up</h2>
			<RegistrationForm />
			<button className='button'>
				<Link className='main-dark-text-color' to='/'>
					Login
        </Link>
			</button>
		</section>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.authReducer.user !== null,
});

export default connect(mapStateToProps)(RegistrationPage);
