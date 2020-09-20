import jwtDecode from 'jwt-decode';
import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utilsActions';
import { saveAuthToken, clearAuthToken } from '../local-storage';

import {
	SET_AUTH_TOKEN,
	AUTH_ERROR,
	AUTH_REQUEST,
	AUTH_SUCCESS,
	CLEAR_AUTH,
	HIDE_TIMEOUT_WARNING,
	SHOW_TIMEOUT_WARNING,
	ONBOARDING_SUCCESS,
	UPDATE_SELECTED_VEHICLE_ID,
	UPDATING_USER_SUCCESS,
} from './types';

export const setAuthToken = authToken => ({
	type: SET_AUTH_TOKEN,
	authToken,
});

export const authError = error => ({
	type: AUTH_ERROR,
	error,
});

export const authRequest = () => ({
	type: AUTH_REQUEST,
});

export const authSuccess = user => ({
	type: AUTH_SUCCESS,
	user,
});

export const clearAuth = () => ({
	type: CLEAR_AUTH,
});

export const hideTimeoutWarning = () => ({
	type: HIDE_TIMEOUT_WARNING,
});

export const showTimeoutWarning = () => ({
	type: SHOW_TIMEOUT_WARNING,
});

export const onboardingSuccess = user => ({
	type: ONBOARDING_SUCCESS,
	user
});

export const updateSelectedVehicleId = user => ({
	type: UPDATE_SELECTED_VEHICLE_ID,
	user
})

export const updatingUserSuccess = user => ({
	type: UPDATING_USER_SUCCESS,
	user,
});

const storeAuthInfo = (authToken, dispatch) => {
	const decodedToken = jwtDecode(authToken);
	dispatch(setAuthToken(authToken));
	dispatch(authSuccess(decodedToken));
	saveAuthToken(authToken);
};

export const registerUser = user => dispatch => {
	return fetch(`${API_BASE_URL}/user/create`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(user),
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

export const login = (username, password) => dispatch => {
	dispatch(authRequest());
	return fetch(`${API_BASE_URL}/user/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username,
			password,
		}),
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({ authToken }) => storeAuthInfo(authToken, dispatch))
		.catch(err => {
			const { code } = err;
			const message =
				code === 401
					? 'Incorrect username or password'
					: 'Unable to login, please try again';
			dispatch(authError(err));
			return Promise.reject(
				new SubmissionError({
					_error: message,
				}),
			);
		});
};

export const refreshAuthToken = () => (dispatch, getState) => {
	dispatch(authRequest());
	const authToken = getState().authReducer.authToken;
	return fetch(`${API_BASE_URL}/user/refresh`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${authToken}`,
		},
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(({ authToken }) => storeAuthInfo(authToken, dispatch))
		.catch(err => {
			dispatch(authError(err));
			dispatch(clearAuth());
			clearAuthToken(authToken);
		});
};

export const submitOnboardingValues = (oilChangeFrequency, vehicleName) => (dispatch, getState) => {
	const authToken = getState().authReducer.authToken;
	const user = getState().authReducer.user;
	let updatedUser = { ...user };
	updatedUser.onboarding = false;
	const newVehicle = { vehicleName, oilChangeFrequency };

	return fetch(`${API_BASE_URL}/vehicle`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(newVehicle),
	})
		.then(res => normalizeResponseErrors(res))
		.then(res => res.json())
		.then(data => {
			const onboardingValues = {
				onboarding: 'false',
				selectedVehicle: data.id,
			};
			updatedUser.selectedVehicle = data.id;
			fetch(`${API_BASE_URL}/user/update`, {
				method: 'PUT',
				headers: {
					'content-type': 'application/json',
					Authorization: `Bearer ${authToken}`,
				},
				body: JSON.stringify(onboardingValues),
			});
		})
		.then(() => {
			dispatch(onboardingSuccess(updatedUser));
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

export const updateSelectedVehicle = vehicleId => (dispatch, getState) => {
	const authToken = getState().authReducer.authToken;
	const user = getState().authReducer.user;
	let updatedUser = { ...user };
	updatedUser.selectedVehicleId = vehicleId;
	const updatingUserValues = {
		selected_vehicle_id: vehicleId,
	};

	return fetch(`${API_BASE_URL}/user/update`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/json',
			Authorization: `Bearer ${authToken}`,
		},
		body: JSON.stringify(updatingUserValues),
	})
		.then(() => {
			dispatch(onboardingSuccess(updatedUser));
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
