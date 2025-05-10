import { Route, Routes } from "react-router";
import { HomePage } from "@/home/HomePage";
import { MainLayout } from "@/app/layout/MainLayout";
import ProfilePage from "@/profile/ProfilePage";
import ExplorerPage from "@/explorer/components/ExplorerPage";
import ArtistPage from "@/artist/components/ArtistPage";
import PlayPage from "@/play/PlayPage";
import ProtectedRoute from "@/auth/components/ProtectedRoute";
import EventPage from "@/event/EventPage";
import { EditProfilePage } from "@/profile/EditProfilePage";
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
        <Route path="/play" element={<PlayPage />} />

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/event" element={<EventPage />} />
        </Route>
      </Route>

      {/* Rutas protegidas con BackButtonLayout */}
      <Route element={<ProtectedRoute />}>
        <Route element={<BackButtonLayout />}>
          <Route path="/profile/edit" element={<EditProfilePage />} />
        </Route>
      </Route>
    </Routes>
  );
};
