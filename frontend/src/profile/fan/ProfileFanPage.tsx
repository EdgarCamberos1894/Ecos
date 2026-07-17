import { useEffect } from "react";
import { Link, useLocation } from "react-router";
import ImageBanner from "@/assets/bannerProfileFan.webp";
import FavoriteSongList from "./components/FavoriteSongList";
import FeaturedArtists from "@/home/components/sections/FeaturedArtists";
import UpcomingEvents from "@/home/components/sections/UpcomingEvents";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import MusicSearch from "@/app/components/MusicSearch";
import { ArrowRightIcon, CalendarIcon, Heart, SearchIcon } from "@/app/ui/Icons";

const ProfileFanPage = () => {
  const location = useLocation();
  const user = useRequiredUser();

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.slice(1));
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <main className="bg-ecos-base-2 min-h-screen overflow-x-hidden">
      <section className="bg-ecos-blue relative isolate overflow-hidden text-white">
        <img
          src={ImageBanner}
          alt="Personas disfrutando de musica en vivo"
          className="absolute inset-y-0 right-0 -z-10 hidden h-full w-[43%] object-cover lg:block"
        />
        <div className="mx-auto flex min-h-64 w-full max-w-screen-xl items-center px-4 py-10 sm:px-8 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-ecos-orange-light text-xs font-bold tracking-[0.16em] uppercase">
              Tu espacio como fan
            </p>
            <h1 className="font-nunito mt-3 text-3xl font-bold sm:text-4xl">Hola, {user.name}</h1>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Descubre artistas, guarda los lanzamientos que te acompanan y encuentra tu proximo
              evento.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#explorar"
                className="button-primary inline-flex items-center gap-2 px-4 py-2.5 text-sm"
              >
                Explorar musica <ArrowRightIcon className="size-4" />
              </a>
              <Link
                to="/fan/events"
                className="button-secondary hover:text-ecos-blue inline-flex items-center gap-2 border-white bg-transparent px-4 py-2.5 text-sm text-white hover:bg-white"
              >
                Ver eventos <CalendarIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-screen-xl gap-3 px-4 py-6 sm:grid-cols-3 sm:px-8 lg:px-10">
        <a
          href="#explorar"
          className="group text-ecos-blue hover:border-ecos-orange hover:bg-ecos-orange-light/20 flex items-center gap-4 border border-slate-200 bg-white p-4 transition-colors"
        >
          <span className="bg-ecos-blue flex size-10 shrink-0 items-center justify-center text-white">
            <SearchIcon className="size-5" />
          </span>
          <span>
            <strong className="block text-sm">Descubre musica</strong>
            <span className="mt-1 block text-xs text-slate-600">Busca artistas y canciones.</span>
          </span>
        </a>
        <a
          href="#favoritos"
          className="group text-ecos-blue hover:border-ecos-orange hover:bg-ecos-orange-light/20 flex items-center gap-4 border border-slate-200 bg-white p-4 transition-colors"
        >
          <span className="bg-ecos-orange text-ecos-blue flex size-10 shrink-0 items-center justify-center">
            <Heart className="size-5" />
          </span>
          <span>
            <strong className="block text-sm">Tu coleccion</strong>
            <span className="mt-1 block text-xs text-slate-600">Retoma tus favoritos.</span>
          </span>
        </a>
        <Link
          to="/fan/events"
          className="group text-ecos-blue hover:border-ecos-orange hover:bg-ecos-orange-light/20 flex items-center gap-4 border border-slate-200 bg-white p-4 transition-colors"
        >
          <span className="flex size-10 shrink-0 items-center justify-center bg-slate-100">
            <CalendarIcon />
          </span>
          <span>
            <strong className="block text-sm">Agenda en vivo</strong>
            <span className="mt-1 block text-xs text-slate-600">Conoce los proximos eventos.</span>
          </span>
        </Link>
      </section>

      <div className="mx-auto w-full max-w-screen-xl space-y-12 px-4 pb-14 sm:px-8 lg:px-10">
        <FavoriteSongList />
        <MusicSearch />
        <FeaturedArtists />
        <UpcomingEvents />
      </div>
    </main>
  );
};

export default ProfileFanPage;
