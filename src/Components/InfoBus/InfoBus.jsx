import React,{ Component } from 'react';
import './InfoBus.css';

class InfoBus extends Component{
    render(){
        return(
            <div className = 'infoBusContainer'>
                <div className = 'infoBusNumber'>{this.props.bus.number}</div>
                <div className = 'infoBusExpectedArrival'>{this.props.bus.expectedArrival === 0 ? 'сейчас' : `${this.props.bus.expectedArrival} мин`} </div>
            </div>
        )
    }
}

export default InfoBus;