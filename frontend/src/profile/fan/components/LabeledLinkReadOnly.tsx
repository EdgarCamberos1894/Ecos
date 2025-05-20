interface LabeledLinkReadOnlyProps {
  label: string;
  value?: string;
}

const LabeledLinkReadOnly = ({ label, value }: LabeledLinkReadOnlyProps) => {
  return value ? (
    <a
      href={value}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ecos-blue hover:font-medium hover:underline"
      aria-label={`Enlace a ${label}`}
    >
      <span className="mr-1 inline-block" aria-hidden="true">
        🔗
      </span>
      <span>{label}</span>
    </a>
  ) : null;
};

export default LabeledLinkReadOnly;
