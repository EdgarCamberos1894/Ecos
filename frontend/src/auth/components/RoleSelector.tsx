import Button from "@/app/ui/Button";
import musicianImage from "@/assets/modal/musician.webp";
import fanImage from "@/assets/modal/fan.webp";

const ROLES = ["MUSICIAN", "FAN"] as const;

const DESCRIPTIONS: Record<(typeof ROLES)[number], string> = {
  MUSICIAN: "Promociona tu música, encuentra oportunidades y conecta con tu audiencia.",
  FAN: "Descubre artistas emergentes, asiste a eventos exclusivos y apóyalos directamente.",
};

interface RoleSelectorProps {
  onSelectRole: (role: string) => void;
}

const RoleSelector = ({ onSelectRole }: RoleSelectorProps) => {
  return (
    <div className="flex flex-col items-center justify-start gap-10 p-5 text-center">
      {ROLES.map((role) => (
        <div key={role} className="flex max-w-[564px] flex-row items-center gap-5">
          <img
            src={role === "MUSICIAN" ? musicianImage : fanImage}
            alt={role === "MUSICIAN" ? "Músico" : "Fan"}
            className="h-[120px] w-[132px] object-cover"
          />
          <div className="flex w-full flex-col items-start justify-between gap-3.5">
            <Button
              type="button"
              bgType="primary"
              className="w-full"
              onClick={() => {
                onSelectRole(role);
              }}
            >
              Regístrate como {role === "MUSICIAN" ? "músico" : "fan"}
            </Button>
            <p className="text-ecos-blue text-left text-sm">{DESCRIPTIONS[role]}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleSelector;
