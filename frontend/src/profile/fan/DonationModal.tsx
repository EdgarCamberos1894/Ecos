import Modal from "@/app/ui/Modal";
import { DonationDataReadOnlySection } from "./components/DonationDataReadOnlySection";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import defaultImage from "@/assets/imagePlay.svg";

export interface DonationType {
  paymentLink?: string;
  cbu?: string;
  paymentAlias?: string;
  image: string | null;
}

interface DonationModalProps {
  artistId: number;
  onClose: () => void;
}

const DonationModal = ({ onClose, artistId }: DonationModalProps) => {
  const { data } = useApiQuery<DonationType>(
    "musician-donations",
    `/musician-profile/${String(artistId)}/donations`,
    artistId.toString(),
  );

  const imageSrc = data?.image ?? defaultImage;

  return (
    <Modal
      onClose={onClose}
      firstNormalText="Dona a tu artista favorito"
      className="flex h-auto w-full max-w-6xl flex-col items-center justify-center overflow-y-auto"
    >
      <div className="grid h-full w-full grid-cols-1 gap-6 p-15 lg:grid-cols-2 lg:gap-20">
        <img
          src={imageSrc}
          alt="Imagen del artista"
          className="max-h-[600px] w-full rounded-[20px] object-cover shadow-md"
        />

        <div className="text-ecos-blue flex flex-col justify-center space-y-4">
          <h1 className="text-2xl font-medium md:text-3xl lg:text-4xl">
            Hacemos música gracias a ti
          </h1>
          <p className="text-base md:text-lg lg:text-xl">
            Cada donación permite grabar, viajar y compartir nuevo arte. ¡Gracias por ser parte de
            esto!
          </p>
          {data && (
            <DonationDataReadOnlySection
              paymentLink={data.paymentLink}
              paymentAlias={data.paymentAlias}
              cbu={data.cbu}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DonationModal;
