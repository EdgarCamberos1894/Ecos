import { SVGProps } from "react";

export const BackArrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none" {...props}>
      <path
        d="M28.4435 50.6668L10.6657 32.0002M10.6657 32.0002L28.4435 13.3335M10.6657 32.0002L53.3324 32.0002"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
