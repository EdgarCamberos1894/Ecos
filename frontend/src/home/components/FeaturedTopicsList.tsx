import CardTopicsList from "./CardTopicsList";
import { ArrowRightIcon } from "@/home/components/ui/ArrowRightIcon";
import MenuIcon from "@/assets/hamburgerMenu.svg?react";
import Lens from "@/assets/lens.svg?react";
import Button from "@/app/ui/Button";
import { CheckIcon } from "@/home/components/ui/CheckIcon";
import Input from "@/app/ui/Input";

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
    <section className="w-full">
      <h1 className="mb-12 text-center text-2xl font-semibold text-[#19233A] sm:text-4xl lg:text-5xl">
        Encuentra tu artista favorito
      </h1>
      <div className="container mx-auto w-full px-4 pb-6">
        <Input
          placeholder="Busca Artista, Album, Canción"
          className="mx-auto flex w-full bg-[#ECE6F0] sm:w-4/5"
          startIcon={<MenuIcon />}
          endIcon={<Lens />}
        />
      </div>

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

      <div className="mx-36 mt-20 hidden lg:flex lg:justify-center">
        <Button type="submit" className="rounded bg-[#19233A] text-white lg:w-96">
          <span className="hidden items-center lg:flex">
            <CheckIcon className="mr-2 text-white" />
            Ver más
          </span>
        </Button>
      </div>
    </section>
  );
};

export default FeaturedTopicsList;
