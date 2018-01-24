export const validate = props => {
  const errors = {};

  if (!props.email) {
    errors.email = "Email is required.";
  }

  if (!props.password) {
    errors.password = "Password is required.";
  }

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = "Please provide a valid email.";
  }

  return errors;
};
