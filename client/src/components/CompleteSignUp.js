import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {connect} from 'react-redux';
import {userSignUp} from './../actions/index'
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
    marginTop: 10,
    marginBottom: 30
  },
  errorCls: {
    color: 'red',
    textAlign: 'left',
    marginBottom: 10
  }
}));


const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    }
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);


const CompleteSignUp = (props) => {

  const [getFirstName, setFirstName] = useState("");
  const [getLastName, setLastName] = useState("");
  const [getEmailId, setEmailId] = useState("");
  const [getCode, setCode] = useState("");
   const [state, setState] = React.useState({
    checkedG: true
  });
	const [getNumber, setNumber] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

	const classes = useStyles();

    const notify = (message) => toast(message);


    const handleChange = (data, event) => {
        let objData = formData;
        objData[data] = event.target.value;
        setFormData(objData);
    }

    const handleValidation = () => {
        let event = formData;
        let errors = {};
        let formIsValid = true;

          if(!event["firstName"]){
             formIsValid = false;
             errors["firstName"] = "First Name Cannot be empty !";
          }else if(event["firstName"]){
            let data = event['firstName'];
            if(/\d/.test(data)){
              formIsValid = false;
              errors["firstName"] = "First Name should not contain numbers !";
            }
          }
        
        
          if(!event["lastName"]){
             formIsValid = false;
             errors["lastName"] = "Last Name Cannot be empty !";
          }else if(event["lastName"]){
            let data = event['lastName'];
            if(/\d/.test(data)){
              formIsValid = false;
              errors["lastName"] = "Last Name should not contain numbers !";
            }
          }

      setErrors(errors);
      return formIsValid;
    }




    const getPhoneNumber = (event) => {
      	setNumber(event.target.value)
    }
    
    const registerUser = (event) => {
        event.preventDefault();
        if(handleValidation()){
            let obj = {};
            obj['firstName'] = formData.firstName;
            obj['lastName'] = formData.lastName;
            obj['email'] = props.userDetails.userEmail;
            obj['referredCodeKey'] = formData.code;
            obj['phoneNumber'] = props.userDetails.userNumber.phoneNumber;
            obj['token'] = props.userDetails.userToken.results.token.toString();
            obj['agreeToPrivacyPolicy'] = true;
            obj['source'] = "WEB_APP"
            props.userSignUp(obj);
        }
        
    }

    const handleChangeCheck = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
   };

    useEffect(() => {
        //  if(props.userDetails.emailVerification.message){
        //    notify(props.userDetails.emailVerification.message)
        // }
        
    }, [props.userDetails])

   console.log("errors", errors)

	return(
		<div>
    <ToastContainer />
		 	<form className={classes.formCls} noValidate autoComplete="off" onSubmit={registerUser.bind(this)}>
                <TextField 
                  id="firstName"
                  label="Enter First Name *"
                  type="text"
                  className={classes.textBoxCls}
                  onChange={handleChange.bind(this, 'firstName')}
                  variant="outlined" />
                  {(errors.firstName) ? <div className={classes.errorCls}>{errors.firstName}</div> : null }
                 <TextField 
                  id="lastName"
                  label="Enter Last Name *"
                  type="text"
                  className={classes.textBoxCls}
                  onChange={handleChange.bind(this, 'lastName')}
                  variant="outlined" />
                  {(errors.lastName) ? <div className={classes.errorCls}>{errors.lastName}</div> : null }
                  <TextField 
                    id="outlined-basic"
                    label="Refer Code"
                    type="text"
                    className={classes.textBoxCls}
                    onChange={handleChange.bind(this, 'code')}
                    variant="outlined" />

                    <FormControlLabel
                      control={<GreenCheckbox checked={state.checkedG} onChange={handleChangeCheck} name="checkedG" />}
                      label="I agree Terms of Service and conditions. "
                    />
                <br />
                
                <Button variant="contained" type="submit" className={classes.btnCls}>Final Step</Button>
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
  return bindActionCreators({userSignUp: userSignUp}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompleteSignUp);
