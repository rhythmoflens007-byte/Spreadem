import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router";
import { Bell, Menu, X, ChevronDown, LogOut, Settings, User } from "lucide-react";
import { NotificationDropdown } from "./NotificationDropdown";
import { MobileDrawer } from "./MobileDrawer";

const navLinks = [
  { label: "Find Creators", path: "/brand/creators" },
  /* ⚠ Routes to /brand/campaigns (authenticated campaign list = dashboard).
     Label updated from "Live Campaigns" to "My Campaigns" to match route intent. */
  { label: "My Campaigns", path: "/brand/campaigns" },
];

export function BrandNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  /* Dashboard = no center link active */
  const isDashboard = location.pathname === "/brand/dashboard";

  return (
    <motion.nav
      animate={{
        backgroundColor: "rgba(255,255,255,1)",
        boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.08)" : "0 1px 0px rgba(226,234,230,1)",
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white"
    >
      <div className="w-full max-w-[1280px] mx-auto px-8 relative flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link to="/brand/dashboard" className="flex items-center no-underline shrink-0">
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "#0D1F17" }}>Spread</span>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
        </Link>

        {/* Center: Nav links — absolutely centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => {
            const active = !isDashboard && isActive(link.path);
            return (
              <Link
                key={link.label}
                to={link.path}
                className="no-underline relative pb-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  fontWeight: 500,
                  color: active ? "#1A8A5A" : "#4A6358",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
                <motion.div
                  initial={false}
                  animate={{
                    scaleX: active ? 1 : 0,
                    opacity: active ? 1 : 0,
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="absolute left-0 right-0 -bottom-[4px] h-[2px] rounded-[2px] bg-[#1A8A5A] origin-center"
                />
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <div className="relative">
            <button onClick={() => setNotifOpen(!notifOpen)} className="relative p-2.5 rounded-[8px] hover:bg-[#F0F4F2] transition-colors cursor-pointer">
              <Bell className="w-[18px] h-[18px] text-[#4A6358]" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#DC2626] rounded-full" />
            </button>
            <NotificationDropdown open={notifOpen} onClose={() => setNotifOpen(false)} basePath="/brand" />
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-[#F0F4F2] transition-colors cursor-pointer"
            >
              <div className="w-8 h-8 rounded-full bg-[#E8F5EE] flex items-center justify-center">
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, color: "#1A8A5A" }}>G</span>
              </div>
              <span className="hidden lg:inline" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>GlowSkin</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8FA69C]" />
            </button>

            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 w-48 bg-white rounded-[12px] border border-[#E2EAE6] shadow-lg py-1.5 z-50"
                >
                  <Link to="/brand/account" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F8FAF9] no-underline transition-colors" style={{ fontSize: 14, color: "#0D1F17" }}>
                    <User className="w-4 h-4 text-[#8FA69C]" /> My Profile
                  </Link>
                  <Link to="/brand/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F8FAF9] no-underline transition-colors" style={{ fontSize: 14, color: "#0D1F17" }}>
                    <Settings className="w-4 h-4 text-[#8FA69C]" /> My Dashboard
                  </Link>
                  <Link to="/brand/account" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#F8FAF9] no-underline transition-colors" style={{ fontSize: 14, color: "#0D1F17" }}>
                    <Settings className="w-4 h-4 text-[#8FA69C]" /> Settings
                  </Link>
                  <div className="border-t border-[#E2EAE6] my-1" />
                  <Link to="/signin" className="flex items-center gap-2.5 px-4 py-2.5 hover:bg-[#FEF2F2] no-underline transition-colors" style={{ fontSize: 14, color: "#DC2626" }}>
                    <LogOut className="w-4 h-4" /> Sign Out
                  </Link>
                </motion.div>
              </>
            )}
          </div>
        </div>

        <button className="md:hidden p-2 cursor-pointer" onClick={() => setMobileOpen(!mobileOpen)}>
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X className="w-5 h-5 text-[#0D1F17]" />
              </motion.div>
            ) : (
              <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu className="w-5 h-5 text-[#0D1F17]" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} role="brand" />
    </motion.nav>
  );
}