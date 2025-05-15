import CardTopicsList from "./CardTopicsList";
import { ArrowRightIcon } from "@/home/components/ui/ArrowRightIcon";

const SECTIONS = [
  {
    id: 1,
    title: "Section title",
  },
  {
    id: 2,
    title: "Section title",
  },
  {
    id: 3,
    title: "Section title",
  },
];

const FeaturedTopicsList = () => {
  return (
    <div className="mx-auto flex flex-col gap-4 sm:mx-36">
      <h2 className="mx-2 mb-4 text-start text-3xl font-bold text-[#19233A]">Temas destacados</h2>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-2">
        {SECTIONS.map(({ id, title }) => (
          <div key={id}>
            <div className="flex gap-2 pl-4">
              <h2>{title}</h2>
              <span>
                <ArrowRightIcon />
              </span>
            </div>
            <CardTopicsList />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedTopicsList;
