export default class AirplaneSeating {
  constructor(seats, passengers = 0) {
    this.seats = this._createSeats(seats);
    this.passengers = this._validatePassengers(passengers);
    this.remainingPassengers = this.passengers;
    this.assignedSeats = this.seats;
  }

  nextSeatNumber = 1;

  _createSeats(input) {
    if (!this._isValid2dArray(input)) {
      throw new Error('Invalid seat input. Expected 2d array of numbers.');
    }

    const maxColumns = Math.max(...input.map(arr => arr[1]));
    let seats = [];
    for (let colI = 0; colI < maxColumns; colI++) {
      let block = [];

      input.forEach(arr => {
        const row = arr[0];
        let col = arr[1];

        for (let i = 0; i < row; i++) {
          if (col - colI > 0) {
            block.push('seat');
          } else {
            block.push('empty');
          }
        }
        block.push('aisle');
      });
      block = block.slice(0, -1);
      seats.push(block);
    }
    return seats;
  }

  _isValid2dArray(input) {
    if (
      !(
        input.length > 0 &&
        input.constructor == Array &&
        input[0][0] &&
        input[0].constructor == Array
      )
    ) {
      return false;
    }

    return input.every(
      arr => arr.length === 2 && arr.every(number => this._isNonNegativeInteger(number)),
    );
  }

  _isNonNegativeInteger(input) {
    return Number.isInteger(input) && input >= 0;
  }

  _validatePassengers(input) {
    if (!this._isNonNegativeInteger(input)) {
      throw new Error('Invalid passenger input. Must be a non-negative number.');
    }
    return input;
  }

  get autoAssignedSeats() {
    this._assignAllSeats();
    return {
      seats: this.assignedSeats,
      remainingPassengers: this.remainingPassengers,
    };
  }

  _assignAllSeats() {
    this._asignAisleSeats();
    this._assignWindowSeats();
    this._asignMiddleSeats();
  }

  _asignAisleSeats() {
    let seats = [...this.seats];

    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (this.remainingPassengers < 1) {
          return;
        }
        if (seatI > 0 && seatI < row.length) {
          if (seat === 'seat' && (row[seatI - 1] === 'aisle' || row[seatI + 1] === 'aisle')) {
            seats[rowI][seatI] = this.nextSeatNumber;
            this.nextSeatNumber++;
            this.remainingPassengers--;
          }
        }
      });
    });
    this._assignedSeats = seats;
  }

  _assignWindowSeats() {
    let seats = [...this.seats];

    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (this.remainingPassengers < 1) {
          return;
        }
        if (seat === 'seat' && (seatI === 0 || seatI === row.length - 1)) {
          seats[rowI][seatI] = this.nextSeatNumber;
          this.nextSeatNumber++;
          this.remainingPassengers--;
        }
      });
    });
    this._assignedSeats = seats;
  }

  _asignMiddleSeats() {
    let seats = [...this.seats];

    seats.forEach((row, rowI) => {
      row.forEach((seat, seatI) => {
        if (this.remainingPassengers < 1) {
          return;
        }
        if (
          seat === 'seat' &&
          !(
            seatI === 0 ||
            seatI === row.length - 1 ||
            row[seatI - 1] === 'aisle' ||
            row[seatI + 1] === 'aisle'
          )
        ) {
          seats[rowI][seatI] = this.nextSeatNumber;
          this.nextSeatNumber++;
          this.remainingPassengers--;
        }
      });
    });
    this._assignedSeats = seats;
  }
}
