import { Outlet } from "react-router";
import { CreatorNavbar } from "./components/CreatorNavbar";

export function CreatorLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
      <CreatorNavbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
    </div>
  );
}