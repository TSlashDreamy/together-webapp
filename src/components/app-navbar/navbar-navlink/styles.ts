export const navLinkStyles = [
  "xl:[&>svg]:size-[2.2vw]",
  "relative [&>svg]:size-[40px]",
  "after:absolute after:left-1/2 after:h-1 after:w-1/4 after:mt-2 after:bg-primary after:rounded-xl after:opacity-0 after:translate-x-[-50%] after:transition-all",
  "hover:fill-primary",
  "hover:after:w-1/2 hover:after:h-[1px] hover:after:bg-text-light hover:after:opacity-100",
  "hover:[&>svg]:fill-primary-transparent hover:[&>svg]:transition-all",
  "active:after:w-1/4",
  "active:[&>svg]:scale-90",
];

export const activeStyle = "after:opacity-100 after:w-1/4";
