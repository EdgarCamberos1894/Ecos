import ImageBanner from "@/assets/imageBanner.webp";
import { SpotifyTrack } from "./components/SpotifyTrack";
import { YouTubeVideo } from "./components/YoutubeVideo";
import EventCard from "@/shared/components/Cards/EventCard";
import ContactForm from "../components/ContactForm";
import FollowArtist from "./components/FollowArtist";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import { AudioPlayer } from "./components/AudioPlayer";
import { HeartButton } from "../components/HeartButton";
import { DonateButton } from "../components/DonateButton";
import { DonateSection } from "./components/DonateSection";

interface BannerUrl {
  bannerUrl: string | null;
}

interface MusicianInfo {
  stageName: string | null;
  artistName: string;
  spotifyUrl: string | null;
  youtubeUrl: string | null;
}

interface Item {
  id: number;
  title: string;
  genre: string;
  audioUrl: string;
  spotifyUrl: string | null;
  youtubeUrl: string;
  musicianInfo: MusicianInfo;
}

interface ApiSongs {
  items: Item[];
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
  first: boolean;
  last: boolean;
}

export default function ProfileMusicianPage() {
  const user = useRequiredUser();

  const { data: banner } = useApiQuery<BannerUrl>(
    "banner",
    `musician-profile/${user.id}/banner`,
    user.id,
  );

  const { data: songs } = useApiQuery<ApiSongs>("songs", `songs/musician/${user.id}`, user.id);

  const hasItems = Boolean(songs?.items.length);

  return (
    <>
      <img
        src={banner?.bannerUrl ?? ImageBanner}
        alt={`Banner`}
        className="mb-6 h-[clamp(140px,35.4vw,680px)] w-full max-w-[1920px] object-cover"
      />
      <main className="mb-20 px-[clamp(16px,8vw,160px)]">
        <h1 className="mb-32 text-8xl font-medium">{user.name}</h1>

        <section className="flex flex-col gap-16">
          {hasItems && songs?.items[0].audioUrl && (
            <>
              <AudioPlayer audioUrl={songs.items[0].audioUrl} title={songs.items[0].title} />
              <div className="mt-4 mb-16 flex gap-4 sm:gap-6">
                <HeartButton className="bg-ecos-blue flex h-14 w-28 cursor-pointer items-center justify-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm text-white sm:w-44 sm:px-10 sm:py-1.5">
                  Guardar
                </HeartButton>
                <DonateButton className="bg-ecos-blue flex h-14 w-28 cursor-pointer items-center justify-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm text-white sm:w-44 sm:px-10 sm:py-1.5">
                  Donar
                </DonateButton>
              </div>
            </>
          )}
          {hasItems && songs?.items[0].spotifyUrl && (
            <div>
              <SpotifyTrack
                className="max-w-5xl rounded-4xl"
                embedUrl={songs.items[0].spotifyUrl}
              />
              <div className="mt-4 mb-16 flex gap-4 md:gap-6">
                <HeartButton className="bg-ecos-blue flex h-14 w-28 cursor-pointer items-center justify-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm text-white sm:w-44 sm:px-10 sm:py-1.5">
                  Guardar
                </HeartButton>
                <DonateButton className="bg-ecos-blue flex h-14 w-28 cursor-pointer items-center justify-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm text-white sm:w-44 sm:px-10 sm:py-1.5">
                  Donar
                </DonateButton>
              </div>
            </div>
          )}
          {hasItems && songs?.items[0].youtubeUrl && (
            <YouTubeVideo
              className="mb-9 aspect-[1126/597] w-full max-w-[1126px] rounded-[20px]"
              embedUrl={songs.items[0].youtubeUrl}
            />
          )}
          <DonateSection />
          <div className="mb-[261px]">
            <EventCard
              headline="EVENTO"
              supportingText="Supporting Text"
              datePublished={new Date()}
              contentPublished="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            />
          </div>
        </section>
        <section className="space-y-28">
          <h2 className="text-ecos-blue text-4xl uppercase">Contacto</h2>
          <ContactForm />
          <FollowArtist />
        </section>
      </main>
    </>
  );
}
