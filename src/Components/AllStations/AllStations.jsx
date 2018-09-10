import React, {Component} from 'react';
import './AllStations.css';

class AllStations extends Component{
    state = {
        click: false
    } 

    allStations = () => {
        this.setState({
            click: !this.state.click
        })
        this.props.allStations(this.state.click)
    }

    render(){
        return(
            <div className = 'allStationsButton' onClick = {this.props.allStationsLoaded ? this.allStations : undefined}>{this.props.allStationsLoaded ? this.state.click ? 'Убрать метки' :'Все остановки' : 'Идёт загрузка'}</div>
        )
    }
}

export default AllStations;