import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useAuth } from "@/auth/hooks/use-auth";
import { useApiQuery } from "@/shared/hooks/use-api-query";
import { useApiMutation } from "@/shared/hooks/use-api-mutation";
import EventCard from "@/shared/components/Cards/EventCard";
import ImageBanner from "@/assets/imageBanner.webp";
import { AudioPlayer } from "./components/AudioPlayer";
import { SpotifyTrack } from "./components/SpotifyTrack";
import { YouTubeVideo } from "./components/YoutubeVideo";
import { DonateSection } from "./components/DonateSection";
import ContactForm from "./components/ContactForm";
import FollowArtist from "./components/FollowArtist";
import { MediaSkeleton } from "./components/MediaSkeleton";
import DonationModal from "../fan/DonationModal";
import { HeartButton } from "../components/HeartButton";
import { DonateButton } from "../components/DonateButton";
import { type ResponseListOfFavoriteSongs } from "../types/favorite-songs";
import {
  type BannerUrl,
  type ApiSongs,
  type MusicianProfile,
  type FavoriteMusic,
  type ApiEvents,
} from "./musician-types";

export default function ProfileMusicianPage() {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const { id } = useParams() as { id: string };
  const navigate = useNavigate();

  const { user } = useAuth();

  const isProfileFromUser = id == user?.id;

  const { data: banner } = useApiQuery<BannerUrl>("banner", `musician-profile/${id}/banner`, id);
  const { data: profile } = useApiQuery<MusicianProfile>("profile", `musician-profile/${id}`, id);
  const { data: songs, isSuccess } = useApiQuery<ApiSongs>("songs", `songs/musician/${id}`, id);
  const { data: events } = useApiQuery<ApiEvents>("events", `events/musician/${id}`, id);
  const { data: savedSongs } = useApiQuery<ResponseListOfFavoriteSongs>(
    "songs",
    "/saved-songs",
    "all",
    !!user && user.role === "FAN",
  );

  useEffect(() => {
    setIsSaved(
      !!(
        user &&
        user.role === "FAN" &&
        savedSongs?.items.some((savedSong) => savedSong.id === songs?.items[0]?.id)
      ),
    );
  }, [user, savedSongs, songs]);

  const { mutate: favoriteSongMutate } = useApiMutation<FavoriteMusic, undefined>(
    isSuccess && songs.items.length !== 0
      ? `/saved-songs/save/${songs.items[0].id.toString()}`
      : "",
    "POST",
  );

  const validateFanAction = (roles: string[], message: string): boolean => {
    if (!user || !roles.includes(user.role)) {
      toast.info(message);
      return false;
    }

    return true;
  };

  const handleDonationModal = () => {
    if (!validateFanAction(["FAN", "MUSICIAN"], "Para donar, primero inicia sesión.")) return;
    setIsDonationModalOpen(!isDonationModalOpen);
  };

  const handleFavoriteMusic = () => {
    if (!validateFanAction(["FAN"], "Solo los fans pueden guardar música.")) return;

    if (isSaved) {
      toast.info("Esta canción ya está guardada en tu lista de favoritos.");
      return;
    }

    favoriteSongMutate(undefined, {
      onSuccess: (response) => {
        toast.success(response.message);
        setIsSaved(!isSaved);
      },
      onError: () => {
        toast.error("Error al guardar música");
      },
    });
  };

  return (
    <>
      <img
        src={banner?.bannerUrl ?? ImageBanner}
        alt={`Banner`}
        className="mb-6 aspect-[1920/680] max-h-[680px] w-full object-cover"
      />
      <main className="mb-20 px-4 sm:px-8 lg:px-[160px]">
        <h1 className="text-ecos-blue mb-3 text-[40px] font-medium break-words sm:text-8xl">
          {profile?.data.stageName}
        </h1>
        <h2 className="text-ecos-blue mb-10 text-xl sm:mb-16 sm:text-2xl">{profile?.data.genre}</h2>

        <section className="flex flex-col gap-16">
          <div className={`flex flex-col ${songs?.items[0]?.audioUrl ? "gap-20" : "gap-6"}`}>
            {songs?.items[0]?.audioUrl ? (
              <AudioPlayer audioUrl={songs.items[0].audioUrl} title={songs.items[0].title} />
            ) : songs?.items[0]?.spotifyUrl ? (
              <SpotifyTrack
                className="w-full max-w-screen-md rounded-2xl"
                embedUrl={songs.items[0].spotifyUrl}
              />
            ) : (
              <MediaSkeleton
                onClick={isProfileFromUser ? () => navigate("/profile/musician/edit") : undefined}
                message={
                  isProfileFromUser ? "Subí tus canciones aquí" : "El usuario no tiene canciones"
                }
                className="bg-ecos-skeleton group grid aspect-[1100/510] w-full max-w-[1100px] cursor-pointer place-content-center place-items-center rounded-[30px]"
              />
            )}
            <div
              className={`${isProfileFromUser ? "hidden" : "flex"} mb-16 flex-wrap justify-start gap-4 sm:gap-6`}
            >
              <HeartButton
                isSaved={isSaved}
                onClick={handleFavoriteMusic}
                className="bg-ecos-blue flex h-14 min-w-[113px] cursor-pointer items-center justify-center gap-2.5 rounded-[37px] px-4 py-2 text-sm text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] sm:min-w-[178px]"
              >
                Guardar
              </HeartButton>
              <DonateButton
                onClick={handleDonationModal}
                className="bg-ecos-blue flex h-14 min-w-[109px] cursor-pointer items-center justify-center gap-2.5 rounded-[37px] px-4 py-2 text-sm text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] sm:min-w-[171px]"
              >
                Donar
              </DonateButton>
            </div>
          </div>

          {songs?.items[0]?.youtubeUrl ? (
            <YouTubeVideo
              className="mb-9 aspect-[1126/567] max-h-[567px] min-h-[196px] max-w-[1126px] rounded-[20px]"
              embedUrl={songs.items[0].youtubeUrl}
            />
          ) : (
            <MediaSkeleton
              onClick={isProfileFromUser ? () => navigate("/profile/musician/edit") : undefined}
              message={isProfileFromUser ? "Subí tu video aquí" : "El usuario no tiene video"}
              className="bg-ecos-skeleton group grid aspect-[1120/560] w-full max-w-[1120px] cursor-pointer place-content-center place-items-center rounded-[30px]"
            />
          )}

          <DonateSection
            isProfileFromUser={isProfileFromUser}
            handleDonationModal={handleDonationModal}
          />

          <h2 className="text-ecos-blue text-2xl font-medium uppercase">Próximos eventos</h2>
          <div className="mb-[95px] grid grid-cols-[repeat(auto-fit,minmax(354px,1fr))] gap-4 md:mb-[153px] lg:mb-[256px]">
            {events?.items[0] ? (
              events.items.map((event) => (
                <EventCard
                  key={event.id}
                  id={event.id}
                  image={event.image}
                  stageName={event.musician.stageName ?? ""}
                  category={event.category}
                  supportingText={event.name}
                  datePublished={event.date}
                  contentPublished={event.description}
                />
              ))
            ) : (
              <MediaSkeleton
                onClick={isProfileFromUser ? () => navigate("/event") : undefined}
                message={isProfileFromUser ? "Subí tu evento" : "El usuario no tiene eventos"}
                className="bg-ecos-skeleton group grid aspect-[516/440] w-full max-w-[516px] cursor-pointer place-content-center place-items-center rounded-[30px]"
              />
            )}
          </div>
        </section>

        <section className="space-y-28">
          <h2 className="text-ecos-blue text-[40px] leading-5 font-medium uppercase">Contacto</h2>
          <ContactForm musicianId={Number(id)} />
          <FollowArtist />
        </section>
      </main>

      {isDonationModalOpen && <DonationModal artistId={Number(id)} onClose={handleDonationModal} />}
    </>
  );
}
