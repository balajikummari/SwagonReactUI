import React from 'react';
import './BookingForm.css';
import art0 from './artifact0.png'
import art1 from './atifact1.png'




const BookingForrm = (props) => {
    return(
   
         <div className="card BookingContainer">

            <div className="BookingHead">

            <div className="Headtest">
            <h3>Book A Ride</h3>
            <h10>We get your matches asap!</h10>
            </div>
            <div className="art0Div"><img className = "art0" src = {art0}/></div>
            </div>


            <form  class="form">
            <div className="art1Main"> 
                <div className="form-group  field  fromLoc">
                    <input className="form-control" id="FromLocation" placeholder="Delhi" className="FromLocation"></input>
                    <label htmlFor="FromLocation">FromLocation</label>
                </div>
                <div className="art1Div"><img className = "art1" src = {art1}/></div>
                <div className="form-group field toLoc">
                    <input  className="form-control" id="ToLocation" placeholder="Hyderabad" className="ToLocation"></input>
                    <label htmlFor="ToLocation">ToLocation</label>
                </div>
                <div className="form-group  field">
                <input type="date" className="date form-control" id="dateId" placeholder="when is it..." className="date"></input>
                <label htmlFor="date">Date</label>
            </div>
            </div>
            
            <label  className="time">Time</label>
            <div class="radio-toolbar">
              
                <input type="radio" id="i1" name="radioTime" value="5am-9am" />
                <label for="i1">5am - 9am</label>

                <input type="radio" id="i2" name="radioTime" value="9am-12pm"/>
                <label for="i2">9am - 12pm</label>

                <input type="radio" id="i3" name="radioTime" value="12pm-3pm"/>
                <label for="i3">12pm - 3pm</label> 
                
                <input type="radio" id="i4" name="radioTime" value="3pm-6pm"/>
                <label for="i4">3pm - 6pm</label>
                
                <input type="radio" id="i5" name="radioTime" value="6pm-9pm"/>
                <label for="i5">6pm - 9pm</label>
            </div>

            <div className="sbutton">
                <button type="submit" className="btn btn-primary">Submit</button>
            </div>
        </form>

        </div>
    );
} 
export default BookingForrm;