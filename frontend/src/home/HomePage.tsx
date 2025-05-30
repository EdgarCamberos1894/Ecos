import Hero from "@/home/components/sections/Hero";
import OptionsRegister from "@/home/components/sections/OptionsRegister";
import FeaturedArtists from "./components/sections/FeaturedArtists";
import UpcomingEvents from "./components/sections/UpcomingEvents";
import FAQList from "./components/sections/FAQList";
import DiscoverArtist from "./components/sections/DiscoverArtist";
import BannerGuitarsRegister from "./components/sections/BannerGuitarsRegister";
import { useLocation } from "react-router";
import { useEffect } from "react";
import { useAuth } from "@/auth/hooks/use-auth";

export const HomePage = () => {
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.slice(1));
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <main className="content-center space-y-20">
      <Hero />
      {!user && <OptionsRegister />}
      <div className="bg-ecos-base-2 w-full">
        <div className="px-sections mx-auto w-full max-w-screen-xl space-y-20">
          <DiscoverArtist />
          <FeaturedArtists />
          <UpcomingEvents />
        </div>
      </div>
      <FAQList />
      {!user && <BannerGuitarsRegister />}
    </main>
  );
};
