import Button from "@/app/ui/Button";
import CardUpcomingEvents from "./CardUpcomingEvents";
import { CheckIcon } from "@/home/components/ui/CheckIcon";

const UpcomingEvents = () => {
  return (
    <section className="mt-24 w-full lg:mx-auto lg:w-4/5">
      <h2 className="text[#19233A] m-8 text-start text-5xl lg:mb-24">Próximos Eventos</h2>

      <CardUpcomingEvents />

      <div className="mx-auto mt-8 h-12 w-52 lg:w-96">
        <Button type="submit" className="rounded bg-[#19233A] text-white lg:w-96">
          <span className="flex items-center">
            <CheckIcon className="mr-2 text-white" />
            Ver más
          </span>
        </Button>
      </div>
    </section>
  );
};

export default UpcomingEvents;
