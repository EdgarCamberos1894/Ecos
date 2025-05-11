import { Link } from "react-router";
import { CalendarPlus } from "../../profiles/components/ui/CalendarPlus";

export default function CreateEventoCard() {
  return (
    <div className="max-w-md rounded-xl bg-gray-100 p-6">
      <h2 className="text-2xl font-semibold text-gray-800">Crear un evento en Ecos</h2>
      <p className="mt-2 text-gray-600">
        ¿Tienes un evento, show o actividad? Cargá tu evento, gestioná todo en un solo lugar y ganá
        visibilidad.
      </p>
      <div className="mt-4">
        <Link
          to="/event"
          className="inline-flex items-center gap-2 rounded-md bg-gray-500 px-4 py-2 text-gray-800"
        >
          <CalendarPlus className="h-5 w-5 fill-gray-800" />
          Crear evento
        </Link>
      </div>
    </div>
  );
}
