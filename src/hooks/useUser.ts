import { useAppSelector } from "~/hooks/useRedux";

export const useUser = () => {
  const user = useAppSelector((state) => state.user);

  return { ...user };
};

// TODO: This is dumb... remove later
