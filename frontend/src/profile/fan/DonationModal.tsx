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
      <div className="grid grid-cols-1 gap-6 p-4 lg:grid-cols-2 lg:gap-20 lg:p-15">
        <img
          src={imageSrc}
          alt="Imagen del artista"
          className="aspect-square w-full max-w-[250px] place-self-center rounded-[20px] object-cover lg:max-w-[450px]"
        />

        <div className="text-ecos-blue flex max-w-96 flex-col justify-center space-y-4 place-self-center lg:max-w-[747px]">
          <h1 className="text-2xl font-medium text-balance md:text-3xl lg:text-4xl">
            Hacemos música gracias a ti
          </h1>
          <p className="text-base text-balance md:text-lg lg:text-xl">
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
