import { ISignUpFormState } from "~/pages/signup/types";

export const validate = (values: ISignUpFormState): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!values.name) {
    errors.name = "Name is required";
  } else if (!(values.name.length <= 15)) {
    errors.name = "Name must be less or equal 15 symbols"
  }
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  if (!values.confirmPassword) {
    errors.confirmPassword = "Confirming password is required";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
};
