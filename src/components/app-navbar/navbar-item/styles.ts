export const navItemStyles = [
  "xl:[&>svg]:size-[2.2vw]",
  "relative [&>svg]:size-[40px] cursor-pointer transition-all",
  "hover:[&>svg]:fill-primary-transparent hover:[&>svg]:transition-all",
  "active:after:w-1/4",
  "active:[&>svg]:scale-90",
  "after:absolute after:w-1/4 after:h-1",
];

export const activeStyle = "after:absolute after:opacity-100 after:left-1/2 after:mt-2 after:bg-primary after:rounded-xl after:translate-x-[-50%] after:transition-all";