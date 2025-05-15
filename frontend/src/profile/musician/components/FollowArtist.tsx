import { SpotifyIcon } from "@/app/ui/SpotifyIcon";
import { YoutubeIcon } from "@/app/ui/YoutubeIcon";
import { InstagramIcon } from "@/app/ui/InstagramIcon";
import { Link, useParams } from "react-router";
import { MusicianProfile } from "../musician-types";
import { useApiQuery } from "@/shared/hooks/use-api-query";

const FollowArtist = () => {
  const { id } = useParams() as { id: string };
  const { data: profile } = useApiQuery<MusicianProfile>("profile", `musician-profile/${id}`, id);

  return (
    <div className="space-y-6">
      <h2 className="text-ecos-blue text-2xl font-medium uppercase">Seguinos</h2>
      <div className="flex items-center gap-9">
        <Link title="Spotify" to={profile?.data.spotifyUrl ?? "#"}>
          <SpotifyIcon className="size-13 cursor-pointer" />
        </Link>
        <Link title="Youtube" to={profile?.data.youtubeUrl ?? "#"}>
          <YoutubeIcon className="size-14 cursor-pointer" />
        </Link>
        <Link title="Instagram" to={profile?.data.instagramUrl ?? "#"}>
          <InstagramIcon className="size-12 cursor-pointer" />
        </Link>
      </div>
    </div>
  );
};

export default FollowArtist;
