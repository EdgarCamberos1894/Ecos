import { Link, useParams } from "react-router";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import InstagramIcon from "@/assets/RRSS/instagram.svg";
import SpotifyIcon from "@/assets/RRSS/spotify.svg";
import YoutubeIcon from "@/assets/RRSS/youtube.svg";
import { type MusicianProfile } from "../musician-types";

const FollowArtist = () => {
  const { id } = useParams() as { id: string };
  const { data: profile } = useApiQuery<MusicianProfile>("profile", `musician-profile/${id}`, id);
  const links = [
    { label: "Spotify", url: profile?.data.spotifyUrl, icon: SpotifyIcon },
    { label: "YouTube", url: profile?.data.youtubeUrl, icon: YoutubeIcon },
    { label: "Instagram", url: profile?.data.instagramUrl, icon: InstagramIcon },
  ].filter((link): link is { label: string; url: string; icon: string } =>
    Boolean(link.url?.startsWith("http")),
  );

  if (!links.length) return null;

  return (
    <section className="bg-ecos-blue rounded-lg border border-slate-200 p-6 text-white shadow-sm sm:p-8">
      <p className="text-ecos-orange-light text-xs font-bold tracking-[0.16em] uppercase">
        Comunidad
      </p>
      <div className="mt-2 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h2 className="font-nunito text-3xl font-bold">Sigue al artista</h2>
          <p className="mt-1 text-sm text-white/70">
            Encuentra nuevos lanzamientos y proximas fechas.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          {links.map(({ label, url, icon }) => (
            <Link
              key={label}
              title={label}
              to={url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:border-ecos-orange-light focus-visible:outline-ecos-orange-light flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-bold transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-3"
            >
              <img src={icon} alt="" className="size-5" />
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FollowArtist;
