import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {logoutSession} from './../actions/index'
import HomePageDetails from './HomePageDetails';
import UserProfile from './UserProfile';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
   white: {
    color: '#57C184',
    backgroundColor: '#fff',
    position: 'absolute',
    right: '20px'
  },
  menuTab: {

  }
}));

const Home = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [getAvatar, setAvatar] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [toggleHome, setToggleHome] = useState(false);


  const notify = (message) => toast(message);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

   const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    setToggleHome(true)
  }

  const gotoPage = (data) => {
    if(data === "Profile"){
      setToggleHome(true)
    }else{
      setToggleHome(false)
    }
    
  }

  const logoutUser = () => {
    props.logoutSession(token, userId);
  }

  useEffect(() => {
      if(props.userDetails.finalUserAccount){
        console.log(props.userDetails)
        setAvatar(props.userDetails.finalUserAccount.results.user.firstName.charAt(0).toUpperCase());
        notify("User Sign Up Successfull!")
        setUserId(props.userDetails.finalUserAccount.results.user.token);
        setToken(props.userDetails.finalUserAccount.results.user._id)
      }else if(props.userDetails.otpVerification){
        setAvatar(props.userDetails.otpVerification.results.user.firstName.charAt(0).toUpperCase());
        setUserId(props.userDetails.otpVerification.results.user.token);
        setToken(props.userDetails.otpVerification.results.user._id)
        notify("User Logged in !")
      }else if(props.userDetails.logoutSession){
        notify(props.userDetails.logoutSession.message);
        props.history.push('/');
      }
      if(props.userDetails.updateUserDetails){
        notify(props.userDetails.updateUserDetails.message);
      }
  }, [props.userDetails])

  return (
    <div className={classes.root}>
       <ToastContainer />
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        style={{
          background: "#57C184"
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Avatar className={classes.white} onClick={handleClick}>{getAvatar}</Avatar>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menuTab}
            style={{
              top: 50
            }}
          >
            <MenuItem onClick={goToProfile}>Profile</MenuItem>
            <MenuItem onClick={logoutUser}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Home', 'Profile'].map((text, index) => (
            <ListItem button key={text} onClick={gotoPage.bind(this, text)}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {(!toggleHome) ? <HomePageDetails /> : <UserProfile />}
      </main>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
      userDetails: state.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({logoutSession: logoutSession}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
