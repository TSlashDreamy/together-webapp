import { FC } from "react";

import CardDescription from "./card-description";
import { cardStyle } from "./styles";

const ContentCard: FC = () => {
  return (
    <div className={cardStyle} style={{ backgroundImage: "url('https://f4.bcbits.com/img/a2992416002_10.jpg')" }}>
      <CardDescription />
    </div>
  );
};

export default ContentCard;
