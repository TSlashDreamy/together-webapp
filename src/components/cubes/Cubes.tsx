import { FC } from "react";

const Cubes: FC = () => {
  const textureClasses = 'absolute bg-landing-obj-texture bg-cover';

  return (
    <div className="fixed right-0 top-0 size-full">
      <div className={`${textureClasses} size-[13vw] right-[29vw] bottom-[34vw] rotate-[130deg] rounded-[32px] animate-floating130`} />
      <div className={`${textureClasses} size-[16vw] right-[6vw] bottom-[23vw] rotate-[-115deg] rounded-[50px] animate-floating115`} />
      <div className={`${textureClasses} size-[20vw] right-[22vw] bottom-[4vw] rotate-[65deg] rounded-[50px] animate-floating65`} />
    </div>
  );
};

export default Cubes;
