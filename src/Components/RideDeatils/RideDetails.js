import React, { Component } from 'react';
import './RideDetails.css';
import art0 from './artifact0.png'
import art1 from './atifact1.png'
import axios from 'axios';
import { withRouter } from 'react-router-dom' 


    class RideDetails extends Component {
        constructor(props){
            super();
            this.state = {
                id :  window.localStorage.getItem('id'),
               
                from :'',
                radioTime :'',
                date:null,
                to:'',
            }
        }

        handleChange = event =>{
            const {value, name } = event.target
            this.setState({[name] : value})
        }

        handleSubmit = event =>{
            event.preventDefault(); 
            var self = this;
            var data = {
                "offerCreatorId":  this.state.id,
                "fromCityId": self.state.from,
                "toCityId": self.state.to,
                "countryCode": "IND",
                "journeyDate": self.state.date,
                "journeTime": self.state.radioTime,
                "entireJourneyFare": 100,
                 }
                 this.props.getformData(data)
        }

        componentDidMount()
        {
            
        }
        render()
        {
            return(
            <div>
            <div className="card BookingContainer">
                <div className="BookingHead">
                    <div className="Headtest">
                        <h3>{this.props.children}</h3>
                        <span className="h10">We get your matches asap!</span>
                    </div>
                    <div className="art0Div"><img className = "art0" src = {art0}/></div>
                </div>

                <form  className="form" onSubmit = {this.handleSubmit}>

                    <div className="art1Main">  

                            <div className="form-group  field  fromLoc">
                                <select name = 'from' onChange={this.handleChange} className="form-control" id="FromLocation" placeholder="Delhi" className="FromLocation" required >
                                     {this.props.cities.map((city) => <option key={city.value + city.state}  value={city.value}>{city.value},{city.state}</option>)}
                                </select>
                                <label htmlFor="FromLocation">FromLocation</label>
                            </div>

                            <div className="art1Div"><img className = "art1" src = {art1}/></div>
                            
                            <div className="form-group field toLoc">
                            <select name = "to" className="form-control" id="ToLocation" placeholder="Delhi" className="ToLocation" 
                             onChange={this.handleChange} required >
                                     {this.props.cities.map((city) => <option key={city.value + city.state} value={city.value}>{city.value},{city.state}</option>)}
                                </select>
                                <label htmlFor="ToLocation">ToLocation</label>
                            </div>

                        <div className="form-group  field">
                            <input type="date" className="date form-control" id="dateId" placeholder="when is it..." className="date" name="date" onChange={this.handleChange} required ></input>
                            <label htmlFor="date">Date</label>
                        </div>
                    </div>
            
                    <label  className="time">Time</label>
                        <div className="radio-toolbar" >
            
                            <input type="radio" id="i1" name="radioTime" value="5am-9am" onChange = {this.handleChange} required />
                            <label htmlFor="i1"  name="radioTime" value="5am-9am">5am - 9am</label>
                        
                            <input type="radio" id="i2" name="radioTime" value="9am-12pm" onChange = {this.handleChange}  />
                            <label htmlFor="i2">9am - 12pm</label>
                        
                            <input type="radio" id="i3" name="radioTime" value="12pm-3pm" onChange = {this.handleChange}/>
                            <label htmlFor="i3">12pm - 3pm</label> 
                            
                            <input type="radio" id="i4" name="radioTime" value="3pm-6pm" onChange = {this.handleChange}/>
                            <label htmlFor="i4">3pm - 6pm</label>
                            
                            <input type="radio" id="i5" name="radioTime" value="6pm-9pm" onChange = {this.handleChange}/>
                            <label htmlFor="i5">6pm - 9pm</label>
                        </div>
  
                    <div className="sbutton">
                        <button type="submit" className="btn btn-primary">Next >>></button>
                    </div>
                </form>
            
                </div>
            
            </div>
        );
        }
    } 
export default withRouter(RideDetails);