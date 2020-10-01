import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {verifyToken} from './../actions/index'
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


const EmailToken = (props) => {

	const [getEmailToken, setEmailToken] = useState("");
  const [error, setError] = useState(false);

	const classes = useStyles();

    const setEmailVerify = (event) => {
      setEmailToken(event.target.value)
    }

    const notify = (message) => toast(message);

    const verifyEmail = (event) => {
        event.preventDefault();
        if(getEmailToken.length === 6){
            let obj = {};
            obj['email'] = props.userDetails.userEmail;
            obj['token'] = props.userDetails.userToken.results.token.toString();
            obj['verificationToken'] = getEmailToken;
            props.verifyToken(obj);
        }else{
          setError(true);
        }
    }

    const resendOtp = () => {
      
    }

    useEffect(() => {
         if(props.userDetails.emailDetails.message){
           notify(props.userDetails.emailDetails.message)
        }
        
      }, [props.userDetails])

	return(
		<div>
    <ToastContainer />
		 	<form className={classes.formCls} noValidate autoComplete="off" onSubmit={verifyEmail.bind(this)}>
        <TextField 
        id="otp"
        label="Enter OTP"
        value={getEmailToken}
        type="number"
        className={classes.textBoxCls}
        onChange={setEmailVerify.bind(this)}
        variant="outlined" />
        <div></div>
        {(error) ? <div className={classes.errorCls}>Token should be 6 digit.</div> : null }
        <br />
        <Button variant="contained" type="submit" className={classes.btnCls}>Verify Email Token</Button>
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
  return bindActionCreators({verifyToken: verifyToken}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailToken);
