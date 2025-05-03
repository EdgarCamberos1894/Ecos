import image from "@/assets/image.webp";
import Button from "@/app/ui/Button";

const ROLES = ["FAN", "MUSICIAN", "ORGANIZER"];

interface RoleSelectorProps {
  onSelectRole: (role: string) => void;
}

const RoleSelector = ({ onSelectRole }: RoleSelectorProps) => {
  return (
    <div className="box-border flex h-full w-full flex-col items-center justify-center gap-6 overflow-hidden">
      {ROLES.map((role) => (
        <div key={role} className="flex w-full items-center justify-around gap-12">
          <img src={image} alt="image" className="h-[120px] rounded-[16px]" />
          <div className="flex flex-col items-start justify-between gap-4">
            <Button
              type="button"
              className="bg-transparent font-bold"
              onClick={() => {
                onSelectRole(role);
              }}
            >
              Registrate como{" "}
              {role === "FAN" ? "Fan" : role === "MUSICIAN" ? "Músico" : "Organizador"}
            </Button>
            <p className="text-[#49454F]">
              Description duis aute irure dolor in reprehenderit in voluptate velit. <br />
              Description duis aute irure dolor in reprehenderit in voluptate velit.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoleSelector;
