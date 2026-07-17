import { Link } from "react-router";
import { CalendarPlus } from "@/app/ui/Icons";

export default function CreateEventoCard() {
  return (
    <section className="bg-ecos-blue flex flex-col justify-between rounded-lg border border-slate-200 px-5 py-6 text-white shadow-sm sm:px-6">
      <div>
        <p className="text-ecos-orange-light text-xs font-bold tracking-[0.16em] uppercase">
          En vivo
        </p>
        <h2 className="font-nunito mt-2 text-2xl font-bold">Crea un evento en Ecos</h2>
        <p className="mt-3 text-sm leading-6 text-white/75">
          ¿Tienes un evento, show o actividad? <br />
          Carga tu evento, gestiona todo desde un solo lugar y gana visibilidad.
        </p>
      </div>
      <div className="mt-6">
        <Link
          to="/event"
          className="button-primary inline-flex items-center gap-2 px-5 py-2 text-sm"
        >
          <CalendarPlus className="size-5 fill-white" />
          Crear evento
        </Link>
      </div>
    </section>
  );
}
