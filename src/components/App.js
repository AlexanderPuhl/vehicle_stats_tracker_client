import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AuthenticateRoute from './AuthenticateRoute';
import Header from './Header';
import LandingPage from '../pages/Landing';
import DashboardPage from '../pages/Dashboard';
import { useAuthenticated } from '../context/authContext';

// import HeaderBar from './Header';
// import LandingPage from './LandingPage';
// import Dashboard from './Dashboard';
// import Onboarding from './OnboardingPage';
// import Profile from './ProfilePage';
// import Vehicles from './VehiclePage';
// import AddVehicle from './AddVehiclePage';
// import LogFuelPage from './LogFuelPage';
// import RegistrationPage from './RegistrationPage';
// import FuelPurchaseHistory from './FuelPurchaseHistory';

function App() {
  const { isAuthenticated } = useAuthenticated();
  const authedRedirect = (Component) => {
    return isAuthenticated ? <Redirect to='/dashboard' /> : <Component />;
  };
  // componentDidUpdate(prevProps) {
  // 	if (!prevProps.loggedIn && this.props.loggedIn) {
  // 		// When we are logged in, refresh the auth token periodically
  // 		this.startPeriodicRefresh();
  // 	} else if (prevProps.loggedIn && !this.props.loggedIn) {
  // 		// Stop refreshing when we log out
  // 		this.stopPeriodicRefresh();
  // 	}
  // }

  // componentWillUnmount() {
  // 	this.stopPeriodicRefresh();
  // }

  // startPeriodicRefresh() {
  // 	this.refreshInterval = setInterval(
  // 		() => this.props.dispatch(refreshAuthToken()),
  // 		60 * 60 * 1000, // One hour
  // 	);
  // }

  // stopPeriodicRefresh() {
  // 	if (!this.refreshInterval) {
  // 		return;
  // 	}

  // 	clearInterval(this.refreshInterval);
  // }

  return (
    <>
      <AuthenticateRoute>
        <Header />
      </AuthenticateRoute>
      <main>
        <Switch>
          <Route path='/' exact>
            {authedRedirect(LandingPage)}
          </Route>
          <AuthenticateRoute path='/dashboard'>
            <DashboardPage />
          </AuthenticateRoute>
        </Switch>
      </main>
    </>
  );
}

// const mapStateToProps = state => ({
// 	hasAuthToken: state.authReducer.authToken !== null,
// 	loggedIn: state.authReducer.user !== null,
// });

export default App;
