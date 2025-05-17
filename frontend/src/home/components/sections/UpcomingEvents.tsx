import Button from "@/app/ui/Button";
import CardUpcomingEvents from "../CardUpcomingEvents";
import { CheckIcon } from "@/home/components/ui/CheckIcon";

const UpcomingEvents = () => {
  return (
    <section id="#eventos" className="w-full max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <h2 className="my-8 text-start text-5xl text-[#19233A] lg:mb-24">Próximos Eventos</h2>

      <CardUpcomingEvents />

      <div className="mx-auto mt-8 w-52 sm:w-64 md:w-72 lg:w-96">
        <Button type="submit" className="w-full rounded bg-[#19233A] text-white">
          <span className="flex items-center justify-center">
            <CheckIcon className="mr-2 text-white" />
            Ver más
          </span>
        </Button>
      </div>
    </section>
  );
};

export default UpcomingEvents;
