import { Route, Routes } from "react-router";
import { HomePage } from "@/home/components/HomePage";
import { MainLayout } from "@/app/layout/MainLayout";
import ProfilePage from "@/profiles/components/ProfilePage";
import ExplorerPage from "@/explorer/components/ExplorerPage";
import ArtistPage from "@/artist/components/ArtistPage";
import PlayPage from "@/play/components/PlayPage";
import SettingPage from "@/settings/components/SettingPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
        <Route path="/explorer" element={<ExplorerPage />} />
        <Route path="/artist" element={<ArtistPage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/setting" element={<SettingPage />} />
      </Route>
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};
