import React, { Component } from 'react';
import AirplaneSeating from './logic/AirplaneSeating';
import Seats from './components/Seats';

import { inputSeats, inputPassengers } from './helper/Input';

import './App.scss';

class App extends Component {
  state = {
    seatingData: null,
  };

  componentDidMount = () => {
    this.createNewPlane(inputSeats, inputPassengers);
  };

  createNewPlane = (inputSeats, inputPassengers) => {
    const airplane = new AirplaneSeating(inputSeats, inputPassengers);
    const seatingData = airplane.autoAssignedSeats;
    this.setState({ seatingData });
  };

  render() {
    return (
      <div>
        <h1>Airplane Seating Algorithm</h1>
        <Seats seatingData={this.state.seatingData} />
      </div>
    );
  }
}

export default App;
