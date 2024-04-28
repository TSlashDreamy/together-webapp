import { FC } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { browserSessionPersistence, setPersistence } from "firebase/auth";

import LoginFields from "~/containers/login-fields";
import AuthorizationWrapper from "~/containers/authorization-wrapper";
import OptionalLoginBlock from "~/containers/optional-login-block";
import CardWrapper from "~/components/card-wrapper";
import Form from "~/components/form";

import { showNotification } from "~/redux/slices/notificationSlice";
import { resetLoggingIn, setLoggingIn } from "~/redux/slices/authSlice";

import { useAppDispatch } from "~/hooks/useRedux";
import useDatabase from "~/hooks/useDatabase";
import useForm from "~/hooks/useForm";

import { auth } from "~/firebase";
import { validate as loginValidate } from "~/validators/loginValidators";
import { NotificationType, User } from "~/types";
import { ILoginFormState } from "./types";
import { DBCollections } from "~/constants";
import { getKey } from "~/utils";

const LoginPage: FC = () => {
  const dispatch = useAppDispatch();
  const { updateData } = useDatabase();

  const handleLogin = async (values: ILoginFormState) => {
    const { email, password } = values;

    try {
      dispatch(setLoggingIn());
      await setPersistence(auth, browserSessionPersistence);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      await updateData<number>(DBCollections.Users, Date.now(), user.uid, getKey<User, "lastLogin">("lastLogin"));
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
