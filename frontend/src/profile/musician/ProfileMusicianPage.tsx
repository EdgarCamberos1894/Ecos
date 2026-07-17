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

interface ContentEmptyStateProps {
  eyebrow: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

const ContentEmptyState = ({
  eyebrow,
  title,
  description,
  actionLabel,
  onAction,
}: ContentEmptyStateProps) => (
  <div className="flex min-h-52 flex-col justify-center border border-dashed border-slate-300 bg-slate-50 px-6 py-7 sm:px-8">
    <p className="text-ecos-orange text-xs font-bold tracking-[0.16em] uppercase">{eyebrow}</p>
    <h3 className="font-nunito text-ecos-blue mt-2 text-2xl font-bold">{title}</h3>
    <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600">{description}</p>
    {actionLabel && onAction && (
      <button
        type="button"
        onClick={onAction}
        className="button-primary mt-5 w-fit px-5 py-2.5 text-sm"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

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
      <header className="bg-ecos-blue relative mb-8 h-[clamp(280px,38svh,460px)] w-full overflow-hidden md:mb-12">
        <img
          src={banner?.bannerUrl ?? ImageBanner}
          alt={`Banner de ${profile?.data.stageName ?? "artista"}`}
          className="h-full w-full object-cover object-center"
        />
        <div className="bg-ecos-blue/85 absolute inset-x-0 bottom-0 px-5 py-6 text-white sm:px-8 sm:py-8 lg:px-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))]">
          <p className="text-ecos-orange-light text-xs font-bold tracking-[0.16em] uppercase">
            Artista Ecos
          </p>
          <div className="mt-2 flex flex-wrap items-baseline gap-x-5 gap-y-2">
            <h1 className="font-nunito text-4xl leading-tight font-bold sm:text-5xl lg:text-6xl">
              {profile?.data.stageName ?? "Artista"}
            </h1>
            {profile?.data.genre && (
              <p className="text-base font-bold text-white/75 sm:text-lg">{profile.data.genre}</p>
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto mb-16 w-full max-w-screen-xl px-4 sm:px-8 md:mb-20 lg:px-10">
        <section className="flex flex-col gap-10 md:gap-14">
          {isProfileFromUser && (
            <section className="flex flex-wrap items-center justify-between gap-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div>
                <p className="text-ecos-orange text-xs font-bold tracking-[0.16em] uppercase">
                  Espacio del artista
                </p>
                <h2 className="font-nunito text-ecos-blue mt-1 text-2xl font-bold">
                  Gestiona lo que ve tu audiencia
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Tu perfil se ira completando a medida que publiques contenido.
                </p>
              </div>
              <button
                type="button"
                className="button-primary px-5 py-2.5 text-sm"
                onClick={() => navigate("/profile/musician/edit?section=overview")}
              >
                Abrir panel
              </button>
            </section>
          )}
          <div className="border-ecos-orange flex max-w-3xl flex-col gap-4 border-l-4 pl-5">
            <p className="text-ecos-orange text-sm font-bold tracking-[0.16em] uppercase">
              Acerca de
            </p>
            <h2 className="text-ecos-blue font-nunito text-3xl font-bold sm:text-4xl">
              La propuesta de {profile?.data.stageName ?? "este artista"}
            </h2>
            <p className="text-ecos-blue text-base leading-7 font-normal text-balance sm:text-lg">
              {profile?.data.description ??
                (isProfileFromUser
                  ? "Este espacio contara la historia de tu proyecto. Completa tus datos de perfil para que tu audiencia sepa que hay detras de tu musica."
                  : "Este artista todavia no ha compartido una descripcion de su proyecto.")}
            </p>
          </div>

          <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:gap-12">
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-ecos-orange text-sm font-bold tracking-[0.16em] uppercase">
                  Discografia
                </p>
                <h2 className="subtitles">Canciones para escuchar</h2>
              </div>
              {songs?.items.length ? (
                <div className="divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                  {songs.items.map((song, index) => (
                    <div key={song.id} className="flex items-center gap-4 px-4 py-4 sm:px-5">
                      <span className="text-ecos-orange w-5 text-xs font-bold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <AudioPlayer audioUrl={song.audioUrl} title={song.title} />
                    </div>
                  ))}
                </div>
              ) : songs?.items[0]?.spotifyUrl ? (
                <SpotifyTrack
                  className="w-full max-w-screen-md rounded-2xl"
                  embedUrl={songs.items[0].spotifyUrl}
                />
              ) : (
                <ContentEmptyState
                  eyebrow="Primer lanzamiento"
                  title={
                    isProfileFromUser
                      ? "Comparte una cancion para empezar"
                      : "Aun no hay canciones publicadas"
                  }
                  description={
                    isProfileFromUser
                      ? "Tu musica aparecera aqui y sera lo primero que podran escuchar quienes visiten tu perfil."
                      : "Este artista todavia no ha compartido musica en Ecos."
                  }
                  actionLabel={isProfileFromUser ? "Publicar musica" : undefined}
                  onAction={
                    isProfileFromUser
                      ? () => navigate("/profile/musician/edit?section=music")
                      : undefined
                  }
                />
              )}
              {user?.role === "FAN" && (
                <div
                  className={`${isProfileFromUser ? "hidden" : "flex"} flex-wrap justify-start gap-3 pt-2 sm:gap-4`}
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
            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-ecos-orange text-sm font-bold tracking-[0.16em] uppercase">
                  En pantalla
                </p>
                <h2 className="subtitles">Video destacado</h2>
              </div>
              {songs?.items[0]?.youtubeUrl ? (
                <div className="bg-ecos-blue overflow-hidden rounded-lg border border-slate-200 p-2 shadow-lg">
                  <YouTubeVideo
                    className="aspect-video w-full rounded-md bg-black"
                    embedUrl={songs.items[0].youtubeUrl}
                  />
                </div>
              ) : (
                <ContentEmptyState
                  eyebrow="En pantalla"
                  title={
                    isProfileFromUser ? "Dale movimiento a tu perfil" : "Aun no hay video destacado"
                  }
                  description={
                    isProfileFromUser
                      ? "Agrega un video para acompañar tu proximo lanzamiento y mostrar mejor tu propuesta."
                      : "Este artista todavia no tiene una pieza visual destacada."
                  }
                  actionLabel={isProfileFromUser ? "Agregar video" : undefined}
                  onAction={
                    isProfileFromUser
                      ? () => navigate("/profile/musician/edit?section=video")
                      : undefined
                  }
                />
              )}
            </div>
          </section>

          {user?.role === "FAN" && (
            <DonateSection
              isProfileFromUser={isProfileFromUser}
              handleDonationModal={handleDonationModal}
            />
          )}

          <section className="flex flex-col gap-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-ecos-orange text-sm font-bold tracking-[0.16em] uppercase">
                  En vivo
                </p>
                <h2 className="subtitles mt-1">Próximos eventos</h2>
              </div>
              {events?.items.length ? (
                <span className="text-sm font-medium text-slate-500">
                  {events.items.length}{" "}
                  {events.items.length === 1 ? "fecha publicada" : "fechas publicadas"}
                </span>
              ) : null}
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
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
                <div className="flex min-h-56 max-w-2xl flex-col justify-center border border-dashed border-slate-300 bg-slate-50 px-6 py-8 sm:px-8">
                  <p className="text-ecos-orange text-sm font-bold tracking-[0.16em] uppercase">
                    Agenda
                  </p>
                  <h3 className="font-nunito text-ecos-blue mt-2 text-2xl font-bold sm:text-3xl">
                    {isProfileFromUser
                      ? "Tu siguiente fecha merece estar aquí"
                      : "Próximamente en vivo"}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
                    {isProfileFromUser
                      ? "Aún no has publicado eventos. Comparte tu próxima presentación para que tu comunidad pueda encontrarla."
                      : "Este artista todavía no tiene fechas anunciadas. Vuelve pronto para descubrir su próxima presentación."}
                  </p>
                  {isProfileFromUser && (
                    <button
                      type="button"
                      onClick={() => navigate("/event")}
                      className="button-primary mt-6 w-fit px-5 py-2.5 text-sm"
                    >
                      Publicar evento
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
        </section>

        {!isProfileFromUser && (
          <section className="mt-10 grid gap-8 border-t border-slate-200 pt-10 md:mt-12 md:pt-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:items-start">
            <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
              <p className="text-ecos-orange text-sm font-bold tracking-[0.16em] uppercase">
                Contacto directo
              </p>
              <h2 className="font-nunito text-ecos-blue mt-2 text-3xl font-bold">
                Escribe al artista
              </h2>
              <p className="mt-2 mb-7 text-sm leading-6 text-slate-600">
                Comparte una propuesta, una fecha o una idea para colaborar.
              </p>
              <ContactForm musicianId={Number(id)} />
            </div>
            <FollowArtist />
          </section>
        )}
      </main>

      {isDonationModalOpen && <DonationModal artistId={Number(id)} onClose={handleDonationModal} />}
    </>
  );
}
