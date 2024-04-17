import { FC } from "react";

import CardWrapper from "~/components/card-wrapper";
import Link from "~/components/link";
import { optionalBlockStyle } from "./styles";
import { routes } from "~/router/constants";

interface IProps {
  creatingUser?: boolean;
}

const OptionalLoginBlock: FC<IProps> = ({ creatingUser }) => {
  return (
    <CardWrapper className={optionalBlockStyle}>
      {creatingUser ? (
        <Link to={routes.Login}>Already have an account? Log In</Link>
      ) : (
        <>
          <Link to={routes.Signup}>Don't have an account? Sign Up</Link>
          <Link to={routes.ResetPassword}>Forgot password?</Link>
        </>
      )}
    </CardWrapper>
  );
};

export default OptionalLoginBlock;
