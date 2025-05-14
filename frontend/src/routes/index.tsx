import { Route, Routes } from "react-router";
import { HomePage } from "@/home/HomePage";
import { MainLayout } from "@/app/layout/MainLayout";
import ProfileMusicianPage from "@/profile/musician/ProfileMusicianPage";
import ExplorerPage from "@/explorer/components/ExplorerPage";
import ArtistPage from "@/artist/components/ArtistPage";
import ProfileFanPage from "@/profile/fan/ProfileFanPage";
import ProtectedRoute from "@/auth/components/ProtectedRoute";
import EventPage from "@/event/EventPage";
import { EditProfileMusicianPage } from "@/profile/musician/EditProfileMusicianPage";
import { BackButtonLayout } from "@/app/layout/BackButtonLayout";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Layout principal con header y footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
        <Route path="/explorer" element={<ExplorerPage />} />
        <Route path="/artist" element={<ArtistPage />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile/musician" element={<ProfileMusicianPage />} />
          <Route path="/event" element={<EventPage />} />
          <Route path="/profile/fan" element={<ProfileFanPage />} />
        </Route>
      </Route>

      {/* Rutas protegidas con BackButtonLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<BackButtonLayout />}>
          <Route path="/profile/musician/edit" element={<EditProfileMusicianPage />} />
        </Route>
      </Route>
    </Routes>
  );
};
