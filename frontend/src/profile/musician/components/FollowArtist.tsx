import { Link, useParams } from "react-router";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import InstagramIcon from "@/assets/RRSS/instagram.svg?react";
import SpotifyIcon from "@/assets/RRSS/spotify.svg?react";
import YoutubeIcon from "@/assets/RRSS/youtube.svg?react";
import { type MusicianProfile } from "../musician-types";

const FollowArtist = () => {
  const { id } = useParams() as { id: string };
  const { data: profile } = useApiQuery<MusicianProfile>("profile", `musician-profile/${id}`, id);

  const hasSocialLinks =
    !!profile?.data.spotifyUrl || !!profile?.data.youtubeUrl || !!profile?.data.instagramUrl;

  return hasSocialLinks ? (
    <div className="-mt-[62px] space-y-6">
      <h2 className="text-ecos-blue text-2xl font-medium uppercase">Seguinos</h2>
      <div className="flex items-center gap-8">
        {profile.data.spotifyUrl && (
          <Link
            title="Spotify"
            to={profile.data.spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar perfil de Spotify"
            className="transition-transform hover:scale-105 focus-visible:scale-105"
          >
            <SpotifyIcon className="size-12 cursor-pointer" aria-hidden="true" />
          </Link>
        )}

        {profile.data.youtubeUrl && (
          <Link
            title="Youtube"
            to={profile.data.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar perfil de Youtube"
            className="transition-transform hover:scale-105 focus-visible:scale-105"
          >
            <YoutubeIcon className="size-12 cursor-pointer" aria-hidden="true" />
          </Link>
        )}

        {profile.data.instagramUrl && (
          <Link
            title="Instagram"
            to={profile.data.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visitar perfil de Instagram"
            className="transition-transform hover:scale-105 focus-visible:scale-105"
          >
            <InstagramIcon className="size-12 cursor-pointer" aria-hidden="true" />
          </Link>
        )}
      </div>
    </div>
  ) : null;
};

export default FollowArtist;
