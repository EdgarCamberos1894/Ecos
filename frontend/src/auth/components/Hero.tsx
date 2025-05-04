export default function Hero() {
  return (
    <div className="flex h-216 w-full flex-col justify-start bg-[url('@/assets/imageBanner.webp')] bg-cover bg-center">
      <div className="ms-48 w-120">
        <h1 className="mt-38 text-start font-sans text-[42px] leading-14 font-bold">
          Bienvenidos a Ecos
          <br />
          tu plataforma
          <br />
          musical ideal
        </h1>
        <p className="mt-4 text-start text-[14px]">
          Descubre un mundo lleno de música y creatividad. Únete a
          <br />
          nosotros para compartir tu arte y conectar con otros amantes
          <br />
          de la música
        </p>
        <div className="mt-6 flex gap-12">
          <button type="submit" className="h-10 w-32 rounded-3xl bg-[#707070] text-sm text-white">
            Registrate
          </button>
          <button type="submit" className="h-10 w-32 rounded-3xl bg-[#B1B1B1] text-sm text-white">
            Explora
          </button>
        </div>
      </div>
    </div>
  );
}
