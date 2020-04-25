import React, { Component,useState } from 'react';
import './Matchcard.css';
import art from './art1.png'
import avtar from './avtar.png'
import axios from 'axios'
import ReactDOM from 'react-dom';
import MyModal from '../ConformationPopup/modal'
import  { Button} from 'react-bootstrap'


class Matchcard extends Component{ 
 
  constructor(props){
    
    super(props);
    this.state = {
      name: '',
      isClick : false,
      modalShow :false,
      selectedOrigin: null,
      selectedDestination:null,
      selectedSeats:null,
      BookingPrice : null,
      offererDetails:{
        "username": null,
        "password": null,
        "firstname": null,
        "lastname": null,
        "phonenumber": null,
        "cityofliving": null,
        "secretInfo": null,
        "id": null
      },
      BookingTOCreate : {
          "bookingCreatorId": null,
          "rideOfferId": null,
          "fromCityId": null,
          "toCityId": null,
          "bookingFare": null,
          "status": null,
          "seatsBooked": null,
          "countryCode":null,
          "journeyDate": null,
          "journeTime": null
      }
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.loadOffererDetails()
  }

  
  async  GetCost(FromCity, Tocity){
    var self = this
    var cost ;
    await  axios.get('https://localhost:44374/cities/GetFare/'+ String(FromCity) +'/'+ String(Tocity))
     .then(function (response) {
                  console.log(response.data)
                  cost =  response.data
               })
         .catch(function (error) {

             console.log(error);
         })
         return cost
}

  async handleClick(){
    console.log("clicked")
    if(this.state.isClick == true){
      this.setState({isClick : false})
    }
    else{
      this.setState({isClick : true})
  }
  }

 async loadOffererDetails(){
    var self = this
    await axios.get('https://localhost:44374/api/User/'+String(this.props.OfferCreatorId))
    .then(function(resonse){
        self.setState( {offererDetails : resonse.data} )
    }).catch(function(error){
        console.error(error);
    })
}

renderAvailability(){
  var l =[]; 
  for(var i = 1; i <= this.props.OfferedSeats - this.props.BookedSeats ; i ++){
    
    l = l.concat(
      <span>
      <input type="radio" id={'s'+i} name="selectedSeats"  value={i} onChange = {this.handleChange} required />
      <label className="grow" htmlFor={'s'+i} >{i}</label>
      </span>
    )
  }
  return l
}

async handleChange (event){
  const {value, name } = event.target
  await this.setState({[name] : value})
  if(this.state.selectedOrigin != null && this.state.selectedDestination != null && this.state.selectedSeats != null){
    var cost  = await this.GetCost(this.state.selectedOrigin, this.state.selectedDestination) * this.state.selectedSeats
    this.setState({BookingPrice : cost})
  }
}

RenderBookingConformation(){
        var stops = this.props.cityIdsOfStops.slice()
        stops.unshift(this.props.FromCity)
        stops.push(this.props.ToCity)
        console.log(stops);
        if(this.state.isClick) {
                          return (
                          <div>
                                <MyModal show={this.state.isClick} Modaltitle = "Booking Details"  onHide={this.handleClick}>
                                <div id="sky">
                                    <div id="aeroplane">
                                       </div>
                                    <div className = "places" >
                                    {
                                      stops.map((city) =>  <div className="place grow">📍{city}</div> )
                                    }
                                    </div>
                                </div>
                                <div className = "flex pv2 justify-around f4" >
                                  <div >OfferCreator : {this.state.offererDetails.firstname}</div>
                                  <div>PhoneNumber : {this.state.offererDetails.phonenumber}</div>
                                </div>
                                <form >
                                        <div className="form-group  field">
                                              <select name = 'selectedOrigin' className="form-control "  className="selectedOrigin" onClick={this.handleChange}  required >
                                                  {stops.slice(0,-1).map((city) => <option  key={city} value={city}>{city}</option>)}
                                              </select>
                                              <label htmlFor='selectedOrigin'>Select Origin</label>
                                        </div>
                                        <div className="form-group field">
                                              <select name = 'selectedDestination' className="form-control "  className="selectedDestination" onClick={this.handleChange}  required >
                                                  {stops.slice(stops.indexOf(this.state.selectedOrigin)+1 || 1).map((city) => <option key={city} value={city}>{city}</option>)}
                                              </select>
                                              <label htmlFor='selectedDestination'>Select Destination</label>
                                        </div>
                                        <label >No of Seats to book</label>
                                        <div className="radio-toolbar" >
                                          { this.renderAvailability() }
                                        </div>
                                        <div>Price : {this.state.BookingPrice}</div>
                                        <button onClick = {this.onsubmit}>Conform Booking</button>
                                 </form>

                                </MyModal>
                          </div>)
         }

}

  onsubmit = event =>{
        event.preventDefault()
        var BookingTOCreate = this.state.BookingTOCreate
        BookingTOCreate.bookingCreatorId = window.localStorage.getItem('id')
        BookingTOCreate.rideOfferId =  this.props.rideOfferId
        BookingTOCreate.fromCityId = this.state.selectedOrigin
        BookingTOCreate.toCityId = this.state.selectedDestination
        BookingTOCreate.seatsBooked = parseInt(this.state.selectedSeats)  
        BookingTOCreate.bookingFare =  this.state.BookingPrice
        BookingTOCreate.status = 0
        BookingTOCreate.journeTime =  this.props.timeOfDeparture
        BookingTOCreate.journeyDate =  this.props.DateofJourney
        BookingTOCreate.countryCode = 'IND'
        this.props.getSelectedCardDetails(BookingTOCreate)
  }
 
    render(){

    return(
            <div  >
                  <div className = "match card" onClick={ this.handleClick } >
                  <div className="from"> <h3>{ this.state.offererDetails.firstname || "dummy"}</h3> <img className="avtar" src ={ this.props.avtar || avtar}/> </div> 
                  <div className="rideDesc">
                  <div>
                      <h15>From</h15>
                          <div className = "from"> 
                          <h4>{ this.props.FromCity  || "FromText"}</h4>
                          <img className="art" src ={art}/> 
                          </div>
                  </div>
                  <div> <h15>To</h15><h4>{this.props.ToCity || "TOtext"}</h4>     </div>
                  <div> <h15>Date</h15><h4>{ this.props.DateofJourney ||new Date().toJSON().slice(0,10).replace(/-/g,'/')}</h4> </div>
                  <div> <h15>TIme</h15><h4>{ this.props.timeOfDeparture ||"5am - 9pm"}</h4> </div>
                  <div> <h15>Price</h15><h4>Rs.{ this.props.price || "999"}</h4> </div>
                  <div ><h15>Seat Avilability</h15><h4>{this.props.OfferedSeats - this.props.BookedSeats}</h4></div>
                  </div>
                </div> 
                {this.RenderBookingConformation()}
            </div>
        )
    }

  }
export default Matchcard