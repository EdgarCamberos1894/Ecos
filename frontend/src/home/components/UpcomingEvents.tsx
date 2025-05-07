import Button from "@/app/ui/Button";
import CardUpcomingEvents from "./CardUpcomingEvents";
import { CheckIcon } from "@/home/components/ui/CheckIcon";

const UpcomingEvents = () => {
  return (
    <section className="ms-52 mt-24 max-w-[1920px]">
      <h2 className="mb-8 text-start font-[roboto] text-[40px]">Próximos Eventos</h2>

      <CardUpcomingEvents />

      <div className="mt-8 h-[75px] w-[144px]">
        <Button type="submit" className="rounded-l-none">
          <span className="flex items-center">
            <CheckIcon className="mr-2" />
            Ver más
          </span>
        </Button>
      </div>
    </section>
  );
};

export default UpcomingEvents;
