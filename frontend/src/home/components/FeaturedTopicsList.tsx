import { HamburgerIcon } from "@/auth/components/ui/HamburgerIcon";
import CardTopicsList from "./CardTopicsList";
import { SearchIcon } from "@/auth/components/ui/SearchIcon";
import { ArrowRightIcon } from "@/auth/components/ui/ArrowRightIcon";
import Button from "@/app/ui/Button";
import { CheckIcon } from "@/auth/components/ui/CheckIcon";

const FeaturedTopicsList = () => {
  return (
    <section className="ms-52 mt-24 max-w-[1920px]">
      <h1 className="mb-4 text-center font-[roboto] text-[40px] font-semibold">
        Encuentra tu artista favorito
      </h1>

      <div className="mb-6 flex justify-center">
        <div className="relative w-full max-w-[720px]">
          <input
            type="text"
            placeholder="Busca Artista, Álbum, Canción"
            className="w-full rounded-full bg-gray-100 py-2 pr-4 pl-12 text-sm focus:outline-none"
          />
          <span className="absolute top-1 left-3 text-gray-400">
            <HamburgerIcon />
          </span>
          <span className="absolute top-1 right-3 text-gray-400">
            <SearchIcon />
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <h2 className="mb-4 text-start font-[roboto] text-2xl lg:text-[40px]">Temas destacados</h2>
        <div className="flex flex-col gap-8 lg:grid lg:grid-cols-3">
          <div className="w-full">
            <div className="flex gap-2 pl-4">
              <h2>Section title</h2>
              <span>
                <ArrowRightIcon />
              </span>
            </div>
            <CardTopicsList />
          </div>
          <div>
            <div className="flex gap-2 pl-4">
              <h2>Section title</h2>
              <span>
                <ArrowRightIcon />
              </span>
            </div>
            <CardTopicsList />
          </div>
          <div>
            <div className="flex gap-2 pl-4">
              <h2>Section title</h2>
              <span>
                <ArrowRightIcon />
              </span>
            </div>
            <CardTopicsList />
          </div>
        </div>
      </div>

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

export default FeaturedTopicsList;
