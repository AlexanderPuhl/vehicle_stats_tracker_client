import {
	SET_AUTH_TOKEN,
	CLEAR_AUTH,
	AUTH_REQUEST,
	AUTH_SUCCESS,
	AUTH_ERROR,
	SHOW_TIMEOUT_WARNING,
	HIDE_TIMEOUT_WARNING,
	ONBOARDING_SUCCESS,
	UPDATE_SELECTED_VEHICLE_ID,
	UPDATING_USER_SUCCESS,
} from '../actions/types';

const INITIAL_STATE = {
	authToken: null, // authToken !== null does not mean it has been validated
	user: null,
	loading: false,
	error: null,
	timeoutWarning: false,
};

export default (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_AUTH_TOKEN:
			return { ...state, authToken: action.authToken };
		case CLEAR_AUTH:
			return { ...state, authToken: null, user: null };
		case AUTH_REQUEST:
			return { ...state, loading: true, error: null };
		case AUTH_SUCCESS:
			return { ...state, loading: false, user: action.user };
		case AUTH_ERROR:
			return { ...state, loading: false, error: action.error };
		case ONBOARDING_SUCCESS:
			return { ...state, user: action.user };
		case UPDATE_SELECTED_VEHICLE_ID:
				return { ...state, user: action.user };
		case UPDATING_USER_SUCCESS:
			return { ...state, user: action.user };
		case SHOW_TIMEOUT_WARNING:
			return { ...state, timeoutWarning: true };
		case HIDE_TIMEOUT_WARNING:
			return { ...state, timeoutWarning: false };
		default:
			return state;
	}
};
