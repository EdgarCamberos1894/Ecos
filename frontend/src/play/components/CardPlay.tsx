import image from "../../assets/imagePlay.svg";
import { CloseIcon } from "./ui/CloseIcon";
import { NextIcon } from "./ui/NextIcon";
import { PlayIcon } from "./ui/PlayIcon";
import { PrevIcon } from "./ui/PrevIcon";
import { RepeatLeftIcon } from "./ui/RepeatLeftIcon";
import { RepeatRightIcon } from "./ui/RepeatRightIcon";

const playList = [
  { id: 1, songTitle: "Atrás hay truenos", bronx: "Bronx" },
  { id: 2, songTitle: "Atrás hay truenos", bronx: "Bronx" },
  { id: 3, songTitle: "Atrás hay truenos", bronx: "Bronx" },
  { id: 4, songTitle: "Atrás hay truenos", bronx: "Bronx" },
  { id: 5, songTitle: "Atrás hay truenos", bronx: "Bronx" },
  { id: 6, songTitle: "Atrás hay truenos", bronx: "Bronx" },
  { id: 7, songTitle: "Atrás hay truenos", bronx: "Bronx" },
  { id: 8, songTitle: "Atrás hay truenos", bronx: "Bronx" },
  { id: 9, songTitle: "Atrás hay truenos", bronx: "Bronx" },
];

const CardPlay = () => {
  return (
    <div className="mt-6 grid gap-y-24 lg:grid-cols-3 lg:gap-x-6">
      {playList.map(({ id, songTitle, bronx }) => (
        <div key={id} className="h-[564px] max-w-[390px] min-w-[300px] space-y-5">
          <div className="group relative rounded-[40px] border-4 border-[#9898A6] px-8 py-10 font-[Poppins]">
            <CloseIcon className="absolute top-5 right-5 z-10 h-4 w-4" />
            <img src={image} alt="imagen" className="h-[320px] w-[320px] rounded-[42px]" />
            <h3 className="mt-6 text-center text-xl font-semibold text-[#1A1A1A]">{songTitle}</h3>
            <p className="text-center text-base font-normal text-gray-500">{bronx}</p>
            <div className="flex items-center justify-center gap-3 text-[#6246FF]">
              <PrevIcon />
              <RepeatLeftIcon />
              <PlayIcon />
              <RepeatRightIcon />
              <NextIcon />
            </div>
          </div>
          <div className="flex justify-center space-x-2">
            <button type="submit" className="rounded-3xl bg-[#CAC4D0] px-9 py-2.5">
              Guardar
            </button>
            <button type="submit" className="rounded-3xl bg-[#CAC4D0] px-9 py-2.5">
              Seguir
            </button>
            <button type="submit" className="rounded-3xl bg-[#CAC4D0] px-9 py-2.5">
              Donar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardPlay;
