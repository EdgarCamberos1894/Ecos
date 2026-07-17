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
      className="text-ecos-blue group flex min-h-[26rem] w-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl"
      aria-label={`Evento de ${stageName}`}
    >
      <header className="bg-ecos-blue relative h-48 overflow-hidden sm:h-56">
        <figure className="h-full w-full">
          <img
            src={image ?? img}
            alt={`Evento ${supportingText} de ${stageName}`}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </figure>
        <div className="bg-ecos-blue/25 absolute inset-0" />
        <p className="text-ecos-blue absolute top-4 left-4 bg-white px-3 py-1.5 text-xs font-bold tracking-[0.12em] uppercase shadow-sm">
          {formatted}
        </p>
      </header>

      <section className="flex flex-1 flex-col items-start px-5 py-5 sm:px-6 sm:py-6">
        <p className="text-ecos-orange text-xs font-bold tracking-[0.14em] uppercase">{category}</p>
        <h2 className="font-nunito mt-2 text-2xl leading-tight font-bold">{stageName}</h2>
        <h3 className="mt-1 text-base font-semibold text-slate-700">{supportingText}</h3>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{contentPublished}</p>
        <Button
          type="button"
          bgType="primary"
          aria-label={`Ver evento de ${stageName}`}
          onClick={() => navigate(`/event/${id.toString()}`)}
          className="mt-auto w-full text-sm sm:w-auto sm:px-8"
        >
          Ver evento
        </Button>
      </section>
    </article>
  );
};

export default EventCard;
