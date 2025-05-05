import Hero from "@/home/components/Hero";
import OptionsRegister from "@/home/components/OptionsRegister";
import FeaturedTopicsList from "./components/FeaturedTopicsList";
import FeaturedArtists from "./components/FeaturedArtists";
import UpcomingEvents from "./components/UpcomingEvents";

export const HomePage = () => {
  return (
    <main className="content-center">
      <Hero />
      <OptionsRegister />
      <FeaturedTopicsList />
      <FeaturedArtists />
      <UpcomingEvents />
    </main>
  );
};
