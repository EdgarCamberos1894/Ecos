import { DonateButton } from "@/profile/components/DonateButton";
import { Donate } from "@/profile/components/ui/Icons";

interface DonateSectionProps {
  handleDonationModal: () => void;
  isProfileFromUser: boolean;
}

export const DonateSection = ({ handleDonationModal, isProfileFromUser }: DonateSectionProps) => {
  return (
    <div className={`${isProfileFromUser ? "hidden" : "flex"} text-ecos-blue flex-col gap-4.5`}>
      <Donate className="text-ecos-orange-light size-[52px]" />
      <h3 className="text-4xl">Dona</h3>
      <small className="text-[20px] font-normal">Cada aporte es un acorde nuevo.</small>
      <p className="text-[20px] font-light">Ayudanos a crear más canciones como esta.</p>
      <div>
        <DonateButton
          fromDonateSection={true}
          onClick={handleDonationModal}
          className="button-primary flex h-14 w-full max-w-[346px] items-center justify-center gap-7.5 rounded-[37px] px-4 py-2"
        >
          <p className="basis-28 text-start">Donar</p>
        </DonateButton>
      </div>
    </div>
  );
};
