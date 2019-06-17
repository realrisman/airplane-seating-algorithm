import AirplaneSeating from './../AirplaneSeating';

describe('Validate Input for seats', () => {
  it('should throw if input is empty array', () => {
    expect(() => {
      new AirplaneSeating([]);
    }).toThrow();
  });

  it('should throw if input is not a 2d array', () => {
    expect(() => {
      new AirplaneSeating([1, 2]);
    }).toThrow();
  });

  it('should not throw if input is a 2d array with numbers', () => {
    expect(() => {
      new AirplaneSeating([1, 2], [3, 4]);
    }).toBeTruthy();
  });

  it('should throw if input is a 2d array with non-numbers', () => {
    expect(() => {
      new AirplaneSeating([1, 2], ['2', 3]);
    }).toThrow();
  });
});

describe('Validate input for passengers', () => {
  it('should throw if passengers is negative number', () => {
    expect(() => {
      new AirplaneSeating([[1, 2], [2, 3], -1]);
    }).toThrow();
  });

  it('should return number of passengers via method on valid input', () => {
    const myAirplane = new AirplaneSeating([[1, 2], [3, 4]], 5);
    expect(myAirplane.passengers).toBe(5);
  });
});

describe('Create seats', () => {
  it('should return an array of seats', () => {
    const airplane = new AirplaneSeating([[3, 1], [2, 2], [2, 1]]);
    expect(airplane.seats).toEqual([
      ['seat', 'seat', 'seat', 'aisle', 'seat', 'seat', 'aisle', 'seat', 'seat'],
      ['empty', 'empty', 'empty', 'aisle', 'seat', 'seat', 'aisle', 'empty', 'empty'],
    ]);
  });
});

describe('Assign aisle seats', () => {
  it('should return assigned aisle seats', () => {
    const airplane = new AirplaneSeating([[3, 1], [2, 2]], 5);
    airplane._asignAisleSeats();
    expect(airplane.assignedSeats).toEqual([
      ['seat', 'seat', 1, 'aisle', 2, 'seat'],
      ['empty', 'empty', 'empty', 'aisle', 3, 'seat'],
    ]);
  });

  it('should return assigned aisle seats only for the number of passengers', () => {
    const airplane = new AirplaneSeating([[2, 1], [2, 1], [2, 1]], 2);
    airplane._asignAisleSeats();
    expect(airplane.assignedSeats).toEqual([
      ['seat', 1, 'aisle', 2, 'seat', 'aisle', 'seat', 'seat'],
    ]);
  });
});
