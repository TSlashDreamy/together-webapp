import { ILoginFormState } from "~/pages/login/types";

export const validate = (values: ILoginFormState): { [key: string]: string } => {
  const errors: { [key: string]: string } = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email address is invalid";
  }
  if (!values.password) {
    errors.password = "Password is required";
  }
  return errors;
};
