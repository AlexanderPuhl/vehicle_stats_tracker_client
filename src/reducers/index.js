import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import fuelPurchaseReducer from './fuelPurchaseReducer';
import vehicleReducer from './vehicleReducer';

export default combineReducers({
	form: formReducer,
	authReducer: authReducer,
	userReducer: userReducer,
	vehicleReducer: vehicleReducer,
	fuelPurchaseReducer: fuelPurchaseReducer,
});
