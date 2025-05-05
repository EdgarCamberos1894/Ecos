import media from "@/assets/media.webp";

const favoriteArtistList = [
  {
    id: 1,
    image: media,
    title: "Headline",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua <br/> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum..",
  },
  {
    id: 2,
    image: media,
    title: "Headline",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 3,
    image: media,
    title: "Headline",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    id: 4,
    image: media,
    title: "Headline",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

const CardFeaturedArtists = () => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:gap-x-16 xl:gap-y-8">
      {favoriteArtistList.map((item) => (
        <div
          key={item.id}
          className="flex w-full max-w-[702px] flex-col gap-4 rounded-lg bg-gray-50 p-6 shadow-sm md:flex-row"
        >
          <div className="h-[112px] w-[112px] flex-shrink-0 overflow-hidden rounded-xl">
            <img src={item.image} alt="image" className="h-full w-full rounded-xl object-cover" />
          </div>
          <div className="flex flex-col justify-between gap-4 text-start">
            <header>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-xs text-[#49454F]">{item.date}</p>
            </header>
            <p className="flex-auto text-sm text-gray-600">{item.description}</p>
            <button type="submit" className="max-w-max rounded-[27px] px-6 py-2.5">
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardFeaturedArtists;
