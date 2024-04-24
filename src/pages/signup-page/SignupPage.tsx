import { FC } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import SignupFields from "~/containers/signup-fields";
import AuthorizationWrapper from "~/containers/authorization-wrapper";
import OptionalLoginBlock from "~/containers/optional-login-block";
import CardWrapper from "~/components/card-wrapper";
import Form from "~/components/form";

import { showNotification } from "~/redux/slices/notificationSlice";
import { resetLoggingIn, setLoggingIn } from "~/redux/slices/authSlice";
import { useAppDispatch } from "~/hooks/useRedux";

import { auth } from "~/firebase";
import useForm from "~/hooks/useForm";
import { validate as signupValidate } from "~/validators/signupValidators";
import { ISignUpFormState } from "./types";
import { NotificationType } from "~/types";
import useDatabase from "~/hooks/useDatabase";

const SignupPage: FC = () => {
  const dispatch = useAppDispatch();
  const { pushUserData } = useDatabase();

  const handleSignUp = async (values: ISignUpFormState) => {
    const { email, password, name } = values;

    try {
      dispatch(setLoggingIn());
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await pushUserData({...user, userName: name})
    } catch (error) {
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: error instanceof FirebaseError ? error.message : "Something went wrong",
        })
      );
    } finally {
      dispatch(resetLoggingIn());
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm<ISignUpFormState>(
    { name: "", email: "", password: "", confirmPassword: "" },
    handleSignUp,
    signupValidate
  );

  return (
    <AuthorizationWrapper>
      <CardWrapper>
        <Form onSubmit={handleSubmit}>
          <SignupFields values={values} errors={errors} handleChange={handleChange} />
        </Form>
      </CardWrapper>
      <OptionalLoginBlock creatingUser />
    </AuthorizationWrapper>
  );
};

export default SignupPage;
