import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions';
import { clearAuthToken } from '../local-storage';
import logo from '../images/icon-noBG.png';
import '../styles/header.css';

export class HeaderBar extends Component {
	logOut() {
		this.props.dispatch(clearAuth());
		clearAuthToken();
	}

	componentDidMount() {
		let profileNav = document.getElementById('profile-nav');
		profileNav.style.display = 'none';
	}

	toggleProfileNavbar() {
		let profileNav = document.getElementById('profile-nav');
		if (profileNav.style.display === 'none') {
			profileNav.style.display = 'block';
		} else {
			profileNav.style.display = 'none';
		}
	}

	render() {
		let profilePageButton;
		let vehiclePageButton;

		let displayNoneStyle = {
			display: 'none',
		};

		let registerButton = (
			<li>
				<Link
					className='button'
					to='/register'
					onClick={() => this.toggleProfileNavbar()}
				>
					Register
        </Link>
			</li>
		);
		let loginButton = (
			<li>
				<Link
					className='button'
					to='/'
					onClick={() => this.toggleProfileNavbar()}
				>
					Log In
        </Link>
			</li>
		);
		let logOutButton = (
			<li onClick={() => this.toggleProfileNavbar()}>
				<button
					className='button'
					style={displayNoneStyle}
					onClick={() => this.logOut()}
				>
					Log out
        </button>
			</li>
		);

		if (this.props.loggedIn) {
			profilePageButton = (
				<li>
					<Link
						onClick={() => this.toggleProfileNavbar()}
						className='button'
						id='profileButton'
						to='/profile'
					>
						Profile
          </Link>
				</li>
			);
			vehiclePageButton = (
				<li>
					<Link
						onClick={() => this.toggleProfileNavbar()}
						className='button'
						id='vehiclePageButton'
						to='/vehicles'
					>
						Vehicles
          </Link>
				</li>
			);

			loginButton = (
				<li style={displayNoneStyle}>
					<Link
						onClick={() => this.toggleProfileNavbar()}
						className='button'
						to='/login'
					>
						Log in
          </Link>
				</li>
			);
			registerButton = (
				<li style={displayNoneStyle}>
					<Link
						onClick={() => this.toggleProfileNavbar()}
						className='button'
						style={displayNoneStyle}
						to='/register'
					>
						Register
          </Link>
				</li>
			);
			logOutButton = (
				<li onClick={() => this.toggleProfileNavbar()}>
					<button className='button' onClick={() => this.logOut()}>
						Log out
          </button>
				</li>
			);
		}

		return (
			<header>
				<Link to='/dashboard'>
					<img className='logo' src={logo} alt='logo' />
				</Link>
				<Link to='/dashboard'>
					<h1 className='main-light-text-color'>Vehicle Tracker</h1>
				</Link>
				<button
					id='navbar-toggle'
					className='barsIcon'
					onClick={() => this.toggleProfileNavbar()}
				>
					<i className='fas fa-bars' title='Open navbar' />
				</button>
				<nav id='profile-nav'>
					<ul className='profile-nav-ul'>
						{loginButton}
						{registerButton}
						{profilePageButton}
						{vehiclePageButton}
						{logOutButton}
					</ul>
				</nav>
			</header>
		);
	}
}

const mapStateToProps = state => ({
	loggedIn: state.authReducer.user !== null,
});

export default connect(mapStateToProps)(HeaderBar);
