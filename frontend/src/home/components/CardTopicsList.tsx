import { PlayIcon } from "@/auth/components/ui/PlayIcon";
import { PlusCircle } from "@/auth/components/ui/PlusCircle";
import media from "@/assets/media.webp";

const favoriteList = [
  {
    id: 1,
    image: media,
    title: "Title",
    description: "Description duis aute irure dolor in reprehenderit in voluptate velit.",
    icon1: <PlusCircle />,
    date: "Today",
    time: "23 min",
    icon2: <PlayIcon />,
  },
  {
    id: 2,
    image: media,
    title: "Title",
    description: "Description duis aute irure dolor in reprehenderit in voluptate velit.",
    icon1: <PlusCircle />,
    date: "Today",
    time: "23 min",
    icon2: <PlayIcon />,
  },
  {
    id: 3,
    image: media,
    title: "Title",
    description: "Description duis aute irure dolor in reprehenderit in voluptate velit.",
    icon1: <PlusCircle />,
    date: "Today",
    time: "23 min",
    icon2: <PlayIcon />,
  },
];

const CardTopicsList = () => {
  return (
    <div className="mx-auto w-full space-y-4 sm:w-auto">
      {favoriteList.map((item) => (
        <div
          key={item.id}
          className="flex w-full max-w-[611px] items-start gap-4 rounded-lg bg-gray-50 p-4 sm:w-full"
        >
          <div className="h-21 w-21 flex-shrink-0 rounded-xl">
            <img src={item.image} alt="image" className="h-21 w-21 rounded-xl" />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <h3 className="text-start text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-600">{item.description}</p>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <span>{item.icon1}</span>
                <span>{item.date}</span>
                <span>{item.time}</span>
              </div>
              <span>{item.icon2}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardTopicsList;
