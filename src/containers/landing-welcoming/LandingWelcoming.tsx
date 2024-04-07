import { FC } from "react";

import Button from "~/components/button";
import { descriptionStyle, titleGradientStyle, titleStyles, wrapperStyle } from "./styles";

const LandingWelcoming: FC = () => {
  return (
    <div className={wrapperStyle}>
      <div>
        <h2 className={titleStyles}>
          It's Always Better To Be <span className={titleGradientStyle}>Together</span>
        </h2>
        <span className={descriptionStyle}>
          Join your friends and loved ones to spend time together watching, listening, and reading
          anything!
        </span>
      </div>
      <Button primary outline>
        Let's go
      </Button>
    </div>
  );
};

export default LandingWelcoming;
