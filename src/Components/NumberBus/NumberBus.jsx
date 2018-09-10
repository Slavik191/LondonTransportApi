import React, { Component } from 'react';
import './NumberBus.css';

class NumberBus extends Component {
    state = {
        numberBus: '',
        openForm: false
    }

    changeNumberBus = (event) => {
        this.setState({
            numberBus: event.target.value
        })
    }

    submitNunberBus = () => {
        if(this.props.lines.indexOf(this.state.numberBus) !== -1){
            this.props.stopSelectedLine(this.state.numberBus);
            this.setState({
                openForm: false
            })
        }
        else
            alert('Такой линии нет')
    }

    openForm = () => {
        this.setState({
            numberBus: '',
            openForm: true
        })
    }

    render() {
        return (
            <form className={this.state.openForm ? 'openForm' : undefined}>
                <input type='text' value={this.state.numberBus} onChange={this.changeNumberBus} placeholder='Введите номер линии' />
                <div className={this.state.openForm ? 'button ok' : 'button arrow'} onClick={this.state.openForm ? this.submitNunberBus : this.openForm}></div>
            </form>
        )
    }
}

export default NumberBus;