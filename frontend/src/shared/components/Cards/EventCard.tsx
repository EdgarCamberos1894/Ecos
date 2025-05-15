import img from "@/assets/image.webp";
import Button from "@/app/ui/Button";

interface EventCardProps {
  headline: string;
  supportingText: string;
  datePublished: Date;
  contentPublished: string;
}

const EventCard = ({
  headline,
  supportingText,
  datePublished,
  contentPublished,
}: EventCardProps) => {
  return (
    <div className="bg-ecos-blue flex h-[443px] max-h-[443px] max-w-[500px] min-w-[337px] flex-col items-start rounded-[20px] px-4 py-[18px]">
      <div className="flex items-start gap-6 py-4">
        <img src={img} alt="imagen" className="h-auto min-w-[159px] rounded-[28px]" />
        <div className="flex flex-col items-start gap-6 text-white">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-xl">{headline}</h2>
            <h4 className="font-medium">{supportingText}</h4>
          </div>
          <Button className="bg-ecos-orange-light text-ecos-blue cursor-pointer gap-2 px-[24px] py-[10px]">
            Ver más
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-start gap-2 py-2 text-white">
        <h5 className="font-medium">{datePublished.toLocaleDateString()}</h5>
        <p className="text-left text-balance">{contentPublished}</p>
      </div>
    </div>
  );
};

export default EventCard;
