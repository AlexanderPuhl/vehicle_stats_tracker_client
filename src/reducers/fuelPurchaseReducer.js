import {
	FETCH_FUEL_PURCHASE_DATA_SUCCESS,
	FETCH_FUEL_PURCHASE_DATA_ERROR,
	POST_FUEL_PURCHASE_DATA_SUCCESS,
	POST_FUEL_PURCHASE_DATA_ERROR,
} from '../actions/types';

const INITIAL_STATE = {
	data: [],
	error: null,
};

export default function reducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case FETCH_FUEL_PURCHASE_DATA_SUCCESS:
			return { ...state, data: action.data, error: null };
		case FETCH_FUEL_PURCHASE_DATA_ERROR:
			return { ...state, error: action.error };
		case POST_FUEL_PURCHASE_DATA_SUCCESS:
			return { ...state, data: [...state.data, action.data], error: null };
		case POST_FUEL_PURCHASE_DATA_ERROR:
			return { ...state, error: action.error };
		default:
			return state;
	}
}
