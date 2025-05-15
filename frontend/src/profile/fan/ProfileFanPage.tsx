import ImageBanner from "@/assets/bannerProfileFan.webp";
import FavoriteSongList from "./components/FavoriteSongList";
import FeaturedArtists from "@/home/components/sections/FeaturedArtists";
import FeaturedTopicsList from "@/home/components/FeaturedTopicsList";
import UpcomingEvents from "@/home/components/sections/UpcomingEvents";
import { useRequiredUser } from "@/auth/hooks/use-required-user";

const ProfileFanPage = () => {
  const user = useRequiredUser();

  return (
    <div className="flex w-full flex-col items-center gap-24 px-2.5 lg:px-0">
      <img src={ImageBanner} alt="banner" className="w-full object-cover" />

      <div className="w-full lg:w-4/6">
        <h1 className="mb-2 text-start text-4xl font-medium sm:text-5xl">¡BIENVENIDO!</h1>
        <h3 className="text-2xl sm:text-3xl">{user.name}</h3>
      </div>

      <FavoriteSongList />
      <FeaturedTopicsList />
      <FeaturedArtists />
      <UpcomingEvents />
    </div>
  );
};

export default ProfileFanPage;
