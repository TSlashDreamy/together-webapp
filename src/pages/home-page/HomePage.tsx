import { FC } from "react";

import Button from "~/components/button";
import Divider from "~/components/divider";
import Typography from "~/components/typography";
import CategoryCard from "~/components/category-card";
import RoomIcon from "~/assets/icons/navbar-icons/roomIcon.svg?react";
import MusicIcon from "~/assets/icons/content-icons/music.svg?react";
import VideoIcon from "~/assets/icons/content-icons/video.svg?react";
import FilmIcon from "~/assets/icons/content-icons/film.svg?react";
import ImageIcon from "~/assets/icons/content-icons/image.svg?react";

const HomePage: FC = () => {
  return (
    <>
      <div className="flex flex-col gap-[60px] p-[50px] pl-[140px] relative z-10">
        <div>
          <Typography.H1>User's homepage</Typography.H1>
        </div>
        <div className="flex flex-col justify-center gap-5">
          <Typography.H2 className="text-center">Create a room</Typography.H2>
          <div className="flex flex-col gap-[15px] items-center">
            <div className="flex items-center gap-[15px]">
              <RoomIcon />
              <Typography.H4>Don't have a room yet?</Typography.H4>
            </div>
            <Button primary outline>
              Let's create one!
            </Button>
          </div>
        </div>
        <Divider>OR</Divider>
        <div className="flex flex-col gap-[20px]">
          <Typography.H2 className="text-center">Search for content</Typography.H2>
          <div className="flex justify-center items-center gap-[25px]">
            <CategoryCard
              Icon={MusicIcon}
              cardNum={1}
              description="Music and audio"
              borderStyle="border-content-music"
              bgStyle="hover:bg-content-music"
            />
            <CategoryCard
              Icon={VideoIcon}
              cardNum={2}
              description="Video and clips"
              borderStyle="border-content-video"
              bgStyle="hover:bg-content-video"
            />
            <CategoryCard
              Icon={FilmIcon}
              cardNum={3}
              description="Films together"
              borderStyle="border-content-films"
              bgStyle="hover:bg-content-films"
              disabled={true}
            />
            <CategoryCard
              Icon={ImageIcon}
              cardNum={4}
              description="Pictures and images"
              borderStyle="border-content-pictures"
              bgStyle="hover:bg-content-pictures"
              disabled={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
