import React, { Component,useState } from 'react';
import './Matchcard.css';
import art from './art1.png'
import avtar from './avtar.png'
import axios from 'axios'
import ReactDOM from 'react-dom';
import MyModal from '../ConformationPopup/modal'
import  { Button} from 'react-bootstrap'


class Bookingcard extends Component{ 
  constructor(props){
    super(props);
    this.state = {
      OfferDetails : {},
      OfferCreatorDetails : {}
    }
  }

  async componentDidMount(){
    await this.LoadRespectiveOffer()
    this.LoadRespectiveOfferCreator()
    
  }
 async LoadRespectiveOffer(){
    var self = this
  await  axios.get('https://localhost:44374/api/Rides/'+String(this.props.RideDetails.rideOfferId))
    .then(async function(resonse){
      await self.setState( {OfferDetails : resonse.data} )
    })
    .catch(function(error){
        console.error(error);
    })
  }

  LoadRespectiveOfferCreator(){
    var self = this
    axios.get('https://localhost:44374/api/User/'+String(this.state.OfferDetails.offerCreatorId))
    .then(function(resonse){
        self.setState( {OfferCreatorDetails : resonse.data} )
    }).catch(function(error){
        console.error(error);
    })
  }

  displayStatus(){
    if(this.props.RideDetails.status == 0){
      return <span> Waiting for Approval 🔵</span>
    }
    if(this.props.RideDetails.status == 1){
      return <span> Booked ✔️</span>
    }
    if(this.props.RideDetails.status == 2){
      return <span> Rejected 🔴</span>
    }
  }

    render(){

    return(
            <div>
                  <div className = "match card" >
                  <div className="rideDesc">
                  <div>
                      <h15>From</h15>
                          <div className = "from"> 
                          <h4>{ this.props.RideDetails.fromCityId}</h4>
                          <img className="art" src ={art}/> 
                          </div>
                  </div>
                  <div> <h15>To</h15><h4>{this.props.RideDetails.toCityId }</h4>     </div>
                  <div> <h15>Date</h15><h4>{ this.props.RideDetails.journeyDate }</h4> </div>
                  <div> <h15>TIme</h15><h4>{ this.props.RideDetails.journeTime }</h4> </div>
                  <div> <h15>Price</h15><h4>Rs.{ this.props.RideDetails.bookingFare }</h4> </div>
                  <div><h15>Seats Booked</h15><h4>{this.props.RideDetails.seatsBooked  }</h4></div>
                  <div><h15>Offerer Name</h15><h4>{this.state.OfferCreatorDetails.firstname }</h4></div>
                  <div><h15>Phone Number</h15><h4>{this.state.OfferCreatorDetails.phonenumber  }</h4></div>
                  <div><h15>Status : </h15><h4>{this.displayStatus()}</h4></div>
                  </div>
                </div> 
            </div>
        )
    }

  }
export default Bookingcard
