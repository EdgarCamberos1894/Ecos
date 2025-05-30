import ImageBanner from "@/assets/bannerProfileFan.webp";
import UpcomingEvents from "@/home/components/sections/UpcomingEvents";

const FanEventsPage = () => {
  return (
    <div className="bg-ecos-base-2 flex w-screen flex-col items-center space-y-20">
      <img src={ImageBanner} alt="banner" className="w-full object-cover" />
      <div className="px-sections w-full">
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default FanEventsPage;
