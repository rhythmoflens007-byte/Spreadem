import React from "react";
import { Outlet } from "react-router";
import { PublicNavbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}