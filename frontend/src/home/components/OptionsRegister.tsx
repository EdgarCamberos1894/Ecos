import OptionsRegisterCards from "@/shared/components/Cards/OptionsRegisterCards";
import avatar from "@/assets/avatar.svg";
import media from "@/assets/media.webp";

export default function OptionsRegister() {
  const cardsData = [
    {
      id: "musicos",
      icono: avatar,
      option: "MÚSICOS",
      description: "**Artistas independientes y emergentes**",
      imageSrc: media,
      title: "Conquista tu escena musical",
      subtitle: "Plataforma diseñada para impulsar tu carrera",
      parrafo: "Promociona tu música, encuentra oportunidades y conecta con tu audiencia.",
      buttonText: "Regístrate",
    },
    {
      id: "organizadores",
      icono: avatar,
      option: "ORGANIZADOR",
      description: "**Descubre y contrata el mejor talento musical**",
      imageSrc: media,
      title: "Crea eventos inolvidables",
      subtitle: "Conecta con músicos ideales para tu público",
      parrafo: "Encuentra talento, gestiona eventos y llena tus espacios con la mejor música.",
      buttonText: "Regístrate",
    },
    {
      id: "eventos",
      icono: avatar,
      option: "PRÓXIMOS EVENTOS",
      description: "Subhead",
      imageSrc: media,
      title: "title",
      subtitle: "subtitle",
      parrafo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      buttonText: "Explorar",
    },
  ];

  return (
    <div className="ms-52 mt-24 h-[984px] max-w-[1920px]">
      <div className="h-[189px] w-[684px] text-start text-3xl">
        <h2 className="text-5xl font-normal">
          Conectamos músicos, fans y
          <br />
          eventos en una sola plataforma
        </h2>
        <h2 className="mt-12 text-5xl font-bold">¡Empieza!</h2>
      </div>
      <div className="mt-32 flex gap-6">
        {cardsData.map((data) => (
          <OptionsRegisterCards key={data.id} {...data} />
        ))}
      </div>
    </div>
  );
}
