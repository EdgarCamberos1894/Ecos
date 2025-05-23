import Hero from "@/home/components/sections/Hero";
import OptionsRegister from "@/home/components/sections/OptionsRegister";
import FeaturedArtists from "./components/sections/FeaturedArtists";
import UpcomingEvents from "./components/sections/UpcomingEvents";
import FAQList from "./components/sections/FAQList";
import DiscoverArtist from "./components/sections/DiscoverArtist";
import BannerGuitarsRegister from "./components/sections/BannerGuitarsRegister";
import { useLocation } from "react-router";
import { useEffect } from "react";

export const HomePage = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const section = document.getElementById(location.hash.slice(1));
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <main className="content-center">
      <Hero />
      <div className="space-y-24">
        <OptionsRegister />
        <DiscoverArtist />
        <FeaturedArtists />
        <UpcomingEvents />
        <FAQList />
        <BannerGuitarsRegister />
      </div>
    </main>
  );
};
