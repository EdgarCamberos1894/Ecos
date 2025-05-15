import { useParams } from "react-router";
import ImageBanner from "@/assets/imageBanner.webp";
import { SpotifyTrack } from "./components/SpotifyTrack";
import { YouTubeVideo } from "./components/YoutubeVideo";
import EventCard from "@/shared/components/Cards/EventCard";
import ContactForm from "../components/ContactForm";
import FollowArtist from "./components/FollowArtist";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { AudioPlayer } from "./components/AudioPlayer";
import { HeartButton } from "../components/HeartButton";
import { DonateButton } from "../components/DonateButton";
import { DonateSection } from "./components/DonateSection";
import {
  type BannerUrl,
  type ApiSongs,
  type MusicianProfile,
  type FavoriteMusic,
} from "./musician-types";
import { useRequiredUser } from "@/auth/hooks/use-required-user";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import { toast } from "sonner";
import { useState } from "react";
import DonationModal from "../fan/DonationModal";

export default function ProfileMusicianPage() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

  const { id } = useParams() as { id: string };
  const user = useRequiredUser();

  const { data: banner } = useApiQuery<BannerUrl>("banner", `musician-profile/${id}/banner`, id);
  const { data: profile } = useApiQuery<MusicianProfile>("profile", `musician-profile/${id}`, id);
  const { data: songs, isSuccess } = useApiQuery<ApiSongs>("songs", `songs/musician/${id}`, id);
  const { data: events } = useApiQuery("events", `events/musician/${id}`, id);

  const { mutate: favoriteSongMutate } = useApiMutation<FavoriteMusic, undefined>(
    isSuccess ? `/saved-songs/save/${songs.items[0].id.toString()}` : "",
    "POST",
  );

  const handleDonationModal = () => {
    setIsDonationModalOpen(!isDonationModalOpen);
  };

  const handleFavoriteMusic = () => {
    if (user.role === "MUSICIAN") {
      toast.info("Solo las cuentas con el rol FAN pueden guardar música");
      return;
    }

    favoriteSongMutate(undefined, {
      onSuccess: (response) => {
        toast.success(response.message);
      },
      onError: () => {
        toast.error("Error al guardar música");
      },
    });
  };

  return (
    <>
      {JSON.stringify(events, null, 2)}
      <img
        src={banner?.bannerUrl ?? ImageBanner}
        alt={`Banner`}
        className="mb-6 h-[clamp(140px,35.4vw,680px)] w-full max-w-[1920px] object-cover"
      />
      <main className="mb-20 px-[clamp(16px,8vw,160px)]">
        <h1 className="text-ecos-blue mb-3 text-8xl font-medium">{profile?.data.stageName}</h1>
        <h2 className="text-ecos-blue mb-16 text-2xl">{profile?.data.genre}</h2>
        <section className="flex flex-col gap-16">
          {songs?.items[0]?.audioUrl && (
            <>
              <AudioPlayer audioUrl={songs.items[0].audioUrl} title={songs.items[0].title} />
              <div className="mt-4 mb-16 flex gap-4 sm:gap-6">
                <HeartButton
                  onClick={handleFavoriteMusic}
                  className="bg-ecos-blue flex h-14 w-28 cursor-pointer items-center justify-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm text-white sm:w-44 sm:px-10 sm:py-1.5"
                >
                  Guardar
                </HeartButton>
                <DonateButton
                  onClick={handleDonationModal}
                  className="bg-ecos-blue flex h-14 w-28 cursor-pointer items-center justify-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm text-white sm:w-44 sm:px-10 sm:py-1.5"
                >
                  Donar
                </DonateButton>
              </div>
            </>
          )}
          {songs?.items[0]?.spotifyUrl && (
            <div>
              <SpotifyTrack
                className="max-w-5xl rounded-4xl"
                embedUrl={songs.items[0].spotifyUrl}
              />
              <div className="mt-4 mb-16 flex gap-4 md:gap-6">
                <HeartButton
                  onClick={handleFavoriteMusic}
                  className="bg-ecos-blue flex h-14 w-28 cursor-pointer items-center justify-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm text-white sm:w-44 sm:px-10 sm:py-1.5"
                >
                  Guardar
                </HeartButton>
                <DonateButton
                  onClick={handleDonationModal}
                  className="bg-ecos-blue flex h-14 w-28 cursor-pointer items-center justify-center gap-2.5 rounded-full px-3.5 py-1.5 text-sm text-white sm:w-44 sm:px-10 sm:py-1.5"
                >
                  Donar
                </DonateButton>
              </div>
            </div>
          )}
          {songs?.items[0]?.youtubeUrl && (
            <YouTubeVideo
              className="mb-9 aspect-[1126/567] max-h-[567px] min-h-[196px] w-full max-w-[1126px] min-w-[358px] rounded-[20px]"
              embedUrl={songs.items[0].youtubeUrl}
            />
          )}
          <DonateSection handleDonationModal={handleDonationModal} />
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

      {isDonationModalOpen && <DonationModal artistId={Number(id)} onClose={handleDonationModal} />}
    </>
  );
}
