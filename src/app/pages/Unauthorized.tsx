import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/Buttons";
import { ShieldX } from "lucide-react";

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
  guest: { label: "Sign In", to: "/signin" },
};

export function Unauthorized() {
  const role = useUserRole();
  const cta = ctaMap[role];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex flex-col items-center justify-center px-8 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-24 h-24 rounded-full bg-[#FEF2F2] flex items-center justify-center mb-8"
      >
        <ShieldX className="w-12 h-12 text-[#DC2626]" />
      </motion.div>
      <h2 style={{ color: "#0D1F17" }}>Access denied</h2>
      <p className="mt-3 max-w-md" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#4A6358", lineHeight: 1.7 }}>
        You don't have permission to view this page.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-3 mt-8">
        <Link to={cta.to} className="no-underline">
          <Button variant="primary">{cta.label}</Button>
        </Link>
        <Link to="/signin" className="no-underline">
          <Button variant="outline">Sign in with a different account</Button>
        </Link>
      </div>
    </motion.div>
  );
}
