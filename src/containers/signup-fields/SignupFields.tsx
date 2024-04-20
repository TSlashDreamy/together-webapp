import { ChangeEvent, FC, Fragment } from "react";
import { MdOutlineKeyboardArrowRight as ArrowIcon } from "react-icons/md";

import Button from "~/components/button";
import Input from "~/components/input";

import { useAppSelector } from "~/hooks/useRedux";

import { Inputs } from "~/pages/signup-page/constants";
import { ISignUpFormState } from "~/pages/signup-page/types";
import { InputTypes } from "~/types";
import * as S from "./styles";

interface IProps<T> {
  values: T;
  errors: { [K in keyof T]?: string };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SignupFields: FC<IProps<ISignUpFormState>> = ({ values, errors, handleChange }) => {
  const { isLoggingIn } = useAppSelector((state) => state.authentication);

  return (
    <Fragment>
      <div className={S.inputsWrapperStyle}>
        <Input
          name={Inputs.Name}
          placeholder="Name"
          type={InputTypes.Text}
          value={values.name}
          error={errors.name}
          onChange={handleChange}
        />
        <Input
          name={Inputs.Email}
          placeholder="Email"
          type={InputTypes.Email}
          value={values.email}
          error={errors.email}
          onChange={handleChange}
        />
        <Input
          name={Inputs.Password}
          placeholder="Password"
          type={InputTypes.Password}
          value={values.password}
          error={errors.password}
          onChange={handleChange}
        />
        <Input
          name={Inputs.ConfirmPassword}
          placeholder="Repeat password"
          type={InputTypes.Password}
          value={values.confirmPassword}
          error={errors.confirmPassword}
          onChange={handleChange}
        />
      </div>
      <Button
        primary
        isLoading={isLoggingIn}
        danger={Boolean(Object.values(errors).length)}
        outline
        Icon={ArrowIcon}
      >
        Sign Up
      </Button>
    </Fragment>
  );
};

export default SignupFields;
