import React,{ Component } from 'react';
import './StationListBuses.css';
import InfoBus from '../InfoBus/InfoBus'

let infoBuses;

class StationListBuses extends Component{

    render(){
        this.props.open === undefined ? true : infoBuses = this.props.open.map(bus => {
            return(
                <InfoBus bus = {bus}/>
            )
        })
        return(
            <div className = {this.props.open !== undefined ? 'listContainer openContainer' : 'listContainer'}>
                {infoBuses}
            </div>
        )
    }
}

export default StationListBuses;