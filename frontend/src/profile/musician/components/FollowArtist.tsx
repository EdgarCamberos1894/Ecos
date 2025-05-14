import { SpotifyIcon } from "@/app/ui/SpotifyIcon";
import { YoutubeIcon } from "@/app/ui/YoutubeIcon";
import { InstagramIcon } from "@/app/ui/InstagramIcon";

const FollowArtist = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-ecos-blue text-2xl font-medium uppercase">Seguinos</h2>
      <div className="flex items-center gap-9">
        <SpotifyIcon className="size-13 cursor-pointer" />
        <YoutubeIcon className="size-14 cursor-pointer" />
        <InstagramIcon className="size-12 cursor-pointer" />
      </div>
    </div>
  );
};

export default FollowArtist;
