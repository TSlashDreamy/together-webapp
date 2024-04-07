import { FC, ReactNode } from "react";

interface IProps {
  children: ReactNode;
}

const LandingWrapper: FC<IProps> = ({ children }) => {
  return (
    <div className="flex items-center content-start w-[100vw] h-[100vh] p-[50px]">{children}</div>
  );
};

export default LandingWrapper;
