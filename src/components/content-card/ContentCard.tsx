import { FC } from "react";

import IconButton from "~/components/icon-button";

import TempIcon from "~/assets/icons/etc-icons/play.svg?react";
import Typography from "../typography";

const ContentCard: FC = () => {
  return (
    <div className="flex gap-[10px] p-[20px] w-[305px] rounded-[35px] bg-primary">
      <div className="flex flex-col gap-[10px] p-[25px] w-full bg-background rounded-[20px]">
        <div className="flex gap-[10px]">
          <Typography.SPAN>Limb</Typography.SPAN>
        </div>
        <hr />
        <div className="flex gap-[10px]">
          <IconButton Icon={TempIcon} />
          <div className="flex flex-col">
            <Typography.SPAN>Burned time machine</Typography.SPAN>
            <TempIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
