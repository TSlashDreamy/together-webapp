import { FC } from "react";
import { MdOutlineKeyboardArrowRight as ArrowIcon } from "react-icons/md";
import { twMerge } from "tailwind-merge";

import OptionalLoginBlock from "~/containers/optional-login-block";
import Button from "~/components/button";
import CardWrapper from "~/components/card-wrapper";
import Input from "~/components/input";
import LandingWrapper from "~/components/landing-wrapper";
import TransitionLoader from "~/components/transition-loader";
import Cubes from "~/components/cubes";
import Form from "~/components/form";

import useForm from "~/hooks/useForm";
import { validate as loginValidate } from "~/validators/loginValidators";
import { InputTypes } from "~/types";
import { ILoginFormState } from "./types";
import { loginTitleStyles, loginWrapperStyle } from "./styles";
import { Inputs } from "./constants";

const LoginPage: FC = () => {
  const titleClasses = twMerge(...loginTitleStyles);

  const handleLoginSubmit = (values: ILoginFormState) => {
    console.log("Form data:", values);
  };

  const { values, errors, handleChange, handleSubmit } = useForm<ILoginFormState>(
    { email: "", password: "" },
    handleLoginSubmit,
    loginValidate
  );

  return (
    <div className={loginWrapperStyle}>
      <TransitionLoader />
      <Cubes randomize />
      <LandingWrapper className="flex-col justify-center gap-[30px] relative z-20">
        <h3 className={titleClasses}>together</h3>
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
            <Button primary outline Icon={ArrowIcon}>
              Log In
            </Button>
          </Form>
        </CardWrapper>
        <OptionalLoginBlock />
      </LandingWrapper>
    </div>
  );
};

export default LoginPage;
