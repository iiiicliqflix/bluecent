export const validate = props => {
  const errors = {};
  const fields = [
    {
      name: "first",
      title: "First name"
    },
    {
      name: "last",
      title: "Last name"
    },
    {
      name: "email",
      title: "Email"
    },
    {
      name: "password",
      title: "Password"
    },
    {
      name: "confirmpassword",
      title: "Confirm password"
    }
  ];

  fields.forEach(f => {
    if (!(f.name in props)) {
      errors[f.name] = `${f.title} is required.`;
    }
  });

  if (props.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(props.email)) {
    errors.email = "Please provide a valid email.";
  }

  if (props.password && props.password.length < 6) {
    errors.password = "Minimum 6 characters.";
  }

  if (props.password !== props.confirmpassword) {
    errors.confirmpassword = "Passwords don't match.";
  }

  return errors;
};
