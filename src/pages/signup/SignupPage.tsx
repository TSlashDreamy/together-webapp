import { FC } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import SignupFields from "~/containers/signup-fields";
import AuthorizationWrapper from "~/containers/authorization-wrapper";
import OptionalLoginBlock from "~/containers/optional-login-block";
import CardWrapper from "~/components/card-wrapper";
import Form from "~/components/form";

import { setUser } from "~/redux/slices/userSlice";
import { showNotification } from "~/redux/slices/notificationSlice";
import { resetLoggingIn, setLoggingIn } from "~/redux/slices/authSlice";

import { useAppDispatch } from "~/hooks/useRedux";
import useForm from "~/hooks/useForm";
import useDatabase from "~/hooks/useDatabase";

import { auth } from "~/firebase";
import { validate as signupValidate } from "~/validators/signupValidators";
import { convertUserData } from "./utils";
import { DBCollections } from "~/constants";
import { NotificationType } from "~/types";
import { ISignUpFormState } from "./types";

type ISignUp = (values: ISignUpFormState) => void;

const SignupPage: FC = () => {
  const dispatch = useAppDispatch();
  const { pushData } = useDatabase();

  const handleSignUp: ISignUp = async ({ email, password, name }) => {
    try {
      dispatch(setLoggingIn());
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const userData = convertUserData(user, name);

      await pushData<typeof userData>(DBCollections.Users, userData, user.uid);

      dispatch(
        setUser({
          ...userData,
          token: user.refreshToken,
        })
      );
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
