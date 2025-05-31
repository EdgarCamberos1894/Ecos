import { Link } from "react-router";
import { CalendarPlus } from "@/app/ui/Icons";

export default function CreateEventoCard() {
  return (
    <section className="bg-ecos-media-embed flex min-h-[259px] max-w-[762px] flex-col justify-center gap-11 rounded-[20px] px-6 pt-[51px] pb-[37px] md:px-14">
      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-semibold text-gray-800">Crear un evento en Ecos</h2>
        <p className="text-balance text-gray-600">
          ¿Tienes un evento, show o actividad? <br />
          Carga tu evento, gestiona todo desde un solo lugar y gana visibilidad.
        </p>
      </div>
      <div>
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
