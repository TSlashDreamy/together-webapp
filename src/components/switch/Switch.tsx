import { ChangeEvent, FC, HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

import * as S from "./styles";

interface IProps extends HTMLAttributes<HTMLInputElement> {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

const Switch: FC<IProps> = ({ onChange, checked }) => {
  const switchClasses = twMerge(S.switchStyles);

  return (
    <label className={S.wrapperStyle}>
      <input className={S.inputStyle} type="checkbox" onChange={onChange} checked={checked} />
      <span className={switchClasses} />
    </label>
  );
};

export default Switch;
