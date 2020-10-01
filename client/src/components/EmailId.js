import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {setEmailId} from './../actions/index'
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
  }
}));


const EmailId = (props) => {

	const [emailId, setEmailId] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("")

	const classes = useStyles();

    const setEmail = (event) => {
      setEmailId(event.target.value)
      emailValidation(event.target.value)
    }

    const notify = (message) => toast(message);

    const emailValidation = (data) => {
        let formIsValid = true;
        if(data === ""){
            setErrorText("Email Cannot be empty !");
            formIsValid = false;
            setError(true);
        } else if(data){
            let re = /\S+@\S+\.\S+/;
            if(re.test(data) === true){
              setError(false);
            }else{
              setErrorText("Email is not valid !");
              setError(true);
            }
        } 
        return formIsValid;
    }

    const registerEmail = (event) => {
        event.preventDefault();
        if(emailValidation()){
            let obj = {};
            obj['phoneNumber'] = props.userDetails.userNumber.phoneNumber;
            obj['email'] = emailId;
            obj['token'] = props.userDetails.userToken.results.token;
            props.setEmailId(obj, emailId);
        }
    }

      useEffect(() => {
        if(props.userDetails.otpVerification.message){
           notify(props.userDetails.otpVerification.message)
        }
        
      }, [props.userDetails])

	return(
		<div>
    <ToastContainer />
		 	<form className={classes.formCls} noValidate autoComplete="off" onSubmit={registerEmail.bind(this)}>
        <TextField 
        id="email"
        label="Enter Email"
        value={emailId}
        type="email"
        className={classes.textBoxCls}
        onChange={setEmail.bind(this)}
        variant="outlined" />
        {(error) ? <div className={classes.errorCls}>{errorText}</div> : null }
        <br />
        <Button variant="contained" type="submit" className={classes.btnCls}>Enter Email Id</Button>
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
  return bindActionCreators({setEmailId: setEmailId}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EmailId);
