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
        className="mb-6 aspect-[1920/680] w-full object-cover md:mb-20"
      />
      <main className="mb-20 px-4 sm:px-8 lg:px-[160px]">
        <section className="flex flex-col gap-[70px]">
          <div className="flex max-w-[636px] flex-col gap-4">
            <h1 className="text-ecos-blue text-[40px] font-medium break-words md:text-8xl">
              {profile?.data.stageName}
            </h1>
            <h2 className="text-ecos-blue text-2xl font-medium sm:text-2xl">
              {profile?.data.genre}
            </h2>
            <h3 className="text-ecos-blue text-xl leading-9 font-normal text-balance sm:text-2xl">
              {profile?.data.description}
            </h3>
          </div>

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
                  isProfileFromUser ? "Sube tus canciones aquí" : "El usuario no tiene canciones"
                }
                className="bg-ecos-skeleton group grid aspect-[1100/510] w-full max-w-[1100px] cursor-pointer place-content-center place-items-center rounded-[30px]"
              />
            )}
            {user?.role === "FAN" && (
              <div
                className={`${isProfileFromUser ? "hidden" : "flex"} flex-wrap justify-start gap-4 sm:gap-6`}
              >
                <DonateButton
                  onClick={handleDonationModal}
                  className="button-primary flex h-14 min-w-[109px] items-center justify-center gap-2.5 rounded-[37px] px-4 py-2 text-sm sm:min-w-[171px]"
                >
                  Donar
                </DonateButton>
                <HeartButton
                  isSaved={isSaved}
                  onClick={handleFavoriteMusic}
                  className="button-secondary group flex h-14 min-w-[113px] items-center justify-center gap-2.5 rounded-[37px] px-4 py-2 text-sm sm:min-w-[178px]"
                >
                  Guardar
                </HeartButton>
              </div>
            )}
          </div>

          {songs?.items[0]?.youtubeUrl ? (
            <YouTubeVideo
              className="aspect-[1126/567] max-w-[1126px] rounded-[20px]"
              embedUrl={songs.items[0].youtubeUrl}
            />
          ) : (
            <MediaSkeleton
              onClick={isProfileFromUser ? () => navigate("/profile/musician/edit") : undefined}
              message={isProfileFromUser ? "Sube tu video aquí" : "El usuario no tiene video"}
              className="bg-ecos-skeleton group grid aspect-[1120/560] w-full max-w-[1120px] cursor-pointer place-content-center place-items-center rounded-[30px]"
            />
          )}

          {user?.role === "FAN" && (
            <DonateSection
              isProfileFromUser={isProfileFromUser}
              handleDonationModal={handleDonationModal}
            />
          )}

          <div className="flex flex-col gap-6">
            <h2 className="text-ecos-blue text-2xl font-medium uppercase">Próximos eventos</h2>
            <div
              className={`${isProfileFromUser ? "" : "mb-[95px] md:mb-[153px] lg:mb-[210px]"} grid grid-cols-[repeat(auto-fit,minmax(354px,1fr))] gap-4`}
            >
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
                  message={isProfileFromUser ? "Sube tu evento" : "El usuario no tiene eventos"}
                  className="bg-ecos-skeleton group grid aspect-[516/440] w-full max-w-[516px] cursor-pointer place-content-center place-items-center rounded-[30px]"
                />
              )}
            </div>
          </div>
        </section>

        {!isProfileFromUser && (
          <>
            <section className="flex flex-col gap-[84px]">
              <h2 className="text-ecos-blue text-[40px] leading-5 font-medium uppercase">
                Contacto
              </h2>
              <ContactForm musicianId={Number(id)} />
            </section>

            <FollowArtist />
          </>
        )}

        <div className="mt-24 flex justify-end gap-7 self-center px-4 sm:px-12 md:gap-[46px] lg:px-44">
          <button
            type="button"
            className="button-primary min-h-[40px] min-w-[212px] px-6 py-2.5 text-base font-medium transition-colors md:min-w-[316px]"
            onClick={() => navigate("/profile/musician/edit")}
          >
            Editar
          </button>
        </div>
      </main>

      {isDonationModalOpen && <DonationModal artistId={Number(id)} onClose={handleDonationModal} />}
    </>
  );
}
