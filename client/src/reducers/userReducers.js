import {SEND_OTP, VERIFY_OTP, VERIFY_OTP_ERROR, SET_EMAIL, VERIFY_EMAIL, USER_SIGN_UP,UPDATE_PROFILE,  LOGOUT} from './../actions/types';

const initialState = {
	userToken: null,
	userNumber: "",
	userEmail: "",
	otpVerification: null,
	errorOtp: null,
	emailDetails: null,
	emailVerfication: null,
	finalUserAccount: null,
	updateUserDetails: null,
	logoutSession: null
}


export default function (state = initialState, action){

	const {type, payload, phoneNumber, email} = action;

	switch(type){
		case SEND_OTP:
			return {
				...state, 
				userToken: payload,
				userNumber: phoneNumber,
				logoutSession: null
			}

		case VERIFY_OTP:
			return {
				...state, 
				otpVerification: payload
			}
		case SET_EMAIL:
			return {
				...state, 
				emailDetails: payload,
				userEmail: email
			}
		case VERIFY_EMAIL:
			return {
				...state, 
				emailVerification: payload
			}
		case USER_SIGN_UP: 
			return {
				...state, 
				finalUserAccount: payload
			}
		case UPDATE_PROFILE: 
			return {
				...state, 
				updateUserDetails: payload
			}
		case LOGOUT: 
			return {
				...state, 
				logoutSession: payload,
				userToken: null,
				userNumber: "",
				userEmail: "",
				otpVerification: null,
				errorOtp: null,
				emailDetails: null,
				emailVerfication: null,
				finalUserAccount: null
			}
		case VERIFY_OTP_ERROR:
			return {
				...state, 
				errorOtp: payload
			}
		default: 
		return state;
	}
}