import { FC } from "react";
import { twMerge } from "tailwind-merge";

import * as S from "./styles";

const Switch: FC = () => {
  const switchClasses = twMerge(S.switchStyles);
  
  return (
    <label className={S.wrapperStyle}>
      <input className={S.inputStyle} type="checkbox" />
      <span className={switchClasses} />
    </label>
  );
};

export default Switch;
