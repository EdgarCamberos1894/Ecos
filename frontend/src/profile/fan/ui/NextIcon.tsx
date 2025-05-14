import { SVGProps } from "react";

export const NextIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="30"
    height="30"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke="currentColor"
    strokeWidth="4"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 12L44 32L16 52V12Z" />
    <line x1="54" y1="12" x2="54" y2="52" />
  </svg>
);
