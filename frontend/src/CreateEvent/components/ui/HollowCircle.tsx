const HollowCircle = ({ size = 24 }: { size?: number }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="36" cy="36" r="28" stroke="#6F6F6F66" strokeWidth="9" fill="none" />
    </svg>
  );
};

export default HollowCircle;
