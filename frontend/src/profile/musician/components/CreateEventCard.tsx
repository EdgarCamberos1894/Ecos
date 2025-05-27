import { Link } from "react-router";
import { CalendarPlus } from "../../components/ui/Icons";

export default function CreateEventoCard() {
  return (
    <section className="bg-ecos-media-embed max-w-md rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Crear un evento en Ecos</h2>
      <p className="mt-2 text-gray-600">
        ¿Tienes un evento, show o actividad? Cargá tu evento, gestioná todo en un solo lugar y ganá
        visibilidad.
      </p>
      <div className="mt-4">
        <Link
          to="/event"
          className="bg-ecos-blue inline-flex w-[190px] items-center justify-center gap-2.5 rounded-[40px] py-[5px] text-white"
        >
          <CalendarPlus className="size-[30px] fill-white" />
          Crear evento
        </Link>
      </div>
    </section>
  );
}
