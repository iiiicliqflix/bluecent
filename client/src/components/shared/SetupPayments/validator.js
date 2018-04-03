export const validate = props => {
  const errors = {};

  if (!props.cardholder) {
    errors.cardholder = "Cardholder's name is required.";
  }

  if (!props.zipcode) {
    errors.zipcode = "Required.";
  }

  if (props.zipcode && !/(^\d{5}$)|(^\d{5}-\d{4}$)/.test(props.zipcode)) {
    errors.zipcode = "Invalid.";
  }

  return errors;
};
