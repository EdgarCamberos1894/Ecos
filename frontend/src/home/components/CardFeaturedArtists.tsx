import imageArtista1 from "@/assets/imageArtista1.png";
import imageArtista2 from "@/assets/imageArtista2.png";
import imageArtista3 from "@/assets/imageArtista3.png";
import imageArtista4 from "@/assets/imageArtista4.png";

const favoriteArtistList = [
  {
    id: 1,
    image: imageArtista1,
    title: "ARTISTA",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 2,
    image: imageArtista2,
    title: "ARTISTA",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 3,
    image: imageArtista3,
    title: "ARTISTA",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    id: 4,
    image: imageArtista4,
    title: "ARTISTA",
    date: "Published date",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\n Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
];

const CardFeaturedArtists = () => {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:grid-rows-2">
      {favoriteArtistList.map(({ id, image, title, date, description }) => (
        <div key={id} className="flex gap-4 rounded-lg px-6 py-2">
          <img src={image} alt="image" className="h-42 w-42 rounded-xl" />

          <div className="flex flex-col gap-4 text-start">
            <div className="flex flex-col gap-1">
              <h3 className="text-2xl font-semibold">{title}</h3>
              <p className="text-xs text-[#49454F]">{date}</p>
              <p className="line-clamp-7 text-sm whitespace-pre-line text-gray-600">
                {description}
              </p>
            </div>
            <button
              type="submit"
              className="max-w-max rounded-[27px] bg-[#FE963D] px-6 py-2 lg:flex"
            >
              Ver más
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardFeaturedArtists;
