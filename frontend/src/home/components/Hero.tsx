export default function Hero() {
  return (
    <div className="flex h-auto w-full flex-col justify-start bg-[url('@/assets/imageBannerHero.png')] bg-cover bg-center pb-48 sm:pb-64 lg:h-248">
      <div className="ms-12 mt-20 w-auto md:ms-24 lg:ms-36 lg:w-120">
        <h1 className="w-80 text-start font-sans text-3xl leading-14 font-bold text-white drop-shadow-lg sm:w-138 sm:text-4xl lg:w-112 lg:text-5xl">
          Bienvenidos a Ecos tu plataforma musical ideal
        </h1>
        <p className="mt-4 w-80 text-start text-sm text-white sm:w-128 lg:w-112 lg:text-lg">
          Descubre un mundo lleno de música y creatividad. Únete a nosotros para compartir tu arte y
          conectar con otros amantes de la música
        </p>
        <div className="mt-6 flex gap-12">
          <button type="submit" className="h-12 w-32 rounded-3xl bg-[#19233A] text-sm text-white">
            Registrate
          </button>
          <button type="submit" className="h-12 w-32 rounded-3xl bg-[#FE963D] text-sm text-white">
            Explora
          </button>
        </div>
      </div>
    </div>
  );
}
