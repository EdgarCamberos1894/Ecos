import { SVGProps } from "react";

export const PrevIcon = (props: SVGProps<SVGSVGElement>) => (
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
    <path d="M48 12L20 32L48 52V12Z" />
    <line x1="10" y1="12" x2="10" y2="52" />
  </svg>
);
