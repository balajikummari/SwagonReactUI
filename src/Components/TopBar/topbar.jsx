import React, { Component } from 'react';
import Logo from '../../Components/Logo/logo'
import './topbar.css';
import avtar from './avtar.png'
import { Redirect } from "react-router-dom";
import { withRouter } from 'react-router-dom' 

class Topbar extends Component 
{
    constructor(props){
        super(props);
        this.state = {
            email: window.localStorage.getItem('email'),
            password:'',
            id: window.localStorage.getItem('id')
        };
    }

    handleLogout = event =>{
        window.localStorage.clear();
    }

    render(){
        {
            if(this.state.id == null){
                return <Redirect to="/login"/>
            }
        }
        return(
            <div className="bar">
                <Logo/>
                    <div className="dropdown">
                    <div className="dropbtn">
                       <strong>{ this.state.email.substr(0, this.state.email.indexOf('@')) || "test"}</strong>
                        <img className="Proavtar dropbtn" src ={avtar}/> 
                    </div>
                    <div className="dropdown-content">
                        <a href="/"  >DashBoard</a>
                        <a href="offer"  >Offer a Ride</a>
                        <a href= "Book"  >Book a Ride</a>
                        <a href="/MyRides" >My Rides</a>
                        <a href="login" onClick ={this.handleLogout} >LogOut</a>
                    </div>
                    </div>
            </div>
            )
    }
}

export default withRouter(Topbar); 
