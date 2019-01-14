import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

const API_KEY = '';

let markers;

export class MapContainer extends Component {

    shouldComponentUpdate(nextProps, nextState){
        if(nextProps.data === this.props.data){
            return false;
        }
        return true;
    }

    onMarkerClick = (props, marker, e) => {
        fetch(`https://api.tfl.gov.uk/line/${props.lineId}/arrivals`)
            .then(response => {
                return response.json();
            })
            .then(data => {  
                for (let i = 0; i < data.length; i++) {
                    if (data[i].stationName === props.stationName) {  
                                            
                        fetch(`https://api.tfl.gov.uk/StopPoint/${data[i].naptanId}/arrivals`)
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                // let options = {
                                //     timeZone: 'Europe/London',
                                //     year: 'numeric', month: 'numeric', day: 'numeric',
                                //     hour: 'numeric', minute: 'numeric', second: 'numeric',
                                // },
                                // formatter = new Intl.DateTimeFormat([], options)
                                //formatter.format(new Date())
                                let date = new Date;
                                let buses = [];
                                data.map(bus => {
                                    let expectedArrival = Date.parse(bus.expectedArrival) - Date.parse(date);
                                    if(expectedArrival > 0){
                                        let k = 0;
                                        for(let i = 0; i < buses.length; i++){
                                            if(buses[i].number === bus.lineId)
                                                k++
                                        }
                                        if(k === 0)
                                            buses.push({number: bus.lineId, expectedArrival: Math.round(expectedArrival/60000)})
                                    }
                                })
                                this.props.openList(buses);
                            })
                            break;
                            }
                }
                })
    }


    render() {
        if(this.props.data !== undefined && this.props.data.httpStatusCode === undefined){
            if(this.props.data.stations !== undefined){
                markers = this.props.data.stations.map(station => {
                    return (
                        <Marker
                            key={station.stationId}
                            onClick={this.onMarkerClick}
                            position={{ lat: station.lat, lng: station.lon }}
                            stationName={station.name}
                            lineId={this.props.data.lineId}
                        />
                    )
                })
            }
            else{
                markers = this.props.data.map(station => {
                    return (
                        <Marker
                            key={station.stationId}
                            onClick={this.onMarkerClick}
                            position={{ lat: station.lat, lng: station.lon }}
                            stationName={station.name}
                            lineId={station.lineId}
                        />
                    )
                });
            }                   
        }
        else
            markers = undefined
        return (
            <Map google={this.props.google}
                style={{ width: '100%', height: '100%', position: 'relative' }}
                className={'map'}
                initialCenter={{
                    lat: 51.53,
                    lng: -0.13
                }}
                onClick = {this.props.exitList}
                zoom={10}>
                {markers}
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: (API_KEY)
})(MapContainer)
