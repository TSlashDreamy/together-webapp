import { FC, MouseEvent, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

interface RangeSliderProps {
  value?: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
}

const RangeSlider: FC<RangeSliderProps> = ({ value, onChange, min, max }) => {
  const [isChanging, setIsChanging] = useState(false);
  const [currentValue, setCurrentValue] = useState<number | undefined>(0);
  const classes = twMerge(
    "appearance-none bg-text-white outline-none rounded-full cursor-pointer overflow-hidden",
    "[&::-webkit-slider-runnable-track]:!h-[5px] [&::-webkit-slider-runnable-track]:!bg-text-white [&::-webkit-slider-runnable-track]:!rounded-full",
    "[&::-moz-range-track]:!h-[5px] [&::-moz-range-track]:!bg-text-white [&::-moz-range-track]:!rounded-full",
    "[&::-webkit-slider-thumb]:!appearance-none [&::-webkit-slider-thumb]:!h-[5px] [&::-webkit-slider-thumb]:!w-[8px] [&::-webkit-slider-thumb]:!bg-primary [&::-webkit-slider-thumb]:!rounded-full",
    "[&::-moz-range-thumb]:!appearance-none [&::-moz-range-thumb]:!h-[5px] [&::-moz-range-thumb]:!w-[8px] [&::-moz-range-thumb]:!bg-primary [&::-moz-range-thumb]:!rounded-full",
    "[&::-webkit-slider-thumb]:!shadow-[-407px_0_0_400px_#E09145]",
    "[&::-moz-range-thumb]:!shadow-[-407px_0_0_400px_#E09145]"
  );

  const handleUpdate = (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    onChange(Number(target.value));
    setIsChanging(false);
  };

  useEffect(() => {
    isChanging && setCurrentValue(undefined);
    !isChanging && value !== undefined && setCurrentValue(value);
  }, [isChanging, value]);

  return (
    <input
      type="range"
      className={classes}
      value={currentValue}
      onChange={() => null}
      onMouseDown={() => setIsChanging(true)}
      onMouseUp={handleUpdate}
      min={min}
      max={max}
    />
  );
};

export default RangeSlider;
