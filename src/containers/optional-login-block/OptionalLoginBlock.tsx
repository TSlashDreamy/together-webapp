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
        <Link to={routes.landing.login}>Already have an account? Log In</Link>
      ) : (
        <>
          <Link to={routes.landing.signup}>Don't have an account? Sign Up</Link>
          <Link to={routes.landing.resetPass}>Forgot password?</Link>
        </>
      )}
    </CardWrapper>
  );
};

export default OptionalLoginBlock;
