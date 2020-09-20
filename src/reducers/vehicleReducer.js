import {
	FETCH_VEHICLE_DATA_SUCCESS,
	FETCH_VEHICLE_DATA_ERROR,
	POST_VEHICLE_DATA_SUCCESS,
	POST_VEHICLE_DATA_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
	vehicles: [],
	error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_VEHICLE_DATA_SUCCESS:
			return { ...state, vehicles: action.data, error: null };
		case FETCH_VEHICLE_DATA_ERROR:
			return { ...state, error: action.error };
		case POST_VEHICLE_DATA_SUCCESS:
			return { ...state, vehicles: [...state.data, action.data], error: null };
		case POST_VEHICLE_DATA_ERROR:
			return { ...state, error: action.error };
		default:
			return state;
	}
}
