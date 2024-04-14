import { FC } from "react";

import CardWrapper from "~/components/card-wrapper";
import Link from "~/components/link";
import { optionalBlockStyle } from "./styles";

const OptionalLoginBlock: FC = () => {
  return (
    <CardWrapper className={optionalBlockStyle}>
      <Link to="/signup">Don't have an account? Sign Up</Link>
      <Link to="/reset_password">Forgot password?</Link>
    </CardWrapper>
  );
};

export default OptionalLoginBlock;
