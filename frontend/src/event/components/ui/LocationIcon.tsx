interface LocationIconProps {
  className?: string;
  size?: number;
}

function LocationIcon(props: LocationIconProps) {
  return (
    <svg
      viewBox="0 0 30 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 10c0 6.627-9 13-9 13S3 16.627 3 10a9 9 0 1118 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export default LocationIcon;
