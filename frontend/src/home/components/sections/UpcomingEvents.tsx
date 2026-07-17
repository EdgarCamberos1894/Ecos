import { useApiQuery } from "@/shared/hooks/use-api-query";
import { ApiEvents } from "@/profile/musician/musician-types";
import EventCard from "@/shared/components/Cards/EventCard";

const UpcomingEvents = () => {
  const { data: events } = useApiQuery<ApiEvents>("events", `events/search`);

  return (
    <section id="eventos" className="space-y-6">
      <h2 className="subtitles text-start">Próximos Eventos</h2>

      {events?.items.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {events.items.map((event) => (
            <EventCard
              key={event.id}
              id={event.id}
              image={event.image}
              stageName={event.musician.stageName ?? ""}
              category={event.category}
              supportingText={event.name}
              datePublished={event.date}
              contentPublished={event.description}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-slate-300 bg-white/60 px-5 py-6 text-sm text-slate-600">
          Aun no hay eventos publicados.
        </p>
      )}
    </section>
  );
};

export default UpcomingEvents;
