interface TicketIconProps {
  className?: string;
  size?: number;
}

function TicketIcon({ className = "", size = 30 }: TicketIconProps) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(-45deg)" }}
    >
      <rect
        x="8"
        y="16"
        width="48"
        height="32"
        fill="black"
        stroke="white"
        strokeWidth="2"
        rx="0"
        ry="0"
      />
      <circle cx="10" cy="32" r="4" fill="white" stroke="white" strokeWidth="2" />
      <circle cx="53" cy="32" r="4" fill="white" stroke="white" strokeWidth="2" />
      <line
        x1="18"
        y1="-80"
        x2="80"
        y2="300"
        stroke="white"
        strokeWidth="4"
        strokeDasharray="5 5"
      />
    </svg>
  );
}

export default TicketIcon;
