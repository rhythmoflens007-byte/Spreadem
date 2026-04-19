import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/Buttons";
import { Link, useNavigate } from "react-router";
import { Mail, ArrowLeft, CheckCircle, AlertTriangle, Loader2 } from "lucide-react";

/*
  ⚠ Variant state is API-driven only — never from URL query params.
  Component property: variant = pending | verifying | success | error
*/

type Variant = "pending" | "verifying" | "success" | "error";

export function VerifyEmail() {
  /* In production: variant determined by API response on mount */
  const [variant, setVariant] = useState<Variant>("pending");
  const [cooldown, setCooldown] = useState(0);
  const [resending, setResending] = useState(false);
  const navigate = useNavigate();

  /* ── Resend with 60s cooldown ── */
  const handleResend = useCallback(() => {
    if (cooldown > 0 || resending) return;
    setResending(true);
    /* [BE:API] POST /api/auth/resend-verification */
    setTimeout(() => {
      setResending(false);
      setCooldown(60);
      // If coming from error variant, reset to pending
      setVariant("pending");
    }, 800);
  }, [cooldown, resending]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  /* ── Simulated verification flow (demo) ── */
  const simulateVerify = () => {
    setVariant("verifying");
  };

  const simulateError = () => {
    setVariant("error");
  };

  /* Auto-transition: verifying → success after 1.5s */
  useEffect(() => {
    if (variant !== "verifying") return;
    const t = setTimeout(() => setVariant("success"), 1500);
    return () => clearTimeout(t);
  }, [variant]);

  /* Auto-transition: success → onboarding after 2s */
  useEffect(() => {
    if (variant !== "success") return;
    const t = setTimeout(() => navigate("/onboarding/brand"), 2000);
    return () => clearTimeout(t);
  }, [variant, navigate]);

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
          <AnimatePresence mode="wait">
            {/* ═══ VARIANT 1: PENDING ═══ */}
            {variant === "pending" && (
              <motion.div key="pending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-14 h-14 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-6"
                >
                  <Mail className="w-6 h-6 text-[#1A8A5A]" />
                </motion.div>

                <h2 style={{ color: "#0D1F17" }}>Check your inbox</h2>
                <p className="mt-3 mx-auto max-w-xs" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                  We've sent a verification link to your email address. Click the link to activate your account.
                </p>

                <div className="mt-6">
                  {cooldown > 0 ? (
                    <p style={{ fontSize: 14, color: "#8FA69C" }}>
                      Resend available in {cooldown}s
                    </p>
                  ) : (
                    <p style={{ fontSize: 14, color: "#8FA69C" }}>
                      Didn't receive it?{" "}
                      <button
                        onClick={handleResend}
                        disabled={resending}
                        className="bg-transparent border-none p-0 cursor-pointer"
                        style={{ color: "#1A8A5A", fontWeight: 500, fontSize: 14, fontFamily: "var(--font-body)" }}
                      >
                        {resending ? "Sending..." : "Resend email"}
                      </button>
                    </p>
                  )}
                </div>

                <div className="mt-8">
                  <Link to="/signin" className="no-underline">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="w-4 h-4" /> Back to Sign In
                    </Button>
                  </Link>
                </div>

                {/* Demo controls */}
                <div className="mt-6 pt-4 border-t border-[#E2EAE6] flex gap-2 justify-center">
                  <button onClick={simulateVerify} className="text-xs text-[#8FA69C] underline cursor-pointer bg-transparent border-none">Demo: Verify</button>
                  <button onClick={simulateError} className="text-xs text-[#8FA69C] underline cursor-pointer bg-transparent border-none">Demo: Expire</button>
                </div>
              </motion.div>
            )}

            {/* ═══ VARIANT 2: VERIFYING ═══ */}
            {variant === "verifying" && (
              <motion.div key="verifying" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="flex justify-center mb-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-10 h-10 text-[#1A8A5A]" />
                  </motion.div>
                </div>
                <h2 style={{ color: "#0D1F17" }}>Verifying your email…</h2>
                <p className="mt-3" style={{ fontSize: 15, color: "#4A6358" }}>This will only take a moment.</p>
              </motion.div>
            )}

            {/* ═══ VARIANT 3: SUCCESS ═══ */}
            {variant === "success" && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                <div className="w-14 h-14 rounded-full bg-[#F0FDF4] flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-7 h-7 text-[#16A34A]" />
                </div>
                <h2 style={{ color: "#0D1F17" }}>Email verified!</h2>
                <p className="mt-3 mx-auto max-w-xs" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                  Your email has been confirmed. Redirecting you to complete your profile…
                </p>
                {/* Annotation: In production: role from API determines OnboardingBrand vs OnboardingCreator */}
                <div className="mt-6">
                  <Link to="/onboarding/brand" className="no-underline">
                    <Button variant="primary" className="w-full">Continue</Button>
                  </Link>
                </div>
              </motion.div>
            )}

            {/* ═══ VARIANT 4: ERROR ═══ */}
            {variant === "error" && (
              <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div className="w-14 h-14 rounded-full bg-[#FEF2F2] flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="w-7 h-7 text-[#E24B4A]" />
                </div>
                <h2 style={{ color: "#0D1F17" }}>This link has expired</h2>
                <p className="mt-3 mx-auto max-w-xs" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                  Verification links are valid for 24 hours. Request a new one below.
                </p>
                <div className="mt-6">
                  <Button variant="primary" className="w-full" onClick={handleResend} loading={resending}>
                    Resend verification email
                  </Button>
                </div>
                <div className="mt-4">
                  <Link to="/signin" className="no-underline">
                    <Button variant="ghost" className="w-full">
                      <ArrowLeft className="w-4 h-4" /> Back to Sign In
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
