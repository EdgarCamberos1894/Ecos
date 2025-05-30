import OptionsRegisterCards from "@/shared/components/Cards/OptionsRegisterCards";
import iconoM from "@/assets/iconoM.svg";
import iconoF from "@/assets/iconoF.svg";
import iconoE from "@/assets/iconoE.svg";
import womenDj from "@/assets/womenDj.webp";
import celuFestival from "@/assets/celuFestival.webp";
import chicaAtractiva from "@/assets/chicaAtractiva.webp";
import Logo from "@/app/components/Logo";

export default function OptionsRegister() {
  const cardsData = [
    {
      id: "musicos",
      icono: iconoM,
      option: "MÚSICOS",
      description: "**Artistas independientes y emergentes**",
      imageSrc: womenDj,
      title: "Conquista tu escena musical",
      parrafo: "Promociona tu música, encuentra oportunidades y conecta con tu audiencia.",
      parrafo2: "Esta plataforma está diseñada para impulsar tu carrera.",
      buttonText: "Únete",
    },
    {
      id: "fans",
      icono: iconoF,
      option: "FANS",
      description: "**Más que seguidor, cómplice**",
      imageSrc: chicaAtractiva,
      title: "Lealtad en cada nota",
      parrafo: "Cada like, cada repetición, cada grito... es un latido compartido.",
      parrafo2: "Tu voz, nuestra bandera.",
      buttonText: "Regístrate",
    },
    {
      id: "eventos",
      icono: iconoE,
      option: "PRÓXIMOS EVENTOS",
      description: "**No te pierdas lo que viene**",
      imageSrc: celuFestival,
      title: "La fiesta comienza",
      parrafo:
        "Conciertos únicos: artistas independientes y emergentes creando magia musical en vivo.",
      parrafo2: "La música no espera, ¡únete al ritmo!",
      buttonText: "Ver eventos",
    },
  ];

  return (
    <section className="mx-auto mt-20 flex w-full flex-col gap-24 px-2 xl:max-w-[1610px]">
      <div className="text-ecos-blue space-y-2 px-4 text-start xl:px-0">
        <Logo textClassName="text-8xl" />
        <h2 className="text-4xl">Conectamos músicos, fans y eventos en una sola plataforma.</h2>
      </div>
      <div className="flex flex-col items-center justify-center gap-7.5 xl:flex-row xl:gap-6">
        {cardsData.map((data) => (
          <OptionsRegisterCards key={data.id} {...data} />
        ))}
      </div>
    </section>
  );
}
