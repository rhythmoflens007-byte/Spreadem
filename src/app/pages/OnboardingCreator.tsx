import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "../components/Buttons";
import { Link, useNavigate } from "react-router";
import { ArrowRight, Lock, ChevronDown, AlertCircle } from "lucide-react";

const platformOptions = ["Instagram", "YouTube", "Twitter", "LinkedIn"] as const;
type Platform = (typeof platformOptions)[number];

const nicheOptions = [
  "Select niche",
  "Beauty & Skincare",
  "Fitness & Health",
  "Tech & Gadgets",
  "Fashion & Style",
  "Finance & Business",
  "Food & Lifestyle",
  "Travel & Adventure",
  "Education & Learning",
];

const followerRanges = [
  "Select range",
  "1K – 10K (Nano)",
  "10K – 50K (Micro)",
  "50K – 1L (Mid-tier)",
  "1L – 5L (Macro)",
  "5L+ (Mega)",
];

const inputClass =
  "w-full h-11 rounded-[8px] border border-[#E2EAE6] bg-white px-4 outline-none focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all";
const inputStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" };

/* Validation rules */
const urlRegex = /^https?:\/\/.+\..+/;
const handleRegex = /^[a-zA-Z0-9._]+$/;

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block mb-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="mt-1.5 flex items-center gap-1.5"
          style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#DC2626" }}
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}

export function OnboardingCreator() {
  const [handle, setHandle] = useState("");
  const [platform, setPlatform] = useState<Platform>("Instagram");
  const [profileUrl, setProfileUrl] = useState("");
  const [bio, setBio] = useState("");
  const [niche, setNiche] = useState("Select niche");
  const [followers, setFollowers] = useState("Select range");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const clearError = (key: string) => setErrors((e) => { const n = { ...e }; delete n[key]; return n; });

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (!handle.trim()) {
      errs.handle = "Creator handle is required.";
    } else if (!handleRegex.test(handle.trim())) {
      errs.handle = "Handle can only contain letters, numbers, dots and underscores — no spaces.";
    }
    if (!profileUrl.trim()) {
      errs.profileUrl = "Profile URL is required.";
    } else if (!urlRegex.test(profileUrl.trim())) {
      errs.profileUrl = "Enter a valid URL (e.g. https://instagram.com/yourhandle).";
    }
    if (!bio.trim()) {
      errs.bio = "Bio is required.";
    } else if (bio.trim().length < 20) {
      errs.bio = "Bio must be at least 20 characters. Tell brands about your content and audience.";
    }
    if (niche === "Select niche") errs.niche = "Please select your content niche.";
    if (followers === "Select range") errs.followers = "Please select your follower range.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setLoading(true);
    /* [BE:API] POST /api/onboarding/creator */
    setTimeout(() => {
      setLoading(false);
      navigate("/pending");
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="min-h-screen flex items-center justify-center px-6 py-24 md:py-32"
      style={{ backgroundColor: "#F8FAF9" }}
    >
      <div className="w-full max-w-[560px]">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center no-underline">
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#0D1F17" }}>Spread</span>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: 24, fontWeight: 600, color: "#1A8A5A" }}>Em</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[20px] border border-[#E2EAE6] p-8 md:p-10 shadow-[0_4px_40px_rgba(0,0,0,0.04)]">
          {/* Progress */}
          <div className="flex items-center justify-between mb-6">
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}>
              Step 1 of 1
            </span>
            <div className="flex-1 mx-4 h-1.5 rounded-full bg-[#E2EAE6] overflow-hidden">
              <div className="h-full rounded-full bg-[#1A8A5A] w-full" />
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 style={{ color: "#0D1F17" }}>Set up your creator profile</h2>
            <p className="mt-2" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
              We review every creator application to keep the marketplace safe and high-quality.
            </p>
          </div>

          {/* Fields */}
          <div className="flex flex-col gap-5">
            <FormField label="Creator Handle *">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: 15, color: "#8FA69C" }}>@</span>
                <input
                  type="text"
                  placeholder="yourhandle"
                  value={handle}
                  onChange={(e) => { setHandle(e.target.value); clearError("handle"); }}
                  className={`${errors.handle ? "w-full h-11 rounded-[8px] border border-[#DC2626] shadow-[0_0_0_3px_#FEF2F2] bg-white px-4 outline-none transition-all pl-9" : inputClass + " pl-9"}`}
                  style={inputStyle}
                />
              </div>
              <FieldError msg={errors.handle} />
            </FormField>

            {/* Platform toggle */}
            <FormField label="Primary Platform">
              <div className="flex gap-2 flex-wrap">
                {platformOptions.map((p) => (
                  <motion.button
                    key={p}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setPlatform(p)}
                    className="px-4 h-11 rounded-[8px] border-2 cursor-pointer transition-colors"
                    style={{
                      borderColor: platform === p ? "#1A8A5A" : "#E2EAE6",
                      backgroundColor: platform === p ? "#E8F5EE" : "#FFFFFF",
                      color: platform === p ? "#0A4D32" : "#4A6358",
                      fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500,
                    }}
                  >
                    {p}
                  </motion.button>
                ))}
              </div>
            </FormField>

            <FormField label="Profile URL *">
              <input
                type="url"
                placeholder={`https://${platform.toLowerCase()}.com/yourhandle`}
                value={profileUrl}
                onChange={(e) => { setProfileUrl(e.target.value); clearError("profileUrl"); }}
                className={errors.profileUrl ? "w-full h-11 rounded-[8px] border border-[#DC2626] shadow-[0_0_0_3px_#FEF2F2] bg-white px-4 outline-none transition-all" : inputClass}
                style={inputStyle}
              />
              <FieldError msg={errors.profileUrl} />
            </FormField>

            <FormField label="Bio *">
              <textarea
                placeholder="Tell brands what you create and who your audience is (min 20 characters)"
                value={bio}
                onChange={(e) => { setBio(e.target.value); clearError("bio"); }}
                rows={3}
                maxLength={300}
                className={`w-full rounded-[8px] border bg-white px-4 py-3 outline-none transition-all resize-none ${errors.bio ? "border-[#DC2626] shadow-[0_0_0_3px_#FEF2F2]" : "border-[#E2EAE6] focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE]"}`}
                style={inputStyle}
              />
              <div className="flex items-center justify-between mt-1">
                <FieldError msg={errors.bio} />
                <p style={{ fontSize: 12, color: "#8FA69C", flexShrink: 0 }}>{bio.length}/300</p>
              </div>
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <FormField label="Niche *">
                  <div className="relative">
                    <select
                      value={niche}
                      onChange={(e) => { setNiche(e.target.value); clearError("niche"); }}
                      className={`${errors.niche ? "w-full h-11 rounded-[8px] border border-[#DC2626] bg-white px-4 outline-none transition-all appearance-none pr-10 cursor-pointer" : inputClass + " appearance-none pr-10 cursor-pointer"}`}
                      style={{ ...inputStyle, color: niche === "Select niche" ? "#8FA69C" : "#0D1F17" }}
                    >
                      {nicheOptions.map((n) => (<option key={n} value={n}>{n}</option>))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA69C] pointer-events-none" />
                  </div>
                </FormField>
                <FieldError msg={errors.niche} />
              </div>

              <div>
                <FormField label="Approximate Followers *">
                  <div className="relative">
                    <select
                      value={followers}
                      onChange={(e) => { setFollowers(e.target.value); clearError("followers"); }}
                      className={`${errors.followers ? "w-full h-11 rounded-[8px] border border-[#DC2626] bg-white px-4 outline-none transition-all appearance-none pr-10 cursor-pointer" : inputClass + " appearance-none pr-10 cursor-pointer"}`}
                      style={{ ...inputStyle, color: followers === "Select range" ? "#8FA69C" : "#0D1F17" }}
                    >
                      {followerRanges.map((f) => (<option key={f} value={f}>{f}</option>))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA69C] pointer-events-none" />
                  </div>
                </FormField>
                <FieldError msg={errors.followers} />
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8">
            <Button variant="primary" className="w-full" loading={loading} onClick={handleSubmit}>
              Submit for Review <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          {/* Footer note */}
          <div className="flex items-center justify-center gap-1.5 mt-5">
            <Lock className="w-3.5 h-3.5 text-[#8FA69C]" />
            <p style={{ fontSize: 13, color: "#8FA69C" }}>
              Your information is encrypted and only used for verification.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}