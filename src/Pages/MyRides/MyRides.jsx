import React, { Component } from 'react';
import './MyRides.css'
import TopBar from '../../Components/TopBar/topbar'
import MyOfferscard from "../../Components/MyOffersCard/Offercard"
import MyBookingcard from "../../Components/MyBookingscard/Bookingcard"

import axios from 'axios'
import RideDetails from '../../Components/RideDeatils/RideDetails';

class MyRides extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId : window.localStorage.getItem('id'),
            Bookings : [],
            offers : []
          };
          this.LoadUsersOffers()
        this.loadUsersBookings()
    }

    loadUsersBookings(){
        var self = this
        axios.get('https://localhost:44374/api/Bookings/'+String(this.state.userId))
        .then(function(resonse){
            self.setState( {Bookings : resonse.data} )
        }).catch(function(error){
            console.error(error);
        })
    }
    LoadUsersOffers(){
        var self = this
        axios.get('https://localhost:44374/api/Rides/user/'+String(this.state.userId))
        .then(function(resonse){
            self.setState( {offers : resonse.data} )
        }).catch(function(error){
            console.error(error);
        })
    }

    render() {
        return (
            <div className="superContainer">
                <TopBar/>
                <div className="MainContainer">

                    <div className = "BookedRidesContainer">
                        <div className = "brhead">Rides Booked By you</div>
                        <div>
                        {this.state.Bookings.map( RideDetails => (
                                <MyBookingcard RideDetails = {RideDetails} />
                            ))} 
                        </div>
                    </div>
 
                    <div className ="OfferedRidesContainer">
                        <div className = "orhead">Rides Offerd by you</div>
                        <div>
                        {this.state.offers.map( RideDetails => (
                                <MyOfferscard RideDetails = {RideDetails} />
                            ))} 
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MyRides;