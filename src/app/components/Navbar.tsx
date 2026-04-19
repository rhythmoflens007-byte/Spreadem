import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { Button } from "./Buttons";

const navLinks = [
  { label: "Campaigns", path: "/campaigns" },
  { label: "Creators", path: "/creators" },
  { label: "How it works", path: "/how-it-works" },
];

export function PublicNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <motion.nav
      animate={{ backgroundColor: scrolled ? "rgba(255,255,255,1)" : "rgba(255,255,255,0)", boxShadow: scrolled ? "0 1px 3px rgba(0,0,0,0.08)" : "none" }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="w-full max-w-[1280px] mx-auto px-8 relative flex items-center justify-between h-16">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-0 no-underline shrink-0">
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "#0D1F17" }}>Spread</span>
          <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
        </Link>

        {/* Center: Nav links — absolutely centered */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="no-underline relative pb-1"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  fontWeight: 500,
                  color: active ? "#1A8A5A" : scrolled ? "#4A6358" : "#0D1F17",
                  transition: "color 0.2s ease",
                }}
              >
                {item.label}
                {/* Active underline bar */}
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

        {/* Right: CTA group */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link to="/signin" className="no-underline"><Button variant="ghost" size="small">Sign In</Button></Link>
          <Link to="/signup" className="no-underline"><Button variant="primary" size="small">Get Started</Button></Link>
        </div>

        <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-[#E2EAE6] px-8 py-4 flex flex-col gap-4"
        >
          {navLinks.map((item) => {
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className="no-underline"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 16,
                  fontWeight: 500,
                  color: active ? "#1A8A5A" : "#0D1F17",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex gap-3 pt-2">
            <Link to="/signin" className="no-underline"><Button variant="ghost" size="small">Sign In</Button></Link>
            <Link to="/signup" className="no-underline"><Button variant="primary" size="small">Get Started</Button></Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
