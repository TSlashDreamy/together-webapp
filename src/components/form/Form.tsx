import { FC, HTMLAttributes, ReactNode } from "react";

import { formStyle } from "./styles";

interface IProps extends HTMLAttributes<HTMLFormElement> {
  children: ReactNode;
}

const Form: FC<IProps> = ({ children, ...other }) => {
  return (
    <form className={formStyle} {...other}>
      {children}
    </form>
  );
};

export default Form;
