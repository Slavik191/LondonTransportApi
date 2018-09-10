import React, { Component } from 'react';
import GoogleApiWrapper from '../GoogleApiWrapper/GoogleApiWrapper';
import NumberBus from '../NumberBus/NumberBus';
import StationListBuses from '../StationListBuses/StationListBuses';
import AllStations from '../AllStations/AllStations';

let lines = [];
let stations = [];
let prevQuantityStations = 0;

class LondonTransportApi extends Component {
    state = {
        infoAboutSelectedStation: undefined,
        open: undefined,
        allStationsLoaded: false
    }

    componentWillMount() {
        this.receivingAllStations('1');
        let loanding = setInterval(() => {
            if (prevQuantityStations === stations.length && prevQuantityStations !== 0) {
                clearInterval(loanding);
                this.setState({
                    allStationsLoaded: true
                });
            }
            else
                prevQuantityStations = stations.length
        }, 2000)
    }

    allStations = (bool) => {
        this.setState({
            infoAboutSelectedStation: bool ? undefined : stations
        });
    }

    receivingAllStations = line => {
        lines.push(line);
        fetch(`https://api.tfl.gov.uk/line/${line}/route/sequence/outbound`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                data.stations === undefined ? false : data.stations.map(station => {
                    // if (stations.indexOf({stationId: station.stationId, lat: station.lat, lon: station.lon }) === -1) {
                    //     stations.push({stationId: station.stationId, lat: station.lat, lon: station.lon })
                    // }
                    let k = 0;
                    stations.map(st => {
                        if (st.stationId === station.stationId)
                            k++
                    })
                    if (k === 0)
                        stations.push({ stationId: station.stationId, lineId: data.lineId, name: station.name, lat: station.lat, lon: station.lon })

                    station.lines.map(line => {
                        if (lines.indexOf(line.id) === -1) {
                            this.receivingAllStations(line.id)
                        }
                    })
                });
            })
    }

    stopSelectedLine = numberBus => {
        fetch(`https://api.tfl.gov.uk/line/${numberBus}/route/sequence/outbound`)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState({
                    infoAboutSelectedStation: data
                });
            });
    }

    openList = (listBuses) => {
        this.setState({
            open: listBuses
        })
    }

    exitList = () => {
        this.setState({
            open: undefined
        })
    }

    render() {
        return (
            <div>
                <AllStations allStationsLoaded = {this.state.allStationsLoaded} allStations = {this.allStations} />
                <StationListBuses open = {this.state.open}/>
                <NumberBus stopSelectedLine={this.stopSelectedLine} lines = {lines}/>
                <GoogleApiWrapper openList = {this.openList} exitList = {this.exitList} data={this.state.infoAboutSelectedStation} />
            </div >
        )
    }
}

export default LondonTransportApi;