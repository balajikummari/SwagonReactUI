import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login/LoginPage'
import Dash from './Dashboard/dashboard'
import Offer from './OfferARide/OfferARide'
import Bookride from './BookARide/BookARide'
import Signup from './Signup/SignupPage'
import MyRides from './MyRides/MyRides'


function  PageControl(){

    return(
        <div>
            <Switch>
            <Route exact path="/" component ={Dash}/>
            <Route exact path="/login" component ={Login}/>
            <Route exact path="/Offer" component ={Offer}/>
            <Route exact path="/Book" component ={Bookride}/> 
            <Route exact path="/signup" component ={Signup}/> 
            <Route exact path="/MyRides" component ={MyRides}/> 
            </Switch>
        </div>
    );
}
export default PageControl;