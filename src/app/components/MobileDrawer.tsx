import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useLocation } from "react-router";
import { X, LogOut, Home, Users, Radio, FolderOpen, Bell, Settings, Search, FileText, IndianRupee } from "lucide-react";

interface DrawerLink {
  label: string;
  path: string;
  icon: React.ElementType;
}

const brandLinks: DrawerLink[] = [
  { label: "Home", path: "/brand/dashboard", icon: Home },
  { label: "Find Creators", path: "/brand/creators", icon: Users },
  { label: "My Campaigns", path: "/brand/campaigns", icon: Radio },
  { label: "Create Campaign", path: "/brand/campaigns/new", icon: FolderOpen },
  { label: "Notifications", path: "/brand/notifications", icon: Bell },
  { label: "Account", path: "/brand/account", icon: Settings },
];

const creatorLinks: DrawerLink[] = [
  { label: "Home", path: "/creator/dashboard", icon: Home },
  { label: "Browse Campaigns", path: "/creator/campaigns", icon: Search },
  { label: "My Submissions", path: "/creator/submissions", icon: FileText },
  { label: "Earnings", path: "/creator/earnings", icon: IndianRupee },
  { label: "Notifications", path: "/creator/notifications", icon: Bell },
  { label: "Account", path: "/creator/account", icon: Settings },
];

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
  role: "brand" | "creator";
}

export function MobileDrawer({ open, onClose, role }: MobileDrawerProps) {
  const location = useLocation();
  const links = role === "brand" ? brandLinks : creatorLinks;
  const email = role === "brand" ? "brand@glowskin.in" : "sneha@email.com";

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-black/40"
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-0 left-0 bottom-0 z-[201] w-[280px] bg-white flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-[#E2EAE6] shrink-0">
              <Link to={role === "brand" ? "/brand/dashboard" : "/creator/dashboard"} onClick={onClose} className="flex items-center no-underline">
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 600, color: "#0D1F17" }}>Spread</span>
                <span style={{ fontFamily: "var(--font-heading)", fontSize: 20, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
              </Link>
              <button
                onClick={onClose}
                className="w-9 h-9 rounded-[8px] flex items-center justify-center hover:bg-[#F0F4F2] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-[#4A6358]" />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4 px-3">
              {links.map((link, i) => {
                const active = isActive(link.path);
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                  >
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className="flex items-center gap-3 no-underline h-12 px-4 rounded-[8px] transition-colors"
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 15,
                        fontWeight: 500,
                        color: active ? "#1A8A5A" : "#0D1F17",
                        backgroundColor: active ? "#E8F5EE" : "transparent",
                        borderLeft: active ? "3px solid #1A8A5A" : "3px solid transparent",
                      }}
                    >
                      <Icon className="w-[18px] h-[18px] shrink-0" style={{ color: active ? "#1A8A5A" : "#8FA69C" }} />
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            {/* Bottom */}
            <div className="border-t border-[#E2EAE6] px-6 py-5 shrink-0">
              <p className="mb-3 truncate" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}>
                {email}
              </p>
              <Link
                to="/signin"
                onClick={onClose}
                className="flex items-center gap-2.5 no-underline h-11 px-4 rounded-[10px] bg-[#FEF2F2] justify-center transition-colors hover:bg-[#FECACA]"
                style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#DC2626" }}
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}