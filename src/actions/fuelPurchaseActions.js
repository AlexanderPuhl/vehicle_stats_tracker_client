import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utilsActions';

import {
	FETCH_FUEL_PURCHASE_DATA_SUCCESS,
	FETCH_FUEL_PURCHASE_DATA_ERROR,
	POST_FUEL_PURCHASE_DATA_SUCCESS,
	POST_FUEL_PURCHASE_DATA_ERROR,
} from './types';

export const fetchFuelPurchaseDataSuccess = data => ({
	type: FETCH_FUEL_PURCHASE_DATA_SUCCESS,
	data,
});

export const fetchFuelPurchaseDataError = error => ({
	type: FETCH_FUEL_PURCHASE_DATA_ERROR,
	error,
});

export const postFuelPurchaseDataSuccess = data => ({
	type: POST_FUEL_PURCHASE_DATA_SUCCESS,
	data,
});

export const postFuelPurchaseDataError = error => ({
	type: POST_FUEL_PURCHASE_DATA_ERROR,
	error,
});

export const fetchFuelPurchaseData = () => (dispatch, getState) => {
	const authToken = getState().authReducer.authToken;
	return fetch(`${API_BASE_URL}/fuel_purchase`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => {
			dispatch(fetchFuelPurchaseDataSuccess(data));
		})
		.catch(err => {
			dispatch(fetchFuelPurchaseDataError(err));
		});
};

export const postFuelPurchase = fuelPurchase => (dispatch, getState) => {
	const authToken = getState().authReducer.authToken;
	return fetch(`${API_BASE_URL}/fuel_purchase`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(fuelPurchase),
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => {
			dispatch(postFuelPurchaseDataSuccess(data));
		})
		.catch(err => {
			dispatch(postFuelPurchaseDataError(err));
		});
};

export const deleteFuelPurchase = id => (dispatch, getState) => {
	const fuelPurchaseId = id;
	const authToken = getState().authReducer.authToken;
	return fetch(`${API_BASE_URL}/fuel_purchase/${fuelPurchaseId}`, {
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
