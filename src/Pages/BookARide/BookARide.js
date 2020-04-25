import React, { Component } from 'react';
import RideDetails from "../../Components/RideDeatils/RideDetails"
import  Matchcard from "../../Components/MatchCard/Matchcard"
import './BookARide.css';
import {  withRouter } from 'react-router-dom' 
import Logo from '../../Components/Logo/logo'
import Topbar from '../../Components/TopBar/topbar'
import axios from "axios"

class BookARide extends Component{

    constructor(){
        super();
        this.state = {
            initialBookings : [],
            cities :[],
            formdata : null,
            selectedBooking : null
        };
        this.getformData = this.getformData.bind(this)
        this.getSelectedCardDetails = this.getSelectedCardDetails.bind(this)
    }

    async getSelectedCardDetails(bookig){
        console.log(bookig)
        await this.setState({selectedBooking : bookig})
        await this.invokeCreateBookingApi()
    }
   async getformData(formdata){
       await this.setState({formdata : formdata})
        this.getRideDetails();
    }

    getRideDetails(){
        var self = this;
                    axios(
                        {
                        method: 'post',
                        url: 'https://localhost:44374/api/Rides/GetRideDetails',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            "Acces-Control-Allow-Origin": "*"
                        }, 
                        data: this.state.formdata
                    }).then(function (response) {
                             console.log("after submit : "+response.data);
                               let BookingsFromApi = response.data.map(booking => {
                                   return { 
                                    id: booking.id,
                                    offerCreatorId: booking.offerCreatorId,
                                    fromCityId: booking.fromCityId,
                                    toCityId: booking.toCityId,
                                    journeyDate: booking.journeyDate,
                                    journeTime: booking.journeTime,
                                    entireJourneyFare: booking.entireJourneyFare,
                                    cityIdsOfStops:booking.cityIdsOfStops,
                                    BookedSeats : booking.bookedSeats,
                                    OfferedSeats : booking.offeredSeats
                                   }
                                 });
                                 self.setState({
                                    initialBookings: [].concat(BookingsFromApi)
                                 });
                           })
                           .catch(function (error) {
                               console.log(error);
                           })
    }
     
   async LoadInitialOffers(){
        var self = this;
        var apiRes;
        await axios.get('https://localhost:44374/api/Rides/Country/IND')
                       .then(function (response) {
                               apiRes = response.data
                           })
                           .catch(function (error) {
                               // handle error
                               console.log(error);
                           })
                           let BookingsFromApi = apiRes.map(booking => {
                            return { 
                             id: booking.id,
                             offerCreatorId: booking.offerCreatorId,
                             fromCityId: booking.fromCityId,
                             toCityId: booking.toCityId,
                             journeyDate: booking.journeyDate,
                             journeTime: booking.journeTime,
                             entireJourneyFare: booking.entireJourneyFare,
                             cityIdsOfStops:booking.cityIdsOfStops,
                             BookedSeats : booking.bookedSeats ,
                             OfferedSeats : booking.offeredSeats
                            }
                          });
                          self.setState({
                             initialBookings: [].concat(BookingsFromApi)
                          });
    }

    loadCitiesdata(){

        var self = this
        axios.get('https://localhost:44374/cities/IND')
        .then(function (response) {
                let CitesFromApi = response.data.map(city => {
                    return {value: city.name ,state : city.state, display: city.name }
                  });
                  self.setState({
                    cities: [{value: 'Select City',state : ' State'}].concat(CitesFromApi.sort())
                  });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    invokeCreateBookingApi(){
        var self = this;
        console.log(this.state.selectedBooking)
                        axios(
                            {
                            method: 'post',
                            url: 'https://localhost:44374/api/Bookings                            ',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json',
                                "Acces-Control-Allow-Origin": "*"
                            },
                            data: this.state.selectedBooking
                        }).then(
                            self.props.history.push('/')
                        ).catch(function (error) {
                                   console.log(error);
                               })
        
    }

    componentDidMount(){
        this.loadCitiesdata()
        this.LoadInitialOffers()
        
    } 

    render(){ 
    return(
    <div className="Grid">
        <div className="logo"><Topbar/></div>
            <div className="column2">
            <RideDetails cities = {this.state.cities}  getformData = {this.getformData}>Book A Ride</RideDetails>
                <div className="matchesSec">
                    <h2 className="matchesHeading">Your Matches</h2>
                    <div className = "matches">
                         {this.state.initialBookings.map( booking => (
                            <Matchcard 
                             rideOfferId = {booking.id}
                             getSelectedCardDetails = {this.getSelectedCardDetails}
                             OfferCreatorId = {booking.offerCreatorId }
                             FromCity ={ booking.fromCityId } 
                             ToCity = { booking.toCityId}
                             DateofJourney ={ booking.journeyDate }
                             timeOfDeparture ={booking.journeTime}
                             price ={booking.entireJourneyFare} 
                             cityIdsOfStops  = {booking.cityIdsOfStops}
                             OfferedSeats = {booking.OfferedSeats}
                             BookedSeats = {booking.BookedSeats} />
                        ))} 
                    </div>
                </div>  
         </div>
    </div>
    );
  } 
}
export default withRouter(BookARide);