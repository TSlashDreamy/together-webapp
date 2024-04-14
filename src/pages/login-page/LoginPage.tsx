import { FC } from "react";
import { MdOutlineKeyboardArrowRight as ArrowIcon } from "react-icons/md";

import AuthorizationWrapper from "~/containers/authorization-wrapper";
import OptionalLoginBlock from "~/containers/optional-login-block";
import Button from "~/components/button";
import CardWrapper from "~/components/card-wrapper";
import Input from "~/components/input";
import Form from "~/components/form";

import useForm from "~/hooks/useForm";
import { validate as loginValidate } from "~/validators/loginValidators";
import { InputTypes } from "~/types";
import { ILoginFormState } from "./types";
import { Inputs } from "./constants";

const LoginPage: FC = () => {
  const handleLoginSubmit = (values: ILoginFormState) => {
    console.log("Form data:", values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm<ILoginFormState>(
    { email: "", password: "" },
    handleLoginSubmit,
    loginValidate
  );

  return (
    <AuthorizationWrapper>
      <CardWrapper>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
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
          <Button primary danger={Boolean(Object.values(errors).length)} outline Icon={ArrowIcon}>
            Log In
          </Button>
        </Form>
      </CardWrapper>
      <OptionalLoginBlock />
    </AuthorizationWrapper>
  );
};

export default LoginPage;
