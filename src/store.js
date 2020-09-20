import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import reducers from './reducers';
import { loadAuthToken } from './local-storage';
import { setAuthToken, refreshAuthToken, fetchVehicleData, fetchFuelPurchaseData } from './actions';

let store;

if (process.env.NODE_ENV === 'production') {
	store = createStore(
		reducers,
		applyMiddleware(thunk),
	);
} else {
	store = createStore(
		reducers,
		composeWithDevTools(applyMiddleware(thunk)),
	);
}

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
	const token = authToken;
	store.dispatch(setAuthToken(token));
	store.dispatch(refreshAuthToken());
	store.dispatch(fetchVehicleData());
	store.dispatch(fetchFuelPurchaseData());
}

export default store;
