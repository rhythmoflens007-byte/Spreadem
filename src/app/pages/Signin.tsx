import React, { useState } from "react";
import { motion } from "motion/react";
import { Button } from "../components/Buttons";
import { Link, useNavigate } from "react-router";
import { ArrowRight, Eye, EyeOff, AlertTriangle, XCircle, Clock } from "lucide-react";

type ErrorType = null | "wrong-password" | "not-found" | "pending" | "rejected" | "invalid-email" | "empty-fields";

const shake = {
  x: [0, -4, 4, -4, 4, -4, 4, 0],
  transition: { duration: 0.3 },
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<ErrorType>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [signingIn, setSigningIn] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const navigate = useNavigate();

  const canSubmit = email.trim() && password.length >= 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* Client-side validation before API call */
    const errs: { email?: string; password?: string } = {};
    if (!emailRegex.test(email.trim())) errs.email = "Enter a valid email address.";
    if (!password.trim()) errs.password = "Password is required.";
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setShakeKey((k) => k + 1);
      return;
    }
    setFieldErrors({});
    setLoading(true);

    /* [BE:API] POST /api/auth/login { email, password }
       Simulating various error states for demo */
    setTimeout(() => {
      setLoading(false);

      if (email.includes("pending")) {
        setError("pending");
      } else if (email.includes("rejected")) {
        setError("rejected");
      } else if (email.includes("unknown")) {
        setError("not-found");
        setShakeKey((k) => k + 1);
      } else if (password !== "password123") {
        setError("wrong-password");
        setShakeKey((k) => k + 1);
      } else {
        setError(null);
        setSigningIn(true);
        /* [BE:AUTH] redirect based on role */
        setTimeout(() => {
          if (email.includes("creator")) {
            navigate("/creator/dashboard");
          } else {
            navigate("/brand/dashboard");
          }
        }, 400);
      }
    }, 800);
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
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#0D1F17" }}>
              Spread
            </span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#1A8A5A" }}>
              Em
            </span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[20px] border border-[#E2EAE6] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 style={{ color: "#0D1F17" }}>Welcome back</h2>
            <p className="mt-2" style={{ fontSize: 15, color: "#4A6358" }}>
              Sign in to your SpreadEm account
            </p>
          </div>

          {/* Banners (pending / rejected) */}
          {error === "pending" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 rounded-[12px] mb-6"
              style={{ backgroundColor: "#FFFBEB", border: "1px solid #D97706" }}
            >
              <Clock className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#D97706" }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#D97706", fontFamily: "var(--font-body)" }}>
                  Account under review
                </p>
                <p className="mt-1" style={{ fontSize: 13, color: "#4A6358", lineHeight: 1.6 }}>
                  Your account is under review. We'll email you within 48 hours.
                </p>
              </div>
            </motion.div>
          )}

          {error === "rejected" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 p-4 rounded-[12px] mb-6"
              style={{ backgroundColor: "#FEF2F2", border: "1px solid #DC2626" }}
            >
              <XCircle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#DC2626" }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 500, color: "#DC2626", fontFamily: "var(--font-body)" }}>
                  Account not approved
                </p>
                <p className="mt-1" style={{ fontSize: 13, color: "#4A6358", lineHeight: 1.6 }}>
                  Your application was not approved. Contact{" "}
                  <a href="mailto:hello@spreadem.in" className="no-underline" style={{ color: "#1A8A5A", fontWeight: 500 }}>
                    hello@spreadem.in
                  </a>{" "}
                  for more info.
                </p>
              </div>
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label
                className="block mb-1.5"
                style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}
              >
                Email Address
              </label>
              <motion.div key={`email-${shakeKey}`} animate={error === "not-found" ? shake : {}}>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(null); setFieldErrors((p) => ({...p, email: undefined})); }}
                  className={`w-full h-11 rounded-[8px] border bg-white px-4 outline-none transition-all ${
                    error === "not-found"
                      ? "border-[#DC2626] focus:shadow-[0_0_0_3px_#FEF2F2]"
                      : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"
                  }`}
                  style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" }}
                />
              </motion.div>
              {error === "not-found" && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                  style={{ fontSize: 13, color: "#DC2626", lineHeight: 1.5 }}
                >
                  No account with this email.{" "}
                  <Link to="/signup" className="no-underline" style={{ color: "#1A8A5A", fontWeight: 500 }}>
                    Sign up <span aria-hidden>→</span>
                  </Link>
                </motion.p>
              )}
              {fieldErrors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                  style={{ fontSize: 13, color: "#DC2626", lineHeight: 1.5 }}
                >
                  {fieldErrors.email}
                </motion.p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                className="block mb-1.5"
                style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}
              >
                Password
              </label>
              <motion.div key={`pw-${shakeKey}`} animate={error === "wrong-password" ? shake : {}} className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); setFieldErrors((p) => ({...p, password: undefined})); }}
                  className={`w-full h-11 rounded-[8px] border bg-white px-4 pr-11 outline-none transition-all ${
                    error === "wrong-password"
                      ? "border-[#DC2626] focus:shadow-[0_0_0_3px_#FEF2F2]"
                      : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"
                  }`}
                  style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" }}
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-[#F0F4F2] cursor-pointer transition-colors"
                >
                  {showPw ? (
                    <EyeOff className="w-4 h-4 text-[#8FA69C]" />
                  ) : (
                    <Eye className="w-4 h-4 text-[#8FA69C]" />
                  )}
                </button>
              </motion.div>

              {error === "wrong-password" ? (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                  style={{ fontSize: 13, color: "#DC2626", lineHeight: 1.5 }}
                >
                  Incorrect password. Try again or{" "}
                  <Link to="/forgot-password" className="no-underline" style={{ color: "#1A8A5A", fontWeight: 500 }}>
                    reset it <span aria-hidden>→</span>
                  </Link>
                </motion.p>
              ) : (
                <div className="flex justify-end mt-2">
                  <Link
                    to="/forgot-password"
                    className="no-underline"
                    style={{ fontSize: 13, color: "#1A8A5A", fontWeight: 500, fontFamily: "var(--font-body)" }}
                  >
                    Forgot password?
                  </Link>
                </div>
              )}
              {fieldErrors.password && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-2"
                  style={{ fontSize: 13, color: "#DC2626", lineHeight: 1.5 }}
                >
                  {fieldErrors.password}
                </motion.p>
              )}
            </div>

            {/* CTA */}
            <div className="mt-3">
              <Button
                variant="primary"
                className="w-full"
                disabled={!canSubmit}
                loading={loading}
                type="submit"
              >
                Sign In <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center" style={{ fontSize: 14, color: "#8FA69C" }}>
            New to SpreadEm?{" "}
            <Link to="/signup" className="no-underline" style={{ color: "#1A8A5A", fontWeight: 500 }}>
              Create an account <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </div>
    </motion.div>
  );
}