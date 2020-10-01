import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {sendOtp, verifyOTP} from './../actions/index'
import {bindActionCreators} from 'redux';
import PhoneNumber from './../components/PhoneNumber';
import VerifyOtp from './../components/VerifyOtp';
import EmailId from './../components/EmailId';
import EmailToken from './../components/EmailToken';
import CompleteSignUp from './../components/CompleteSignUp';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  informationCls: {
    background: '#57C184',
    height: '100vh',
    paddingTop: '15%',
    display: 'block',
    ['@media (max-width:576px)']: {
      display: 'none'
    }
  },
  loginCls: {
    background: '#FFF',
    padding: '5% 10% 0% 10%'
  },
  titleCls: {
    color: '#fff',
    padding: '40px',
    textAlign: 'center',
    cursor: 'pointer'
  },
  passwordCls: {
    textAlign: 'right',
    marginBottom: 20,
    cursor: 'pointer'
  },
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
    marginBottom: 30
  },
  otherCls: {
    position: 'relative',
    bottom: "28px",
    width: "34px",
    background: "#fff",
    textAlign: "center",
    left: "46%"
  },
    linkCls: {
    textDecoration: 'none',
    cursor: 'pointer',
    "&:hover": {
        textDecoration: 'none',
        cursor: 'pointer'
    }
  }
}));

const SignUp  = (props) => {

    const [getNumber, setNumber] = useState("");
    const [getOtp, setOtp] = useState("");
    const [toggleStep, setToggleStep] = useState(0);

    const notify = (message) => toast(message);

    useEffect(() => {
      if(props.userDetails){
        if(props.userDetails.userToken){
            if(props.userDetails.userToken.results.isLogin === false){
              setToggleStep(1)
            }else if(props.userDetails.userToken.results.isLogin === true){
            }
        }
        if(props.userDetails.otpVerification){
          if(props.userDetails.otpVerification.results){
              if(props.userDetails.otpVerification.results.isLogin === false){
              setToggleStep(2)
              }
              else{

              }
          }
          
        }
        if(props.userDetails.emailDetails){
          if(props.userDetails.emailDetails.results.isLogin === null){
              setToggleStep(3)
             // notify(props.userDetails.emailDetails.message)
          }
        }
        if(props.userDetails.emailVerification){
          if(props.userDetails.emailVerification.results.isLogin === false){
              setToggleStep(4)
             // notify(props.userDetails.emailDetails.message)
          }
        }
        if(props.userDetails.finalUserAccount){
          if(props.userDetails.finalUserAccount.results.user.token){
              props.history.push('/home');
             //notify(props.userDetails.finalUserAccount.message)
          }
        }
        if(props.userDetails.logoutSession){
          notify(props.userDetails.logoutSession.message);
          setToggleStep(0)
        }
      }
    }, [props.userDetails])


    const classes = useStyles();
    return(
          <div className={classes.root}>
            <ToastContainer />
            <Grid container direction="row" justify="center">
              <Grid item lg={6} md={6} xs={12} className={classes.informationCls}>
                <Typography variant="h2" gutterBottom className={classes.titleCls}>   
                  Your Money, Your Way
                </Typography>
                <Typography variant="h5" gutterBottom className={classes.titleCls}>   
                  Powering Financial Independence for Women 
                </Typography>
              </Grid>
              <Grid item lg={6} md={6} xs={12} className={classes.loginCls}>  
                <Typography variant="h3" gutterBottom className={classes.titleCls} style={{color: "#B7B7B7"}}>
                  <img src="https://static.wixstatic.com/media/51b1dd_d372dc710da3459ba83bb3414df7bd87~mv2.png/v1/fill/w_120,h_44,al_c,q_85,usm_0.66_1.00_0.01/Basis%20Green%20Logo.webp" width="200px" height="75px" />
                </Typography>
                  {(toggleStep === 0) ? <PhoneNumber /> : null }
                  {(toggleStep === 1) ? <VerifyOtp /> : null }
                  {(toggleStep === 2) ? <EmailId /> : null }
                  {(toggleStep === 3) ? <EmailToken /> : null }
                  {(toggleStep === 4) ? <CompleteSignUp /> : null }
                  <div style={{position: "relative"}}>
                    <hr style={{color: "#B7B7B7", width: "140px"}} />
                    <p className={classes.otherCls}>or</p>
                  </div>
                  <Link to="/login" className={classes.linkCls}>
                      <Typography variant="h6" gutterBottom className={classes.titleCls} style={{color: "#B7B7B7"}}>
                           Already an existing user?
                      </Typography>
                  </Link>
              </Grid>
              </Grid>
          </div>
    )
}

const mapStateToProps = (state) => {
  return {
      userDetails: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({sendOtp: sendOtp, verifyOTP: verifyOTP}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
