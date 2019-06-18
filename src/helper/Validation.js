export function isValid2dArray(input) {
  if (
    !(
      input.length > 0 &&
      input.constructor === Array &&
      input[0][0] &&
      input[0].constructor === Array
    )
  ) {
    return false;
  }

  return input.every(arr => arr.length === 2 && arr.every(number => isNonNegativeInteger(number)));
}

export function isNonNegativeInteger(input) {
  return Number.isInteger(input) && input >= 0;
}

export function validatePassengers(input) {
  if (!isNonNegativeInteger(input)) {
    throw new Error('Invalid passenger input. Must be a non-negative number.');
  }
  return input;
}
