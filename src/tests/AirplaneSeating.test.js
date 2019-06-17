import AirplaneSeating from "./../AirplaneSeating";

describe("Validate Input for seats", () => {
  it("should throw if input is empty array", () => {
    expect(() => {
      new AirplaneSeating([]);
    }).toThrow();
  });

  it("should throw if input is not a 2d array", () => {
    expect(() => {
      new AirplaneSeating([1, 2]);
    }).toThrow();
  });

  it("should not throw if input is a 2d array with numbers", () => {
    expect(() => {
      new AirplaneSeating([1, 2], [3, 4]);
    }).toBeTruthy();
  });

  it("should throw if input is a 2d array with non-numbers", () => {
    expect(() => {
      new AirplaneSeating([1, 2], ["2", 3]);
    }).toThrow();
  });
});
