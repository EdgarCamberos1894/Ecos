import imageEvento1 from "@/assets/imageEvento1.jpg";
import imageEvento2 from "@/assets/imageEvento2.jpg";
import imageEvento3 from "@/assets/imageEvento3.jpg";

const upcomingEventsList = [
  {
    id: 1,
    image: imageEvento1,
    title: "EVENTO",
    supporting: "supporting text",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    image: imageEvento2,
    title: "EVENTO",
    supporting: "supporting text",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    image: imageEvento3,
    title: "EVENTO",
    supporting: "supporting text",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const CardUpcomingEvents = () => {
  return (
    <div className="gap-4 lg:flex lg:flex-row lg:gap-10">
      {upcomingEventsList.map(({ id, image, title, supporting, date, description }) => (
        <div
          key={id}
          className="mb-6 flex flex-col gap-6 bg-[#19233A] p-4 sm:mx-auto sm:w-3/5 lg:max-w-md"
        >
          <div className="flex gap-6 text-start">
            <img src={image} alt="image" className="h-48 w-48 rounded-xl" />
            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-1">
                <h3 className="text-2xl text-white">{title}</h3>
                <p className="line-clamp-7 text-sm font-semibold whitespace-pre-line text-white">
                  {supporting}
                </p>
              </header>
              <button
                type="submit"
                className="mt-4 w-24 rounded-[27px] bg-[#FE963D] px-4 py-2 text-white"
              >
                Download
              </button>
            </div>
          </div>
          <footer className="flex flex-col gap-1 p-1">
            <p className="mx-4 text-xs text-white">{date}</p>
            <p className="mx-auto line-clamp-7 text-lg whitespace-pre-line text-white">
              {description}
            </p>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default CardUpcomingEvents;
