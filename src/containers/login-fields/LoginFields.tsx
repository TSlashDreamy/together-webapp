import { ChangeEvent, FC, Fragment } from "react";
import { MdOutlineKeyboardArrowRight as ArrowIcon } from "react-icons/md";
import { useAuthState } from 'react-firebase-hooks/auth';

import Button from "~/components/button";
import Input from "~/components/input";

import { Inputs } from "~/pages/login-page/constants";
import { ILoginFormState } from "~/pages/login-page/types";
import { InputTypes } from "~/types";
import * as S from "./styles";
import { auth } from "~/firebase";

interface IProps<T> {
  values: T;
  errors: { [K in keyof T]?: string };
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const LoginFields: FC<IProps<ILoginFormState>> = ({ values, errors, handleChange }) => {
  const [, loading] = useAuthState(auth);

  return (
    <Fragment>
      <div className={S.inputsWrapperStyle}>
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
      </div>
      <Button
        primary
        isLoading={loading}
        danger={Boolean(Object.values(errors).length)}
        outline
        Icon={ArrowIcon}
      >
        Log In
      </Button>
    </Fragment>
  );
};

export default LoginFields;
