import { FC } from "react";
import { MdOutlineKeyboardArrowRight as ArrowIcon } from "react-icons/md";

import AuthorizationWrapper from "~/containers/authorization-wrapper";
import OptionalLoginBlock from "~/containers/optional-login-block";
import Button from "~/components/button";
import CardWrapper from "~/components/card-wrapper";
import Input from "~/components/input";
import Form from "~/components/form";

import useForm from "~/hooks/useForm";
import { validate as signupValidate } from "~/validators/signupValidators";
import { InputTypes } from "~/types";
import { ISignUpFormState } from "./types";
import { Inputs } from "./constants";

const SignupPage: FC = () => {
  const handleSignUpSubmit = (values: ISignUpFormState) => {
    console.log("Form data:", values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm<ISignUpFormState>(
    { name: "", email: "", password: "", confirmPassword: "" },
    handleSignUpSubmit,
    signupValidate
  );

  return (
    <AuthorizationWrapper>
      <CardWrapper>
        <Form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">
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
          <Button primary danger={Boolean(Object.values(errors).length)} outline Icon={ArrowIcon}>
            Sign Up
          </Button>
        </Form>
      </CardWrapper>
      <OptionalLoginBlock creatingUser />
    </AuthorizationWrapper>
  );
};

export default SignupPage;
