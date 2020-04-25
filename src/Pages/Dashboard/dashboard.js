import React from 'react';
import './dashboard.css';
import { Redirect } from "react-router-dom";
import Topbar from '../../Components/TopBar/topbar'

const Dashboard = (props) => {
    if( window.localStorage.getItem('email') == null){
        return <Redirect to="/login"/>
    }
    return(

    <div className="Grid">
        <Topbar/>
        <div className="empty"></div>
        <div className = "name"><h3 >Hey { window.localStorage.getItem('email').split("@")[0] || "testName"}!</h3></div>
        <div className = "options">

            <a href ="book"><button  id="book" className = "option hovicon effect-8"> Book A Ride</button></a>
            <a href ="offer"><button id ="offer" className ="option hovicon effect-8">  Offer A Ride</button></a>
        </div>
        <link rel="stylesheet" type="text/css" href="https://netdna.bootstrapcdn.com/font-awesome/3.0.2/css/font-awesome.css" />
    </div>
    
    );
} 
export default Dashboard;