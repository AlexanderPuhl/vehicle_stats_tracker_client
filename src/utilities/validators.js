const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export const required = (value) => (value ? undefined : 'Required');

export const nonEmpty = (value) =>
  value.trim() !== '' ? undefined : 'Cannot be empty';

export const isTrimmed = (value) =>
  value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const length = (length) => (value) => {
  if (length.min && value.length < length.min) {
    return `Must be at least ${length.min} characters long`;
  }
  if (length.max && value.length > length.max) {
    return `Must be ast most ${length.max} characters long`;
  }
};

export const matches = (field) => (value, allValues) =>
  field in allValues && value.trim() === allValues[field].trim()
    ? undefined
    : 'Does not match';

export const isPositive = (value) =>
  value > 0 ? undefined : 'Number must be above 0';
