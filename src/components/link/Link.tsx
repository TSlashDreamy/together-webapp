import { FC, ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface IProps {
  children: ReactNode;
  to: string;
}

const Link: FC<IProps> = ({ children, to }) => {
  return <NavLink to={to}>{children}</NavLink>;
};

export default Link;
