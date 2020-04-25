import React, { Component } from 'react';
import  { Button} from 'react-bootstrap'


class BookingEntries  extends Component {
    constructor(props){
    super(props)
    }
    handleClick(event){
        event.preventDefault();
        if(event.target.value == 'accept'){
            this.props.AcceptBooking(this.props.booking)
        }
        if(event.target.value == 'reject'){
            this.props.RejectBooking(this.props.booking)
        }
    }
    RenderAction(){

        if(this.props.booking.status == 0){
            return(
                <span>
                <div> <h15> </h15><Button value ="accept" onClick = {this.handleClick.bind(this)} className ="grow" >Accept</Button> </div>
                <div> <h15> </h15><Button value ="reject" onClick = {this.handleClick.bind(this)} className ="grow">Reject</Button> </div>
                </span>
            )
        }

        if(this.props.booking.status == 1){
            return(
                <span> Booked ✔️ </span>
            )
        }

        if(this.props.booking.status == 2){
            return(
                <span> Rejected 🔴 </span>
            )
        }
    }

    render() { 
        return (  
        <div>
            <div className = "br3 ba b--light-gray mv3 pv2  .shadow-5 BookingDesc">
              <div> <h15>Name</h15><h6>{this.props.BookingCreator.firstname}</h6>  </div>
                <div> <h15>PhoneNumber</h15><h6>{this.props.BookingCreator.phonenumber}</h6> </div>
                <div> <h15>From</h15><h6>{this.props.booking.fromCityId }</h6> </div>
                <div> <h15>To</h15><h6>{ this.props.booking.toCityId}</h6> </div>
                <div> <h15>Date</h15><h6>{this.props.booking.journeyDate}</h6> </div>
                <div> <h15>Seats</h15><h6>{ this.props.booking.seatsBooked}</h6> </div>
                <div> <h15>Price</h15><h6>Rs.{ this.props.booking.bookingFare}</h6> </div>
                {this.RenderAction()}
            </div>
        </div> );
    }
}
 
export default BookingEntries;