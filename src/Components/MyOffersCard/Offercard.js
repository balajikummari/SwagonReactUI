import React, { Component,useState } from 'react';
import './Matchcard.css';
import art from './art1.png'
import avtar from './avtar.png'

import axios from 'axios'
import ReactDOM from 'react-dom';
import MyModal from '../ConformationPopup/modal'
import BookingEntries from '../BookingEntries/BookingEntries'
import  { Button} from 'react-bootstrap'
import { withRouter } from 'react-router-dom' 

class Offercard extends Component{ 
  constructor(props){
    super(props);
    this.state = {
      isClick : false,
      modalShow :false,
      bookings:[],
      BookingCreators :[],
      RenderdBookings:[]
    }
  }
  
 componentDidMount(){
   this.GetBookings()
 }

  GetBookings(){
    var self = this
        axios.get('https://localhost:44374/api/Bookings/offerid/'+String(this.props.RideDetails.id))
        .then(async function(resonse){
            self.setState({bookings : resonse.data})
            self.RenderBookingsOfOffer()
        })
        
  }
  AcceptBooking(booking){
    var self = this
    axios.get('https://localhost:44374/api/Bookings/Staus/'+String(booking.id)+'/'+1)
    .then(function(resonse){
       self.props.history.push('/MyRides')
    }).catch(function(error){
        console.error(error);
    })
  }

  RejectBooking(booking){
    var self = this
    axios.get('https://localhost:44374/api/Bookings/Staus/'+String(booking.id)+'/'+2)
    .then(function(resonse){
      self.props.history.push('/MyRides')
    }).catch(function(error){
        console.error(error);
    })
  }

  RenderBookingsOfOffer(){
      
    this.state.bookings.forEach(async(booking) =>  {
                          var BookingCreator = await this.GetBookingCreator(booking.bookingCreatorId)
                          this.setState({RenderdBookings: this.state.RenderdBookings.concat(
                            <BookingEntries 
                             booking = {booking} 
                              BookingCreator ={BookingCreator} 
                              AcceptBooking = {this.AcceptBooking.bind(this)}
                              RejectBooking = {this.RejectBooking.bind(this)}
                              />                            
                          )
                          });
  })
  }

  async OpenBookings(){

      if(this.state.isClick == true){
        this.setState({isClick : false})
      }
      else{
        this.setState({isClick : true})
    }
  }

   async GetBookingCreator(id){
      var temp
    await  axios.get('https://localhost:44374/api/User/'+String(id))
      .then(function(resonse){
        temp = resonse.data
      })
      this.setState({ BookingCreators : this.state.BookingCreators.concat(temp)})
      return temp
    }

    render(){
    return(
            <div>
                  <div className = "match card" onClick = {this.OpenBookings.bind(this)}>
                  <div className="rideDesc">
                  <div>
                      <h15>From</h15>
                          <div className = "from"> 
                          <h4>{ this.props.RideDetails.fromCityId  || "FromText"}</h4>
                          <img className="art" src ={art}/> 
                          </div>
                  </div>
                  <div> <h15>To</h15><h4>{this.props.RideDetails.toCityId || "TOtext"}</h4>     </div>
                  <div> <h15>Date</h15><h4>{ this.props.RideDetails.journeyDate ||new Date().toJSON().slice(0,10).replace(/-/g,'/')}</h4> </div>
                  <div> <h15>TIme</h15><h4>{ this.props.RideDetails.journeTime ||"5am - 9pm"}</h4> </div>
                  <div> <h15>Price</h15><h4>Rs.{ this.props.RideDetails.entireJourneyFare || "999"}</h4> </div>
                  <div ><h15>Seat Avilability</h15><h4>{this.props.RideDetails.offeredSeats - this.props.RideDetails.bookedSeats}</h4></div>
                  </div>
                </div> 
                <MyModal show={this.state.isClick} Modaltitle = "Booking Details"  onHide={this.OpenBookings.bind(this)}>{this.state.RenderdBookings}</MyModal>
            </div>
        )
    }

  }
export default withRouter(Offercard)