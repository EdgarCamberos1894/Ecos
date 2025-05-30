import { useEffect } from "react";
import { useLocation } from "react-router";
import ImageBanner from "@/assets/bannerProfileFan.webp";
import FavoriteSongList from "./components/FavoriteSongList";
import FeaturedArtists from "@/home/components/sections/FeaturedArtists";
import UpcomingEvents from "@/home/components/sections/UpcomingEvents";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import MusicSearch from "@/app/components/MusicSearch";

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
    <div className="bg-ecos-base-2 flex w-screen flex-col items-center space-y-20">
      <img src={ImageBanner} alt="banner" className="w-full object-cover" />

      <div className="w-full space-y-20 px-4 md:px-18 lg:px-40">
        <div className="text-ecos-blue">
          <h1 className="mb-2 text-start text-4xl font-medium sm:text-5xl">¡BIENVENIDO!</h1>
          <h3 className="text-2xl sm:text-3xl">{user.name}</h3>
        </div>

        <FavoriteSongList />
        <MusicSearch />

        <FeaturedArtists />
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default ProfileFanPage;
