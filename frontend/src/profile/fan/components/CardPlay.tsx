import Button from "@/app/ui/Button";
import image from "@/assets/imagePlay.svg";
import { CloseIcon } from "../ui/CloseIcon";
import { NextIcon } from "../ui/NextIcon";
import { PlayIcon } from "../ui/PlayIcon";
import { PrevIcon } from "../ui/PrevIcon";
import { RepeatLeftIcon } from "../ui/RepeatLeftIcon";
import { RepeatRightIcon } from "../ui/RepeatRightIcon";
import DonateIcon from "../ui/DonateIcon";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

  const handleDonateClick = () => {
    navigate("/donation");
  };

  return (
    <div className="mt-6 grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-6">
      {playList.map(({ id, songTitle, bronx }) => (
        <div key={id} className="mx-auto w-full max-w-[390px] space-y-5">
          <div className="group relative space-y-8 rounded-[40px] border-4 border-[#9898A6] px-6 py-8 sm:px-8 sm:py-10">
            <CloseIcon className="absolute top-5 right-5 z-10 h-4 w-4" />
            <img src={image} alt="imagen" className="mx-auto h-[320px] w-[3200px] rounded-[42px]" />
            <div className="text-center">
              <h3 className="text-ecos-blue text-center text-xl">{songTitle}</h3>
              <p className="text-ecos-dark-grey">{bronx}</p>
            </div>

            <div className="text-ecos-orange mt-4 flex items-center justify-center gap-3">
              <PrevIcon />
              <RepeatLeftIcon />
              <PlayIcon />
              <RepeatRightIcon />
              <NextIcon />
            </div>
          </div>

          <Button
            type="button"
            children="Donar"
            startIcon={<DonateIcon />}
            bgType="secondary"
            className="self-start text-white shadow-md"
            onClick={handleDonateClick}
          />
        </div>
      ))}
    </div>
  );
};

export default CardPlay;
