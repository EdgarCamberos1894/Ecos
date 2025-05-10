import { useAuth } from "@/auth/hooks/use-auth";
import ImageBanner from "@/assets/imageBanner.webp";
import { SpotifyTrack } from "./components/SpotifyTrack";
import { YouTubeVideo } from "./components/YoutubeVideo";
import EventCard from "@/shared/components/Cards/EventCard";
import ContactForm from "./components/ContactForm";
import FollowArtist from "./components/FollowArtist";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="mb-20">
      <img src={ImageBanner} alt={`Banner`} className="mb-10 max-h-[720px] w-full object-cover" />
      <div className="mb-40 ml-40 space-y-2 p-2">
        <h1 className="text-8xl font-medium">{user?.name}</h1>
        <h2 className="text-2xl font-medium">{user?.name}</h2>
      </div>
      <section className="ml-40 flex flex-col gap-16">
        <div>
          <SpotifyTrack
            className="max-w-5xl rounded-4xl"
            embedUrl="https://open.spotify.com/embed/track/1iW2ktyrQHNKZwFTvgP0Ta?utm_source=generator"
          />
          {/* TODO: componente con iconos para interactuar con la cancion */}
        </div>
        <div>
          <YouTubeVideo className="w-5xl" embedUrl="https://www.youtube.com/embed/bbkNm739ULA" />
        </div>
        {/* TODO: componente para donar */}
        <div className="mb-36">
          <EventCard
            headline="EVENTO"
            supportingText="Supporting Text"
            datePublished={new Date()}
            contentPublished="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          />
        </div>
      </section>
      <section className="ml-40 space-y-28">
        <h2 className="text-4xl uppercase">Contacto</h2>
        <ContactForm />
        <FollowArtist />
      </section>
    </main>
  );
}
