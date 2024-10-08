import { FC } from "react";

type IIconArrowLeftCircleProps = {
  fill: string;
};

export const IconArrowLeftCircle: FC<IIconArrowLeftCircleProps> = ({ fill }) => {

  return (
    <svg
      fill={fill}
      viewBox="0 0 16 16"
      height="1.4em"
      width="1.4em"
      cursor="pointer"
    >
      <path
        fillRule="evenodd"
        d="M1 8a7 7 0 1014 0A7 7 0 001 8zm15 0A8 8 0 110 8a8 8 0 0116 0zm-4.5-.5a.5.5 0 010 1H5.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 11.708.708L5.707 7.5H11.5z"
      />
    </svg>
  );
}
