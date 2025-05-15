import { SVGProps } from "react";

export const ArrowDown = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" {...props}>
      <path d="M6 11L15 20L24 11" stroke="#5A5A5A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};
