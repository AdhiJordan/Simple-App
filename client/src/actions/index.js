import axios from 'axios';
import {
  SEND_OTP,
  VERIFY_OTP,
  VERIFY_OTP_ERROR,
  SET_EMAIL,
  VERIFY_EMAIL,
  USER_SIGN_UP,
  UPDATE_PROFILE,
  LOGOUT
} from './types'
import {API_URL} from './../data/url';

export const sendOtp = (data) => async dispatch => { //call back function definition 
    axios.post(API_URL + `users/phone`, data)
    .then(res => {
      console.log(res);
      dispatch(getUserDetails(res.data, data))
    })
    .catch(err => {
      console.log(err.response);
      
    })
}


export const verifyOTP = (data) => async dispatch => { //call back function definition 
    axios.post(API_URL + `users/phone/verify`, data)
    .then(res => {
      console.log(res);
      dispatch(getVerificationOTP(res.data))
    })
    .catch(err => {
      console.log(err.response);
      dispatch(errorOtp(err.response))
    })
}

export const setEmailId = (data, email) => async dispatch => { //call back function definition 
    axios.post(API_URL + `users/email`, data)
    .then(res => {
      console.log(res);
      dispatch(getEmailID(res.data, email))
    })
    .catch(err => {
      console.log(err.response);
    })
}


export const verifyToken = (data) => async dispatch => { //call back function definition 
    axios.post(API_URL + `users/email/verify`, data)
    .then(res => {
      console.log(res);
      dispatch(getEmailTokenVerify(res.data))
    })
    .catch(err => {
      console.log(err.response);
    })
}  

export const userSignUp = (data) => async dispatch => { //call back function definition 
    axios.post(API_URL + `users`, data)
    .then(res => {
      console.log(res);
      dispatch(getFinalSignUp(res.data))
    })
    .catch(err => {
      console.log(err.response);
    })
} 

export const updateProfile = (userId, token, userData) => async dispatch => { //call back function definition 
    console.log("update", userId, token, userData)
    let data = userId + `,` + token;
    axios.put(API_URL + `users/` + userId , userData, { headers: {"Authorization" : `Bearer ${data}`}})
    .then(res => {
      console.log(res);
      dispatch(updateUser(res.data))
    })
    .catch(err => {
      console.log(err.response);
    })
}  

export const logoutSession = (userId, token) => async dispatch => { //call back function definition 
    let data = userId + `,` + token;
    axios.delete(API_URL + `users/logout/` + userId , { headers: {"Authorization" : `Bearer ${data}`}} )
    .then(res => {
      console.log(res);
      dispatch(logoutUser(res.data))
    })
    .catch(err => {
      console.log(err.response);
    })
}  


export const getUserDetails = (data, phone) => {
  console.log("data received here", data)
  return {
    type: SEND_OTP,
    payload: data,
    phoneNumber: phone
  };
}


export const getVerificationOTP = data => {
  console.log("data received here", data)
  return {
    type: VERIFY_OTP,
    payload: data
  };
}

export const getEmailID = (data, email) => {
  console.log("data received here", data)
  return {
    type: SET_EMAIL,
    payload: data,
    email: email
  };
}


export const getEmailTokenVerify = (data, email) => {
  console.log("data received here", data)
  return {
    type: VERIFY_EMAIL,
    payload: data
  };
}

export const getFinalSignUp = (data) => {
  console.log("data received here", data)
  return {
    type: USER_SIGN_UP,
    payload: data
  };
}


export const updateUser = (data) => {
  console.log("data received here", data)
  return {
    type: UPDATE_PROFILE,
    payload: data
  };
}


export const logoutUser = (data) => {
  console.log("data received here", data)
  return {
    type: LOGOUT,
    payload: data
  };
}


export const errorOtp = data => {
  console.log("data received here", data)
  return {
    type: VERIFY_OTP_ERROR,
    payload: data
  };
}

