import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/Buttons";
import { Link, useNavigate } from "react-router";
import { LogOut, Mail } from "lucide-react";

/*
  ⚠ Variant state (pending vs rejected) is API-driven only.
  Fetch GET /api/profile/status on mount.
  Never derive from window.location.search or URL query params.
*/

type Variant = "pending" | "rejected";

/* Hourglass SVG */
function HourglassIcon() {
  return (
    <motion.div
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-20 h-20 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto"
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6 2V4H6.01C6.01 6.21 7.78 8.15 10.2 8.83L10.74 9C8.22 9.58 6.01 11.58 6.01 14V22H18V14C18 11.58 15.78 9.58 13.26 9L13.8 8.83C16.22 8.15 18 6.21 18 4V2H6ZM16 4C16 5.85 14.42 7.4 12 7.92C9.58 7.4 8 5.85 8 4H16ZM8 14C8 12.15 9.58 10.6 12 10.08C14.42 10.6 16 12.15 16 14V20H8V14Z" fill="#1A8A5A"/>
      </svg>
    </motion.div>
  );
}

/* Error/X SVG */
function RejectedIcon() {
  return (
    <motion.div
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-20 h-20 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto"
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z" fill="#DC2626"/>
      </svg>
    </motion.div>
  );
}

export function PendingStatus() {
  // [BE:API] GET /api/profile/status → determines variant
  const [variant] = useState<Variant>("pending");
  const navigate = useNavigate();

  const handleSignOut = () => {
    /* [BE:AUTH] Calls auth.signOut() to clear tokens and cookies
       BEFORE navigating to /signin. Currently navigates without
       clearing session — leaves auth state active. */
    // auth.signOut(); // TODO: uncomment when auth is wired
    navigate("/signin");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-6 py-24 md:py-32"
      style={{ backgroundColor: "#F8FAF9" }}
    >
      <div className="w-full max-w-[480px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center no-underline">
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#0D1F17" }}>Spread</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[20px] border border-[#E2EAE6] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.04)] text-center">
          {variant === "pending" ? (
            <>
              <HourglassIcon />
              <h2 className="mt-6" style={{ color: "#0D1F17" }}>You're in the queue</h2>
              <p className="mt-4 mx-auto max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                Your application is with our team. We review every profile manually — you'll hear back within 48 hours.
              </p>
              <p className="mt-3" style={{ fontSize: 14, color: "#8FA69C", lineHeight: 1.6 }}>
                We'll send a confirmation to your email once approved.
              </p>
              <div className="mt-10">
                {/* Calls auth.signOut() to clear tokens and cookies BEFORE
                    navigating to /signin. Currently navigates without clearing
                    session — leaves auth state active. */}
                <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </div>
            </>
          ) : (
            <>
              <RejectedIcon />
              <h2 className="mt-6" style={{ color: "#0D1F17" }}>Application not approved</h2>
              <p className="mt-4 mx-auto max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                Unfortunately, your application didn't meet our current criteria. This could be due to incomplete information or platform eligibility requirements.
              </p>
              <p className="mt-3" style={{ fontSize: 14, color: "#8FA69C", lineHeight: 1.6 }}>
                If you think this was a mistake, reach out and we'll take another look.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <a href="mailto:hello@spreadem.in" className="no-underline">
                  <Button variant="outline" className="w-full">
                    <Mail className="w-4 h-4" /> Contact us at hello@spreadem.in
                  </Button>
                </a>
                <Button variant="ghost" className="w-full" onClick={handleSignOut}>
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}