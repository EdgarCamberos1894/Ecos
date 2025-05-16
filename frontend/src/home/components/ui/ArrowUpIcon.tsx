import { SVGProps } from "react";

const ArrowUpIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="32"
      height="32"
      fill="none"
      {...props}
    >
      <path d="M30 60 L50 40 L70 60" stroke="black" strokeWidth="5" fill="transparent" />
    </svg>
  );
};

export default ArrowUpIcon;
