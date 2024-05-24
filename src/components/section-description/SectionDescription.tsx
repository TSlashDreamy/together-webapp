import { FC } from "react";
import { IconType } from "react-icons";

import Typography from "~/components/typography";

interface IProps {
  Icon: IconType | FC;
  title: string;
  description: string;
}

const SectionDescription: FC<IProps> = ({ Icon, description, title }) => {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center size-full">
      <div className="flex justify-center items-center gap-[15px]">
        <Icon className="size-[50px] text-text-white fill-text-white" />
        <Typography.H2 className="font-normal">{title}</Typography.H2>
      </div>
      <Typography.H4 className="opacity-50">{description}</Typography.H4>
    </div>
  );
};

export default SectionDescription;
