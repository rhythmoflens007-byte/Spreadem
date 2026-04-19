import React from "react";
import { motion } from "motion/react";
import { Button } from "../components/Buttons";
import { Link } from "react-router";
import { ArrowRight, LogIn } from "lucide-react";

export function SessionExpired() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-6 py-24 md:py-32"
      style={{ backgroundColor: "#F8FAF9" }}
    >
      <div className="w-full max-w-[480px]">
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center no-underline">
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#0D1F17" }}>Spread</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
          </Link>
        </div>

        <div className="bg-white rounded-[20px] border border-[#E2EAE6] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.04)] text-center">
          <div className="w-14 h-14 rounded-full bg-[#F0F4F2] flex items-center justify-center mx-auto mb-6">
            <LogIn className="w-6 h-6 text-[#8FA69C]" />
          </div>

          <h2 style={{ color: "#0D1F17" }}>Your session has expired</h2>
          <p className="mt-3 mx-auto max-w-xs" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
            For your security, you've been signed out after a period of inactivity. Sign in again to continue.
          </p>

          <div className="mt-8">
            <Link to="/signin">
              <Button variant="primary" className="w-full">
                Sign In Again <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
