import { FC } from "react";

import { titleGradientStyle, titleStyles, titleWrapperStyle } from "./styles";

const LandingTitle: FC = () => {
  return (
    <div className={titleWrapperStyle}>
      <h2 className={titleStyles}>It's Always Better</h2>
      <h2 className={titleStyles}>
        To Be <span className={titleGradientStyle}>Together</span>
      </h2>
    </div>
  );
};

export default LandingTitle;
