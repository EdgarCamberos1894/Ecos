import CardPlay from "./components/CardPlay";
import ImageBanner from "../assets/imageBanner.webp";

const PlayPage = () => {
  return (
    <>
      <header className="flex h-[696px] items-center justify-center bg-[#D9D9D9]">
        <img src={ImageBanner} alt="banner" />
      </header>
      <main className="ms-52 mt-24 mb-[6em] max-w-[1920px] py-[4em]">
        <h3 className="mb-[6em] font-[roboto] text-3xl font-medium">DALE PLAY A TU DÍA</h3>
        <CardPlay />
      </main>
    </>
  );
};

export default PlayPage;
