import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {verifyOTP} from './../actions/index'
import {bindActionCreators} from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  formCls: {
    textAlign: 'center'
  },
  textBoxCls: {
    width: '100%',
    marginBottom: '20px'
  },
  btnCls: {
    background: '#696969',
    color: '#fff',
    borderRadius: 20,
    paddingLeft: 40,
    paddingRight: 40,
    marginBottom: 30,
    marginTop: 30
  },
    errorCls: {
    color: 'red',
    textAlign: 'left'
  },
    otpCls: {
    textAlign: 'right',
    marginBottom: 20,
    cursor: 'pointer'
  },
}));


const VerifyOtp = (props) => {

	const [getOtp, setOtp] = useState("");
  const [error, setError] = useState(false);

	const classes = useStyles();

    const setOtpVerify = (event) => {
      setOtp(event.target.value)
    }

    const notify = (message) => toast(message);

    const verifyOtp = (event) => {
        event.preventDefault();
        if(getOtp.length === 4){
            let obj = {};
            obj['phoneNumber'] = props.userDetails.userNumber.phoneNumber;
            obj['verificationCode'] = getOtp;
            obj['token'] = props.userDetails.userToken.results.token;
            props.verifyOTP(obj);
        }else{
          setError(true);
        }
    }

    const resendOtp = () => {

    }

    useEffect(() => {
        if(props.userDetails.userToken){
            if(props.userDetails.userToken.results.isLogin === false){
              notify(props.userDetails.userToken.message)
            }else if(props.userDetails.userToken.results.isLogin === true){
              notify(props.userDetails.userToken.message)
            }
        }
      }, [props.userDetails])

	return(
		<div>
    <ToastContainer />
		 	<form className={classes.formCls} noValidate autoComplete="off" onSubmit={verifyOtp.bind(this)}>
        <TextField 
        id="otp"
        label="Enter OTP"
        value={getOtp}
        type="number"
        className={classes.textBoxCls}
        onChange={setOtpVerify.bind(this)}
        variant="outlined" />
        <div></div>
        {(error) ? <div className={classes.errorCls}>OTP should be 4 digit.</div> : null }
        <br />
        <Button variant="contained" type="submit" className={classes.btnCls}>Verify OTP</Button>
      </form>
		</div>
	)
}

const mapStateToProps = (state) => {
  return {
      userDetails: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({verifyOTP: verifyOTP}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyOtp);
