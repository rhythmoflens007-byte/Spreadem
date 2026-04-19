import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/Buttons";
import { Link } from "react-router";
import { ArrowRight, Mail, ArrowLeft } from "lucide-react";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    /* Client-side email format validation */
    if (!email.trim()) { setError("Email address is required."); return; }
    if (!emailRegex.test(email.trim())) { setError("Enter a valid email address (e.g. you@example.com)."); return; }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email.includes("unknown")) {
        setError("No account found with this email address.");
      } else {
        setSent(true);
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
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center no-underline">
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#0D1F17" }}>Spread</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
          </Link>
        </div>

        <div className="bg-white rounded-[20px] border border-[#E2EAE6] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
                <div className="text-center mb-8">
                  <h2 style={{ color: "#0D1F17" }}>Reset your password</h2>
                  <p className="mt-2" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                    Enter the email linked to your account and we'll send a reset link.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <label className="block mb-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(null); }}
                      className={`w-full h-11 rounded-[8px] border bg-white px-4 outline-none transition-all ${
                        error ? "border-[#DC2626] focus:shadow-[0_0_0_3px_#FEF2F2]" : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"
                      }`}
                      style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" }}
                    />
                    {error && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-2" style={{ fontSize: 13, color: "#DC2626" }}>
                        {error}
                      </motion.p>
                    )}
                  </div>

                  <Button variant="primary" className="w-full" disabled={!email.trim()} loading={loading} type="submit">
                    Send Reset Link <ArrowRight className="w-4 h-4" />
                  </Button>
                </form>

                <p className="mt-6 text-center" style={{ fontSize: 14, color: "#8FA69C" }}>
                  <Link to="/signin" className="no-underline" style={{ color: "#1A8A5A", fontWeight: 500 }}>
                    <ArrowLeft className="w-3.5 h-3.5 inline mr-1" style={{ verticalAlign: "middle" }} />Back to Sign In
                  </Link>
                </p>
              </motion.div>
            ) : (
              <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="text-center">
                <div className="w-14 h-14 rounded-full bg-[#E8F5EE] flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-6 h-6 text-[#1A8A5A]" />
                </div>
                <h3 style={{ color: "#0D1F17" }}>Check your inbox</h3>
                <p className="mt-3 mx-auto max-w-xs" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
                  We've sent a password reset link to <strong style={{ color: "#0D1F17", fontWeight: 500 }}>{email}</strong>. It expires in 30 minutes.
                </p>
                <p className="mt-2" style={{ fontSize: 13, color: "#8FA69C" }}>
                  Didn't get it? Check your spam folder.
                </p>
                <div className="mt-8">
                  <Link to="/signin">
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