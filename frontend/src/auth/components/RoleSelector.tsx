import fanImage from "@/assets/fan.webp";
import musicianImage from "@/assets/musician.webp";
import Button from "@/app/ui/Button";

const ROLES = ["MUSICIAN", "FAN"] as const;

const DESCRIPTIONS: Record<(typeof ROLES)[number], string> = {
  MUSICIAN: "Promociona tu música, encuentra oportunidades y conecta con tu audiencia.",
  FAN: "Descubre artistas emergentes, asiste a eventos exclusivos y apoya directamente a tus favoritos.",
};

interface RoleSelectorProps {
  onSelectRole: (role: string) => void;
}

const RoleSelector = ({ onSelectRole }: RoleSelectorProps) => {
  return (
    <div className="m-auto flex h-full max-h-[500px] w-full flex-col items-center justify-center gap-4 p-5 text-center md:gap-8">
      {ROLES.map((role) => (
        <div
          key={role}
          className="flex w-full flex-row items-center justify-around gap-6 sm:gap-12 md:w-4/5"
        >
          <img
            src={role === "MUSICIAN" ? musicianImage : fanImage}
            alt={role === "MUSICIAN" ? "Músico" : "Fan"}
            className="h-[120px] w-[120px] rounded-[16px] object-cover"
          />
          <div className="flex w-full flex-col items-start justify-between gap-4">
            <Button
              type="button"
              className="w-full border bg-transparent font-bold"
              onClick={() => {
                onSelectRole(role);
              }}
            >
              Registrate como {role === "MUSICIAN" ? "Músico" : "Fan"}
            </Button>
            <p className="text-justify break-words text-[#49454F]">{DESCRIPTIONS[role]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleSelector;
