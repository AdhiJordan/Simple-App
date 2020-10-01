import React, {Component} from 'react';
import { Route } from "react-router";
import {BrowserRouter, Switch} from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';


class App extends Component{
    render(){
        return(
            <BrowserRouter>
              <Switch>
                <Route exact path="/" component={SignUp} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/home" component={Home} />
              </Switch>
            </BrowserRouter>
        )
    }
}

export default App;
