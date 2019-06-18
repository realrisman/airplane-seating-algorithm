import React, { Component } from 'react';
import AirplaneSeating from './AirplaneSeating';
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
      <div className="plane">
        <div className="cockpit">
          <h1>Front of Plane</h1>
        </div>
        <div className="exit exit--front fuselage"></div>
        <Seats seatingData={this.state.seatingData} />
        <div className="exit exit--back fuselage"></div>
      </div>
    );
  }
}

export default App;
