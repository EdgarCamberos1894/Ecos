import { useApiQuery } from "@/shared/hooks/use-api-query";
import { ApiEvents } from "@/profile/musician/musician-types";
import EventCard from "@/shared/components/Cards/EventCard";

const UpcomingEvents = () => {
  const { data: events } = useApiQuery<ApiEvents>("events", `events/search`);

  return (
    <section id="#eventos" className="w-full">
      <h2 className="subtitles my-8 text-start lg:mb-24">Próximos Eventos</h2>

      <div className="grid grid-cols-1 gap-4 md:space-y-[3.563rem] lg:grid-cols-3 lg:gap-[3.563rem]">
        {events?.items.map((event) => (
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
    </section>
  );
};

export default UpcomingEvents;
