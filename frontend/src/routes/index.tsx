import { Route, Routes } from "react-router";
import { HomePage } from "@/home/components/HomePage";
import { MainLayout } from "@/shared/components/layouts/MainLayout";
import ProfilePage from "@/profiles/components/ProfilePage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<div>404 NOT FOUND</div>} />
      </Route>
      <Route path="/profile" element={<ProfilePage />} />
    </Routes>
  );
};
