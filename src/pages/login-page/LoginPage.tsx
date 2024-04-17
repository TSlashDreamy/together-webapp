import { FC } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";

import LoginFields from "~/containers/login-fields";
import AuthorizationWrapper from "~/containers/authorization-wrapper";
import OptionalLoginBlock from "~/containers/optional-login-block";
import CardWrapper from "~/components/card-wrapper";
import Form from "~/components/form";

import { setUser } from "~/redux/slices/userSlice";
import { showNotification } from "~/redux/slices/notificationSlice";
import { resetLoggingIn, setLoggingIn } from "~/redux/slices/authSlice";
import { useAppDispatch } from "~/hooks/useRedux";

import { auth } from "~/firebase";
import useForm from "~/hooks/useForm";
import { validate as loginValidate } from "~/validators/loginValidators";
import { NotificationType } from "~/components/notification/types";
import { ILoginFormState } from "./types";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();

  const handleLogin = async (values: ILoginFormState) => {
    const { email, password } = values;

    try {
      dispatch(setLoggingIn());
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      dispatch(
        setUser({
          email: user.email,
          id: user.uid,
          token: user.refreshToken,
        })
      );
      dispatch(resetLoggingIn());
    } catch (error: unknown) {
      console.log(error);
      dispatch(resetLoggingIn());
      dispatch(
        showNotification({
          type: NotificationType.Error,
          content: error instanceof FirebaseError ? error.message : "Something went wrong",
        })
      );
    }
  };

  const { values, errors, handleChange, handleSubmit } = useForm<ILoginFormState>(
    { email: "", password: "" },
    handleLogin,
    loginValidate
  );

  return (
    <AuthorizationWrapper>
      <CardWrapper>
        <Form onSubmit={handleSubmit}>
          <LoginFields values={values} errors={errors} handleChange={handleChange} />
        </Form>
      </CardWrapper>
      <OptionalLoginBlock />
    </AuthorizationWrapper>
  );
};

export default LoginPage;
