import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utilsActions';

import {
	FETCH_VEHICLE_DATA_SUCCESS,
	FETCH_VEHICLE_DATA_ERROR,
	POST_VEHICLE_DATA_SUCCESS,
	POST_VEHICLE_DATA_ERROR,
} from './types';

export const fetchVehicleDataSuccess = data => ({
	type: FETCH_VEHICLE_DATA_SUCCESS,
	data,
});

export const fetchVehicleDataError = error => ({
	type: FETCH_VEHICLE_DATA_ERROR,
	error,
});

export const postVehicleDataSuccess = data => ({
	type: POST_VEHICLE_DATA_SUCCESS,
	data,
});

export const postVehicleDataError = error => ({
	type: POST_VEHICLE_DATA_ERROR,
	error,
});

export const fetchVehicleData = () => (dispatch, getState) => {
	const authToken = getState().authReducer.authToken;
	return fetch(`${API_BASE_URL}/vehicle`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => {
			dispatch(fetchVehicleDataSuccess(data));
		})
		.catch(err => {
			dispatch(fetchVehicleDataError(err));
		});
};

export const postVehicle = vehicle => (dispatch, getState) => {
	const authToken = getState().authReducer.authToken;
	return fetch(`${API_BASE_URL}/vehicle`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(vehicle),
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => {
			dispatch(postVehicleDataSuccess(data));
		})
		.catch(err => {
			dispatch(postVehicleDataError(err));
		});
};

export const deleteVehicle = id => (dispatch, getState) => {
	const vehicleId = id;
	const authToken = getState().authReducer.authToken;
	return fetch(`${API_BASE_URL}/vehicle/${vehicleId}`, {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.catch(err => {
			const { reason, message, location } = err;
			if (reason === 'ValidationError') {
				return Promise.reject(
					new SubmissionError({
						[location]: message,
					}),
				);
			}
		});
};
