import React, { Component } from 'react';
import './OfferARide.css';
import Logo from '../../Components/Logo/logo'
import RideDetails from '../../Components/RideDeatils/RideDetails'
import StopDetails from '../../Components/StopsDetails/StopsDetails'
import Topbar from '../../Components/TopBar/topbar'
import axios from 'axios'


class OfferARide extends Component {

    constructor(props){
        super();
            this.state = {
                pcities : [],
                formdata :  null,
                stops :null,
                seats:'', 
                cities : [],
                initialCost : null
            }
            this.getStopsAndSeatsData = this.getStopsAndSeatsData.bind(this);
            this.getformData = this.getformData.bind(this);
    } 


     async getformData(formdata){
         await this.GetCost(formdata.fromCityId,formdata.toCityId)
         this.setState({formdata : formdata})
    }

    async GetCost(FromCity, Tocity){
      var self = this
       axios.get('https://localhost:44374/cities/GetFare/'+ String(FromCity) +'/'+ String(Tocity))
       .then(function (response) {
                    console.log("from Api :" + response.data)
                    self.setState({ initialCost :  response.data})
                 })
           .catch(function (error) {
               console.log(error);
           })
    }

  async getStopsAndSeatsData(stops,seats, price){
      await  this.setState({stops : stops})
      await  this.setState({seats : seats})
      await  this.setState({initialCost : price})
       this.createoffer();
    }

     createoffer(){
        var self = this
        axios(
            {
            method: 'post',
            url: 'https://localhost:44374/api/Rides/CreateRide',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                "Acces-Control-Allow-Origin": "*"
              },
            data: {
                    "offerCreatorId":  this.state.formdata.offerCreatorId,
                    "fromCityId": self.state.formdata.fromCityId,
                    "toCityId": self.state.formdata.toCityId,
                    "countryCode": "IND",
                    "journeyDate": self.state.formdata.journeyDate,
                    "journeTime": self.state.formdata.journeTime,
                    "entireJourneyFare": this.state.initialCost,
                    "cityIdsOfStops": this.state.stops,
                    "OfferedSeats" : parseInt(self.state.seats)
              }
          }).then(function () {
            self.props.history.push('/MyRides')
          }).catch( function(error){
            console.log(error)
          })
        ;
     }

     componentDidMount(){
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

  render(){

      const stopsRender = () =>{

                if(this.state.formdata != null)
                {
                    return  <StopDetails cities = {this.state.cities} 
                                          price = {this.state.initialCost} 
                                          passdata = {this.getStopsAndSeatsData}
                                          origin = {this.state.formdata.fromCityId}
                                          destination = {this.state.formdata.toCityId}
                                          /> 
                }
        }

    return(
        <div>
            <Topbar/>
            <div className="details"> 
                <RideDetails cities = {this.state.cities}  getformData = {this.getformData}> Offer A Ride </RideDetails>
                { stopsRender() }
            </div>
        </div>
    );
  }

} 
export default OfferARide;