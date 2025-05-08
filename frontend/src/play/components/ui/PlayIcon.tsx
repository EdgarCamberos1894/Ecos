import { SVGProps } from "react";

export const PlayIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    className="h-12 w-12 rounded-full bg-[#6246FF] p-2 text-white"
    {...props}
  >
    <polygon points="6,4 20,12 6,20" />
  </svg>
);
