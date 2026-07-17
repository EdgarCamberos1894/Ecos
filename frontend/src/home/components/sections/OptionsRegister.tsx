import OptionsRegisterCards from "@/shared/components/Cards/OptionsRegisterCards";
import iconoM from "@/assets/iconoM.svg";
import iconoF from "@/assets/iconoF.svg";
import iconoE from "@/assets/iconoE.svg";
import womenDj from "@/assets/womenDj.webp";
import celuFestival from "@/assets/celuFestival.webp";
import chicaAtractiva from "@/assets/chicaAtractiva.webp";

export default function OptionsRegister() {
  const cardsData = [
    {
      id: "musicos",
      icono: iconoM,
      option: "MUSICOS",
      description: "Artistas independientes y emergentes",
      imageSrc: womenDj,
      title: "Haz que tu proyecto se escuche",
      parrafo:
        "Comparte tu musica, encuentra oportunidades y conecta con una audiencia que quiere descubrir algo nuevo.",
      parrafo2: "Tu perfil, tus lanzamientos, tu escenario.",
      buttonText: "Soy musico",
    },
    {
      id: "fans",
      icono: iconoF,
      option: "FANS",
      description: "Mas que seguidores, comunidad",
      imageSrc: chicaAtractiva,
      title: "Encuentra tu proximo artista favorito",
      parrafo:
        "Sigue nuevas voces, guarda canciones y mantente cerca de los proyectos que te mueven.",
      parrafo2: "Cada escucha hace crecer una escena.",
      buttonText: "Soy fan",
    },
    {
      id: "eventos",
      icono: iconoE,
      option: "EVENTOS",
      description: "La musica sucede en vivo",
      imageSrc: celuFestival,
      title: "No te pierdas lo que sigue",
      parrafo:
        "Conciertos y encuentros donde los artistas independientes convierten una noche en una historia.",
      parrafo2: "Mira la agenda y arma tu plan.",
      buttonText: "Ver eventos",
    },
  ];

  return (
    <section className="px-sections mx-auto w-full max-w-screen-xl py-14 md:py-20">
      <div className="mb-8 max-w-2xl space-y-4 md:mb-10">
        <p className="text-ecos-orange text-sm font-bold tracking-[0.16em] uppercase">
          Una escena, tres formas de vivirla
        </p>
        <h2 className="font-nunito text-ecos-blue text-3xl leading-tight font-bold md:text-5xl">
          Ecos conecta a quienes crean, escuchan y hacen que la musica ocurra.
        </h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {cardsData.map((data) => (
          <OptionsRegisterCards key={data.id} {...data} />
        ))}
      </div>
    </section>
  );
}
