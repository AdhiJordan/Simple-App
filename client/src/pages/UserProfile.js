import React, {useState, useEffect} from 'react';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import {connect} from 'react-redux';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import {updateProfile} from './../actions/index';
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

const UserProfile = (props) => {

	const [firstName, setFirstName] = useState("asasas");
	const [lastName, setLastName] = useState("asasas");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [toggleName, setToggleName] = useState(true);
	const [token, setToken] = useState("");
  	const [userId, setUserId] = useState("");
  	  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
	const classes = useStyles();

	const editToggle = () => {
		setToggleName(!toggleName)
	}

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


	const cancelToggle = () => {
		setToggleName(true)
	}

	const saveToggle = (event) => {
		event.preventDefault();
		if(handleValidation()){
			let obj = {};
			obj['firstName'] = firstName;
			obj['lastName'] = lastName;
			obj['avatar'] = null;
			props.updateProfile(token, userId, obj);		
		}

	}


	useEffect(() => {
      if(props.userDetails.otpVerification.results.user){
        setFirstName(props.userDetails.otpVerification.results.user.firstName);
        setLastName(props.userDetails.otpVerification.results.user.lastName);
        setPhone(props.userDetails.otpVerification.results.user.phoneNumber);
        setEmail(props.userDetails.otpVerification.results.user.email)
        setUserId(props.userDetails.otpVerification.results.user.token);
        setToken(props.userDetails.otpVerification.results.user._id)
      }else if(props.userDetails.finalUserAccount.results.user){
      	setFirstName(props.userDetails.finalUserAccount.results.user.firstName);
        setLastName(props.userDetails.finalUserAccount.results.user.lastName);
        setPhone(props.userDetails.finalUserAccount.results.user.phoneNumber);
        setEmail(props.userDetails.finalUserAccount.results.user.email)
        setUserId(props.userDetails.finalUserAccount.results.user.token);
        setToken(props.userDetails.finalUserAccount.results.user._id)
      }
      
  }, [props.userDetails])
	
	return(
		<div>
			<Paper elevation={3}>
			 <div class="content-wrapper">
                    
                    <div class="row">
                        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12">
                            <div class="card">
                                <div class="card-body">
                                 <div class="row d-flex client-profile">
									<div class="col-md-5 d-flex justify-content-between">
										<div class="w-100 bg-light text-center p-4 d-flex align-items-center">  
											<div class="d-block w-100 align-items-center justify-content-between">
												<div class="profile-img d-block my-3">
													<img class="img-fluid img-lg rounded-circle" src="/assets/icons/user.jpg" alt="profile image" />
												</div>
												<h4 class="">{}</h4>
											</div>
										</div>
									</div>
										<div class="col-md-7 align-items-center justify-content-between">
										
									<div class="table-responsive">
									<table class="table table-striped" style={{boxShadow: "none"}}>	
										<tbody>
											<tr style={{backgroundColor: "transparent"}}>
												<td style={{width: "30%"}}>First Name</td>
												{(toggleName) ? 
												<td>{firstName}</td> : 
												<td>
													  <TextField 
										                id="outlined-basic"
										                label="First Name"
										                type="text"
										                defaultValue={firstName}
										                className={classes.textBoxCls}
										                onChange={handleChange.bind(this, "firstName")}
										                variant="outlined" />
												</td>
												}
											</tr>
											<tr style={{backgroundColor: "transparent"}}>
												<td>Last Name</td>
												{(toggleName) ? 
												<td>{lastName}</td> : 
												<td>
													  <TextField 
										                id="outlined-basic"
										                label="Last Name"
										                type="text"
										                defaultValue={lastName}
										                className={classes.textBoxCls}
										                onChange={handleChange.bind(this, "lastName")}
										                variant="outlined" />
												</td>
												}
											</tr>
											<tr style={{backgroundColor: "transparent"}}>
												<td>Email</td>
												<td>{email}</td>
											</tr>
											<tr style={{backgroundColor: "transparent"}}>
												<td>Phone</td>
												<td>{phone}</td>
											</tr>
										</tbody>
									</table>
									<div>
									{(toggleName) ? 
										
										 <Button variant="contained" className="mr-5" onClick={editToggle} style={{background: "#57C184", color: '#fff'}}>
									        Edit
									    </Button>:
									<Button variant="contained" className="mr-5" onClick={saveToggle} style={{background: "#57C184", color: '#fff'}}>
									        Save
									    </Button>}
									    <Button variant="contained" onClick={cancelToggle} color="secondary">
									        Cancel
									    </Button>
									</div>
										</div>
										</div>
										</div>
									</div>   	
                                </div>
                            </div>
                        </div>
                    </div>
                </Paper>
		</div>
	)
}

const mapStateToProps = (state) => {
  return {
      userDetails: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({updateProfile: updateProfile}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
