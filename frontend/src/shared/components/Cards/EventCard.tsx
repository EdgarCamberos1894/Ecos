import img from "@/assets/image.webp";

interface EventCardProps {
  image?: string;
  category: string;
  stageName: string;
  supportingText: string;
  datePublished: string;
  contentPublished: string;
}

const EventCard = ({
  image,
  category,
  stageName,
  supportingText,
  datePublished,
  contentPublished,
}: EventCardProps) => {
  const date = new Date(datePublished);
  const formatted = new Intl.DateTimeFormat("es-LA", {
    day: "numeric",
    month: "long",
  }).format(date);

  return (
    <div className="bg-ecos-blue flex h-auto max-h-[423px] min-h-[379px] w-full max-w-[496px] min-w-[354px] flex-col items-start rounded-[20px] px-4 py-[18px]">
      <div className="flex w-full items-start gap-6 py-4">
        <div className="flex w-full max-w-[255px] min-w-[120px] flex-shrink">
          <img src={image ?? img} alt="imagen" className="aspect-square w-full rounded-[50px]" />
        </div>

        <div className="flex min-w-[110px] flex-auto flex-col items-start gap-6 text-white">
          <div className="flex flex-col items-start gap-1">
            <h2 className="text-2xl font-normal">{stageName}</h2>
            <h4 className="text-base font-medium">{supportingText}</h4>
          </div>
          <button
            type="button"
            className="bg-ecos-orange-light text-ecos-blue h-10 cursor-pointer rounded-[20px] px-6 py-2.5 text-sm font-medium"
          >
            Ver más
          </button>
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 py-2 text-white">
        <h5 className="text-[11px] font-medium">{`${category} - ${formatted}`}</h5>
        <p className="line-clamp-3 text-sm leading-5 font-normal tracking-[0.25px] text-balance">
          {contentPublished}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
