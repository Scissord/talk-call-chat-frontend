import { FC } from 'react';

type IIconExitProps = {
  fill: string;
};

export const IconExit: FC<IIconExitProps> = ({ fill }) => {

  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      height="1.4em"
      width="1.4em"
      cursor="pointer"
    >
      <path fill="none" d="M0 0h24v24H0z" />
      <path d="M5 11h8v2H5v3l-5-4 5-4v3zm-1 7h2.708a8 8 0 100-12H4a9.985 9.985 0 018-4c5.523 0 10 4.477 10 10s-4.477 10-10 10a9.985 9.985 0 01-8-4z" />
    </svg>
  );
}
