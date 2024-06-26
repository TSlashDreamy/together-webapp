export const buttonStyles = [
  "xl:text-[1.1vw] xl:px-[2vw] xl:py-[0.6vw]",
  "flex items-center justify-center gap-[10px] relative group cursor-pointer",
  "px-9 py-3 rounded-[10px]",
  "font-light text-[20px] transition-all",
  "after:content-[''] after:absolute after:left-1/2 after:bottom-[20%] after:translate-x-[-50%] after:w-0 after:h-[1px]",
  "after:bg-text-white after:transition-all",
  "hover:tracking-wider hover:after:w-1/2 hover:px-[1.8vw]",
  "active:scale-90",
  "active:after:w-1/6",
];

export const primaryButtonStyle = "bg-primary text-text-white";
export const secondaryButtonStyle = "bg-orange-50 text-black after:bg-black";
export const successButtonStyle = "bg-success-500 text-text-white";
export const dangerButtonStyle = "bg-danger-500 text-text-white";

export const outlineButtonStyle = "bg-transparent border-[1px] border-primary";
export const primaryOutlineStyle = "text-text-light after:bg-text-light";
export const secondaryOutlineStyle = "border-orange-50 text-orange-50 after:bg-orange-50";
export const successOutlineStyle = "border-success-500 text-success-600 after:bg-success-600";
export const dangerOutlineStyle = "border-danger-500 text-danger-600 after:bg-danger-600";

export const extraLargeStyle = "xl:px-[2vw] xl:py-[0.6vw] px-9 py-3 hover:px-[1.8vw]";
export const largeStyle = "xl:px-[1.2vw] xl:py-[0.5vw] px-[1.30rem] py-2.5 hover:px-[1vw]";
export const mediumStyle = "xl:px-[1vw] xl:py-[0.3vw] px-[1.05rem] py-[0.30rem] after:bottom-[10%] hover:px-[0.8vw]";
export const smallStyle = "px-2.5 py-0.5 after:bottom-[10%] hover:px-[2.3vw]";

export const hasIconStyle = "leading-[29px]";
export const dangerIconStyle = "bg-danger-600 border-danger-600";
export const successIconStyle = "bg-success-600 border-success-600";

export const buttonIconStyles = [
  "size-auto px-[3px] bg-primary text-text-white border-primary rounded-xl transition-all",
  "group-active:p-0 group-active:bg-transparent group-active:border-[1px]",
];

export const disabledStyle = "opacity-50 pointer-events-none";
