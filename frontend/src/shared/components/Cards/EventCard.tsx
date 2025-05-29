import Button from "@/app/ui/Button";
import img from "@/assets/image.webp";
import { useNavigate } from "react-router";

interface EventCardProps {
  id: number;
  image?: string;
  category: string;
  stageName: string;
  supportingText: string;
  datePublished: string;
  contentPublished: string;
}

const EventCard = ({
  id,
  image,
  category,
  stageName,
  supportingText,
  datePublished,
  contentPublished,
}: EventCardProps) => {
  const navigate = useNavigate();

  const date = new Date(datePublished);
  const formatted = new Intl.DateTimeFormat("es-LA", {
    day: "numeric",
    month: "long",
  }).format(date);

  return (
    <article
      className="text-ecos-blue flex h-[22.5rem] w-[22.688rem] flex-col gap-[1.125rem] rounded-[1.25rem] shadow-[0px_4px_4px_rgba(0,0,0,0.25)]"
      aria-label={`Evento de ${stageName}`}
    >
      <header className="flex h-[11.438rem] w-full gap-6 px-4 py-[1.125rem]">
        <figure className="flex-shrink-0">
          <img
            src={image ?? img}
            alt={`Evento ${supportingText} de ${stageName}`}
            className="aspect-square h-[10.688rem] w-[10.563rem] rounded-[1.75rem] object-cover"
          />
        </figure>
        <div className="flex h-[11rem] flex-1 flex-col justify-between">
          <div>
            <h2 className="text-2xl leading-tight font-semibold">{stageName}</h2>
            <h3 className="mb-4 text-base font-medium">{supportingText}</h3>
          </div>
          <Button
            type="button"
            bgType="primary"
            aria-label={`Ver evento de ${stageName}`}
            onClick={() => navigate(`/event/${id.toString()}`)}
            className="px-8 text-sm"
          >
            Ver evento
          </Button>
        </div>
      </header>

      <section className="flex h-[7.813rem] flex-col items-start gap-2 px-4 py-2">
        <p className="font-medium">{`${category} - ${formatted}`}</p>
        <p className="line-clamp-3 text-sm leading-5 font-normal tracking-[0.016rem] text-balance">
          {contentPublished}
        </p>
      </section>
    </article>
  );
};

export default EventCard;
