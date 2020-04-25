import React, { Component } from 'react';
import './StopsDetails.css';
import art0 from './artifact0.png'
import art1 from './atifact1.png'
import axios from 'axios'
import { string } from 'postcss-selector-parser';


class StopsDetails  extends Component {
    
    constructor(props){
        super();
        this.state = {
            NoofStops : 0,
            stopsToRender : [ ], 
            stopsData:[],
            seat : null,
            price :null
        }
       
    }

    componentDidMount(){
        this.setState({price : this.props.price})
    }

     handleSeatChange = event =>{
        const {value} = event.target
        console.log(value)
        this.setState({seat : value})
    }

     async handleChange(event){
        event.preventDefault();
        var self = this
        var isOld = false;
        const {id, value } = event.target

        this.state.stopsData.forEach(stop => {
            if( stop.stopNo == id)
                { console.log( stop.stopNo +"is equal " + id);  isOld = true}
        });
        if(isOld == true){
            await this.state.stopsData.forEach(stop => {
                if( stop.stopNo == id){
                    var temp = this.state.stopsData
                    temp[temp.indexOf(stop)] = {stopNo : id, stopName : value}
                     this.setState({  stopsData : temp })
                }
            })
        }
        else{
             await this.setState({  stopsData : this.state.stopsData.concat( {stopNo : id, stopName : value} ) } )
        }

        var adjustedCost = 0;
        var stops = null
        stops = self.state.stopsData.slice()
        stops.unshift({stopNo : 0,stopName: this.props.origin})
        stops.push({stopNo : stops.length + 1, stopName : this.props.destination})
        for await (const stop of stops){
            if( stops.indexOf(stop) < stops.length-1 ){
                adjustedCost = await this.GetCost(stop.stopName, stops[stops.indexOf(stop) +1].stopName) + adjustedCost
            }
        }
        await this.setState({  price : adjustedCost } )
    }

    addStop = event =>
    {
        event.preventDefault();
        this.setState({  
                NoofStops : this.state.NoofStops + 1,
                stopsToRender     : this.state.stopsToRender.concat(this.RenderStopSelector())
            } 
        )
    }
    
    RenderStopSelector = () =>{
        return(
        <div className="form-group  field  fromLoc">
            <select name = 'stop' onChange={this.handleChange.bind(this)} className="form-control" id= {this.state.NoofStops + 1} className="FromLocation" required >
                {this.props.cities.map((city) => <option key={city.value} value={city.value}>{city.value},{city.state}</option>)}
           </select>
            <label htmlFor='stop'>stop {this.state.NoofStops + 1}</label>
        </div>
        )
    }
    handleSubmit = event =>{
        event.preventDefault()
        var stops = this.state.stopsData.map( stop => { return String(stop.stopName)})
        this.props.passdata(stops,this.state.seat,this.state.price)
    }

    async  GetCost(FromCity, Tocity){
        var self = this
        var cost ;
        await  axios.get('https://localhost:44374/cities/GetFare/'+ String(FromCity) +'/'+ String(Tocity))
         .then(function (response) {
                      cost =  response.data
                   })
             .catch(function (error) {

                 console.log(error);
             })
             return cost
    }

    render(){
        return(
            <div>
                <div className="card BookingContainer">
                        <div className="BookingHead">
        
                            <div className="Headtest">
                                    <h3>Offer a Ride</h3>
                                    <h10>We get your matches asap!</h10>
                            </div>
                                <div className="art0Div"><img className = "art0" src = {art0}/></div>
                        </div>
                       <form onSubmit = {this.handleSubmit} class="form">
                            <div className="art1Main"> 
                                {this.state.stopsToRender}
                                <button onClick = {this.addStop} >+</button>
                            </div>
                            <div className="subss">
                                <div>
                                <label  className="Seats">Available Seats</label>
                                    <div class="radio-toolbar2" required>
                                        <input type="radio" id="s1" name="RadioSeat" value="1" onChange = {this.handleSeatChange} required />
                                        <label for="s1">1</label>
            
                                        <input type="radio" id="s2" name="RadioSeat" value="2" onChange = {this.handleSeatChange} />
                                        <label for="s2">2</label>
            
                                        <input type="radio" id="s3" name="RadioSeat" value="3" onChange = {this.handleSeatChange} />
                                        <label for="s3">3</label>
                                        <input type="radio" id="s4" name="RadioSeat" value="4" onChange = {this.handleSeatChange} />
                                        <label for="s4">4</label>
                                    </div>
                                    </div>
                                    <div>
                                    <label  className="Price">Price</label>
                                    <h5>Rs. {this.state.price ||this.props.price|| "1800"}</h5>
                                    </div>
                            </div>
                            <div className="sbutton">
                                <button  type="submit" className="btn btn-primary">Create Offer</button>
                            </div>
                       </form>
       
                       </div>
       
                           </div>
          );

    }
} 
export default StopsDetails;