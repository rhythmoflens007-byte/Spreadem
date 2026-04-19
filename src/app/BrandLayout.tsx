import React from "react";
import { Outlet } from "react-router";
import { BrandNavbar } from "./components/BrandNavbar";
import { FAB } from "./components/FAB";

export function BrandLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAF9]">
      <BrandNavbar />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <FAB />
    </div>
  );
}
