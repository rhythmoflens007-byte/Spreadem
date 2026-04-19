import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/Buttons";

/*
  Component variant property: userRole = brand | creator | guest
  Blue annotation: "userRole read from auth context on mount"
*/

function useUserRole(): "brand" | "creator" | "guest" {
  // [BE:AUTH] In production, read from auth context
  const path = window.location.pathname;
  if (path.startsWith("/brand")) return "brand";
  if (path.startsWith("/creator")) return "creator";
  return "guest";
}

const ctaMap = {
  brand: { label: "Go to Dashboard", to: "/brand/dashboard" },
  creator: { label: "Go to Dashboard", to: "/creator/dashboard" },
  guest: { label: "Go to Home", to: "/" },
};

export function NotFound() {
  const role = useUserRole();
  const cta = ctaMap[role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
    >
      <span style={{ fontFamily: "var(--font-heading)", fontSize: 120, fontWeight: 600, color: "#8FA69C", letterSpacing: "-0.03em", lineHeight: 1 }}>404</span>
      <h2 className="mt-4" style={{ color: "#0D1F17" }}>Page not found</h2>
      <p className="mt-3 max-w-md" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#4A6358", lineHeight: 1.7 }}>
        The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
        <Link to={cta.to} className="no-underline">
          <Button variant="primary">{cta.label}</Button>
        </Link>
        <Link to="/signin" className="no-underline">
          <Button variant="outline">Sign in with a different account</Button>
        </Link>
      </div>
      <p className="mt-8" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}>
        Need help? Reach out at{" "}
        <a href="mailto:support@spreadem.in" className="no-underline" style={{ color: "#1A8A5A", fontWeight: 500 }}>support@spreadem.in</a>
      </p>
    </motion.div>
  );
}
