import { FC } from "react";
import { createPortal } from "react-dom";
import { IoMdHeart as LikeIcon } from "react-icons/io";
import { MdHeartBroken as BrokenHeartIcon } from "react-icons/md";

import PageWrapper from "~/components/page-wrapper";
import SectionHeading from "~/components/section-heading";
import Typography from "~/components/typography";
import ContentItem from "~/components/content-item";
import SectionDescription from "~/components/section-description";

import { useUser } from "~/hooks/useUser";

import AllIcon from "~/assets/icons/content-icons/allIcon.svg?react";

const LikedPage: FC = () => {
  const { likedContent } = useUser();

  return (
    <PageWrapper>
      <SectionHeading title={"Liked content"} Icon={LikeIcon} />
      {likedContent ? (
        <div className="flex flex-col gap-[20px] w-full">
          <div className="flex items-center justify-start gap-[15px]">
            <AllIcon className="fill-text-white size-[40px]" />
            <Typography.H4 className="font-normal">Last liked</Typography.H4>
          </div>
          <div className="flex flex-col items-center justify-center gap-[20px]">
            {likedContent.map((content, index) => (
              <ContentItem key={`${content.author}-${content.name}-${index}`} track={content} />
            ))}
          </div>
        </div>
      ) : (
        createPortal(
          <SectionDescription
            Icon={BrokenHeartIcon}
            title="No liked content?"
            description="It can’t be! There’s no way you did not like something. You should fix it now! :D"
          />,
          document.getElementById("portal") as HTMLElement
        )
      )}
    </PageWrapper>
  );
};

export default LikedPage;
