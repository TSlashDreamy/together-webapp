import { IoWarningOutline } from "react-icons/io5";

const NotificationOverlay = () => {
  return (
    <div className="z-[30] fixed bottom-[0] w-[100vw] bg-[repeating-linear-gradient(-45deg,_#11121580_0,_#FCD9B860_15px)] opacity-[0.7]">
      <div className="flex justify-center items-center gap-[5px]  text-text-white">
        <IoWarningOutline />
        <p>This is a demo version of "Together"</p>
      </div>
    </div>
  );
};

export default NotificationOverlay;
