import image from "@/assets/image.webp";

const upcomingEventsList = [
  {
    id: 1,
    image: image,
    title: "EVENTO",
    supporting: "supporting text",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    image: image,
    title: "EVENTO",
    supporting: "supporting text",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    image: image,
    title: "EVENTO",
    supporting: "supporting text",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const CardUpcomingEvents = () => {
  return (
    <div className="flex gap-6">
      {upcomingEventsList.map(({ id, image, title, supporting, date, description }) => (
        <div
          key={id}
          className="flex h-[439px] max-w-[493px] flex-col gap-6 rounded-lg bg-[#FEF7FF] px-6 py-2"
        >
          <div className="flex gap-6 px-4 py-4.5 text-start">
            <img src={image} alt="image" className="h-[216px] w-[216px] rounded-xl" />
            <div className="flex flex-col gap-6">
              <header className="flex flex-col gap-1">
                <h3 className="text-2xl">{title}</h3>
                <p className="line-clamp-7 text-sm font-semibold whitespace-pre-line text-gray-600">
                  {supporting}
                </p>
              </header>
              <button
                type="submit"
                className="mt-4 max-w-max rounded-[27px] bg-[#B4B4B4] px-6 py-2.5"
              >
                Ver más
              </button>
            </div>
          </div>
          <footer className="flex flex-col gap-2 px-4 py-2">
            <p className="text-xs text-[#49454F]">{date}</p>
            <p className="line-clamp-7 text-sm whitespace-pre-line text-gray-600">{description}</p>
          </footer>
        </div>
      ))}
    </div>
  );
};

export default CardUpcomingEvents;
