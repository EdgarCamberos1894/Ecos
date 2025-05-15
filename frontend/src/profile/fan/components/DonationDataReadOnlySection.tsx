import LabeledFieldReadOnly from "./LabeledFieldReadOnly";

interface DonationDataReadOnlySectionProps {
  paymentLink?: string;
  paymentAlias?: string;
  cbu?: string;
}

export const DonationDataReadOnlySection = ({
  paymentLink,
  paymentAlias,
  cbu,
}: DonationDataReadOnlySectionProps) => {
  return (
    <section className="flex flex-col gap-2.5">
      <LabeledFieldReadOnly label="🔗 LINK DE PAGO RÁPIDO" value={paymentLink} />
      <LabeledFieldReadOnly label="ALIAS" value={paymentAlias} />

      <LabeledFieldReadOnly label="CBU" value={cbu} />
    </section>
  );
};
