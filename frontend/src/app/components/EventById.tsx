import { useApiQuery } from "@/shared/hooks/use-api-query";
import { useParams } from "react-router";
import { type EventById as EventByIdType } from "../eventById-types";
import CalendarIcon from "@/event/components/ui/CalendarIcon";
import ClockIcon from "@/event/components/ui/ClockIcon";
import LocationIcon from "@/event/components/ui/LocationIcon";
import TicketIcon from "@/event/components/ui/TicketIcon";

export const EventById = () => {
  const { id } = useParams() as { id: string };

  const { data: event } = useApiQuery<EventByIdType>("events", `events/${id}`, id);

  return (
    <div className="p-2 md:p-4 xl:p-52">
      <section className="flex p-3 lg:pr-[77px] lg:pl-[23px]">
        <div className="border-ecos-blue flex flex-col gap-y-10 rounded-[50px] border-3 p-3 md:w-[807px] md:p-10 lg:w-full lg:px-[50px] lg:py-[38px]">
          {event?.image && (
            <header className="h-[297px] w-full md:h-[400px] lg:h-[594px]">
              <img
                src={event.image}
                alt="Imagen del evento"
                className="h-full w-full rounded-[50px] object-cover"
              />
            </header>
          )}
          <main className="flex flex-col gap-y-8 lg:gap-y-[80px] lg:pr-[271px]">
            <h2 className="text-center text-4xl font-extrabold md:text-start md:text-5xl">
              {event?.name}
            </h2>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-2xl font-bold md:text-[32px] lg:mb-7">Fecha y Hora</h3>
              <div className="flex items-center gap-x-5">
                <CalendarIcon />
                <p className="text-2xl font-semibold">{event?.date}</p>
              </div>
              <div className="flex items-center gap-x-5">
                <ClockIcon />
                <p className="text-2xl font-semibold">{event?.startTime}</p>
              </div>
              <button
                className="text-center text-xl font-semibold text-[#2C53AE] md:text-start lg:mt-5"
                type="button"
              >
                + Agregar a Calendario
              </button>
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-2xl font-bold md:text-[32px]">Lugar</h3>
              <div className="flex items-end gap-x-1">
                <LocationIcon className="h-[30px] w-[30px]" />
                <p className="text-2xl font-semibold">Dirección: </p>
                <span>{event?.location}</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-2xl font-bold md:text-[32px]">Información de las entradas</h3>
              <div className="flex items-center gap-x-1">
                <TicketIcon className="h-[30px] w-[30px]" />
                <div>
                  <p className="text-2xl font-semibold">Puntos de venta:</p>
                  {event?.tickets.map((ticket) => (
                    <div key={ticket.id} className="flex gap-x-4">
                      <p>{ticket.location}</p>
                      <span>$ {ticket.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-4">
              <h3 className="text-3xl font-bold">Descripción del Evento</h3>
              <p className="text-lg font-normal">{event?.description}</p>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
};
