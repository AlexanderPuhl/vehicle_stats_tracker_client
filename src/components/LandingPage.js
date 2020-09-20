import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';

export function LandingPage(props) {
	if (props.loggedIn) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<section className='main-blue-transparent-bg'>
			<p>
				This app will help you keep records and track general stats for your vehicles.
				This is a great way to keep an eye on the health of your vehicle. It's
				also just fun to collect this sort of data and look back over it!
      </p>
			<LoginForm />
			<p>
				Don't have an account?{' '}
				<Link className='main-light-text-color' to='/register'>
					Sign Up
        </Link>
			</p>
		</section>
	);
}

const mapStateToProps = state => ({
	loggedIn: state.authReducer.user !== null,
});

export default connect(mapStateToProps)(LandingPage);
