import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {sendOtp} from './../actions/index'
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


const PhoneNumber = (props) => {

	const [getNumber, setNumber] = useState("");
  const [error, setError] = useState(false);

	const classes = useStyles();

    const notify = (message) => toast(message);

    const getPhoneNumber = (event) => {
      	setNumber(event.target.value)
    }
    
    const registerUser = (event) => {
        event.preventDefault();
        if(getNumber.length === 10){
          let obj = {};
          obj['phoneNumber'] = getNumber;
          props.sendOtp(obj);
        }else{
          setError(true);
        }
    }

    useEffect(() => {
      if(props.userDetails){
       if(props.userDetails.userToken){
            if(props.userDetails.userToken.results.isLogin === false){
              notify(props.userDetails.userToken.message)
            }
        }
    }
  }, [props.userDetails])


	return(
		<div>
    <ToastContainer />
		 	<form className={classes.formCls} noValidate autoComplete="off" onSubmit={registerUser.bind(this)}>
                <TextField 
                id="outlined-basic"
                label="Phone Number"
                type="number"
                value={getNumber}
                className={classes.textBoxCls}
                onChange={getPhoneNumber.bind(this)}
                variant="outlined" />
                {(error) ? <div className={classes.errorCls}>Phone Number should be 10 digit.</div> : null }
                <br />
                
                <Button variant="contained" type="submit" className={classes.btnCls}>{(window.location.pathname === "/login") ? "Login Account" : "Create Account"}</Button>
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
  return bindActionCreators({sendOtp: sendOtp}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumber);
