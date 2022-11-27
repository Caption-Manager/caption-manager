export function pipe<ValueType>(
  ...functions: Array<(argument: ValueType) => ValueType>
) {
  return function(value: ValueType) {
    return functions.reduce((accumulator, fn) => fn(accumulator), value);
  };
}
