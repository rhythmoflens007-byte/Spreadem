import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router";
import { Button } from "../components/Buttons";
import { StatusBadge } from "../components/Badges";
import { ArrowLeft, ArrowRight, CheckCircle, X, Calendar, Users, Sparkles, ChevronDown } from "lucide-react";

interface CampaignData {
  id: string;
  title: string;
  brand: string;
  verified: boolean;
  description: string;
  requirements: string;
  platform: string;
  niches: string[];
  ppvRate: number;
  totalBudget: number;
  deadline: string;
  spotsRemaining: number;
}

const mockCampaigns: Record<string, CampaignData> = {
  c1: { id: "c1", title: "Summer Glow Reels", brand: "GlowSkin", verified: true, description: "Promote our new summer skincare line through engaging Reels. Show your morning/evening routine incorporating at least 2 of our products. Authentic, relatable content performs best.", requirements: "1 Instagram Reel (30–60s) + 2 Stories. Must mention @glowskin_in and use #SummerGlowChallenge. Show product in use, no static shots.", platform: "Instagram", niches: ["Beauty & Skincare", "Lifestyle"], ppvRate: 2, totalBudget: 150000, deadline: "2026-05-15", spotsRemaining: 8 },
  c2: { id: "c2", title: "Fitness Tracker Review", brand: "FitBuddy", verified: true, description: "Create an honest, in-depth review of the FitBuddy Pro smartwatch. Show it during workouts, daily wear, sleep tracking. Compare with competitors if you'd like.", requirements: "1 YouTube video (8–15 min). Include unboxing, feature walkthrough, and 1-week usage summary. Link in description required.", platform: "YouTube", niches: ["Fitness & Health", "Tech & Gadgets"], ppvRate: 5, totalBudget: 75000, deadline: "2026-05-30", spotsRemaining: 3 },
  c3: { id: "c3", title: "Protein Shake Challenge", brand: "NutriBlend", verified: false, description: "Create fun, high-energy content around our new protein shake flavours. Show creative recipes or workout + shake combos.", requirements: "1 Reel + 1 Story. Tag @nutriblend_in. Show the product clearly.", platform: "Instagram", niches: ["Fitness & Health"], ppvRate: 3, totalBudget: 50000, deadline: "2026-06-01", spotsRemaining: 12 },
  c4: { id: "c4", title: "Smartwatch Unboxing Series", brand: "TechNova", verified: true, description: "Unbox and review the TechNova X1 smartwatch. Focus on design, battery life, and smart features. Appeal to a tech-savvy Indian audience.", requirements: "1 YouTube video (10–20 min). Must include unboxing segment. Honest pros/cons encouraged.", platform: "YouTube", niches: ["Tech & Gadgets"], ppvRate: 4, totalBudget: 200000, deadline: "2026-06-15", spotsRemaining: 5 },
  c5: { id: "c5", title: "Monsoon Fashion Lookbook", brand: "StyleCraft", verified: false, description: "Put together 3–5 monsoon-ready outfits using StyleCraft pieces. Style them for different occasions — casual, work, date night.", requirements: "1 Reel (45–90s) showcasing all looks. Tag @stylecraft.in and #MonsoonReady.", platform: "Instagram", niches: ["Fashion & Style"], ppvRate: 2, totalBudget: 80000, deadline: "2026-07-01", spotsRemaining: 10 },
  c6: { id: "c6", title: "Monsoon Skincare Routine", brand: "DermaFix", verified: true, description: "Share your monsoon skincare routine featuring DermaFix products. Focus on humidity-proof routines and real results.", requirements: "1 YouTube video (5–10 min) or 1 Reel. Must show product application and mention key ingredients.", platform: "YouTube", niches: ["Beauty & Skincare"], ppvRate: 3, totalBudget: 120000, deadline: "2026-06-20", spotsRemaining: 2 },
};

function formatINR(n: number) { return "₹" + n.toLocaleString("en-IN"); }

const inputClass = "w-full h-11 rounded-[8px] border border-[#E2EAE6] bg-white px-4 outline-none focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all";
const inputStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 15, color: "#0D1F17" };
const labelStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" };

const platformOptions = ["Select platform", "Instagram", "YouTube", "Twitter", "LinkedIn"];

/* Sparkle burst */
function SparkleBurst() {
  const particles = Array.from({ length: 8 });
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((_, i) => {
        const angle = (i / 8) * 360;
        const rad = (angle * Math.PI) / 180;
        const tx = Math.cos(rad) * 40;
        const ty = Math.sin(rad) * 40;
        return (
          <motion.div
            key={i}
            initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            animate={{ opacity: 0, x: tx, y: ty, scale: 0 }}
            transition={{ duration: 0.5, delay: i * 0.03 }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Sparkles className="w-3 h-3 text-[#1A8A5A]" />
          </motion.div>
        );
      })}
    </div>
  );
}

export function CreatorCampaignDetail() {
  const { id } = useParams();
  const campaign = mockCampaigns[id || "c1"] || mockCampaigns["c1"];

  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showBurst, setShowBurst] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [contentLink, setContentLink] = useState("");
  const [platform, setPlatform] = useState("Select platform");
  const [notes, setNotes] = useState("");
  const [submitErrors, setSubmitErrors] = useState<{ contentLink?: string; platform?: string }>({});

  const canSubmit = contentLink.trim().length > 0 && platform !== "Select platform";

  /* URL must be a valid Instagram reel or YouTube link */
  const validContentUrl = (url: string) => {
    try {
      const u = new URL(url);
      return u.hostname.includes("instagram.com") || u.hostname.includes("youtube.com") || u.hostname.includes("youtu.be");
    } catch { return false; }
  };

  const validateSubmission = (): boolean => {
    const errs: { contentLink?: string; platform?: string } = {};
    if (!contentLink.trim()) {
      errs.contentLink = "Content link is required.";
    } else if (!validContentUrl(contentLink.trim())) {
      errs.contentLink = "Enter a valid Instagram or YouTube URL.";
    }
    if (platform === "Select platform") errs.platform = "Please select the platform your content is on.";
    setSubmitErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = () => {
    if (!validateSubmission()) return;
    setSubmitting(true);
    /* [BE:API] POST /api/submissions { campaign_id, content_link, platform, notes } */
    /* [BE:CHECK] Duplicate check → toast error "You've already submitted to this campaign." */
    setTimeout(() => {
      setSubmitting(false);
      setModalOpen(false);
      setSubmitted(true);
      setShowBurst(true);
      setTimeout(() => setShowBurst(false), 600);
    }, 1000);
  };

  const deadlineFormatted = new Date(campaign.deadline).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      {/* Back nav */}
      <Link
        to="/creator/campaigns"
        className="inline-flex items-center gap-1.5 no-underline mb-8 px-3 py-2 -ml-3 rounded-[8px] hover:bg-[#F0F4F2] transition-colors"
        style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#4A6358" }}
      >
        <ArrowLeft className="w-4 h-4" /> Browse Campaigns
      </Link>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* LEFT — 70% */}
        <div className="flex-1 lg:max-w-[calc(70%-16px)]">
          {/* Title + Brand */}
          <h2 style={{ color: "#0D1F17" }}>{campaign.title}</h2>
          <div className="flex items-center gap-2 mt-3">
            <div className="w-7 h-7 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0">
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 12, fontWeight: 600, color: "#1A8A5A" }}>
                {campaign.brand[0]}
              </span>
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "#0D1F17" }}>
              {campaign.brand}
            </span>
            {campaign.verified && <CheckCircle className="w-4 h-4 text-[#1A8A5A]" />}
          </div>

          {/* Sections */}
          <div className="mt-10 flex flex-col gap-8">
            <Section title="Product Description" body={campaign.description} />
            <Section title="Content Requirements" body={campaign.requirements} />

            <div>
              <span style={labelStyle}>Platform</span>
              <p className="mt-2">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#E2EAE6] bg-[#F8FAF9]" style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#4A6358" }}>
                  {campaign.platform}
                </span>
              </p>
            </div>

            <div>
              <span style={labelStyle}>Niche Tags</span>
              <div className="flex flex-wrap gap-2 mt-2">
                {campaign.niches.map((n) => (
                  <span
                    key={n}
                    className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#E8F5EE] border border-[#B3DFC8]"
                    style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#0A4D32" }}
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Sticky sidebar 30% */}
        <div className="lg:w-[30%] shrink-0">
          <div className="lg:sticky lg:top-24">
            <div className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 relative">
              {showBurst && <SparkleBurst />}

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div key="pre" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Row label="PPV Rate" value={`₹${campaign.ppvRate}/1,000 views`} />
                    <div className="mt-4">
                      <span style={labelStyle}>Total Budget</span>
                      <p className="mt-1" style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "#1A8A5A", letterSpacing: "-0.02em" }}>
                        {formatINR(campaign.totalBudget)}
                      </p>
                    </div>
                    <div className="border-t border-[#E2EAE6] my-5" />
                    <Row label="Deadline" value={deadlineFormatted} icon={<Calendar className="w-3.5 h-3.5 text-[#8FA69C]" />} />
                    <Row label="Spots Remaining" value={`${campaign.spotsRemaining} open`} icon={<Users className="w-3.5 h-3.5 text-[#8FA69C]" />} warn={campaign.spotsRemaining < 5} />

                    <Button variant="primary" className="w-full mt-6" onClick={() => setModalOpen(true)}>
                      Submit Content <ArrowRight className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div key="post" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }} className="text-center py-4">
                    <div className="w-14 h-14 rounded-full bg-[#FFFBEB] flex items-center justify-center mx-auto mb-4">
                      <Sparkles className="w-7 h-7 text-[#D97706]" />
                    </div>
                    <h4 style={{ color: "#0D1F17" }}>Submitted — Under Review</h4>
                    <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358", lineHeight: 1.6 }}>
                      We'll notify you once the brand reviews your submission.
                    </p>
                    <div className="mt-4 flex justify-center">
                      <StatusBadge variant="pending" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-[20px] p-8 max-w-[480px] w-full shadow-xl relative"
            >
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-[8px] hover:bg-[#F0F4F2] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-[#8FA69C]" />
              </button>

              <h3 style={{ color: "#0D1F17" }}>Submit your content</h3>
              <p className="mt-1 mb-6" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}>
                Share your content link for "{campaign.title}"
              </p>

              <div className="flex flex-col gap-5">
                <div>
                  <label className="block mb-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
                    Content Link <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://instagram.com/reel/... or https://youtube.com/..."
                    value={contentLink}
                    onChange={(e) => { setContentLink(e.target.value); setSubmitErrors((p) => ({ ...p, contentLink: undefined })); }}
                    className={`${inputClass} ${submitErrors.contentLink ? "!border-[#DC2626] !shadow-[0_0_0_3px_#FEF2F2]" : ""}`}
                    style={inputStyle}
                  />
                  {submitErrors.contentLink && (
                    <p className="mt-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#DC2626" }}>{submitErrors.contentLink}</p>
                  )}
                </div>

                <div>
                  <label className="block mb-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
                    Platform <span style={{ color: "#DC2626" }}>*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={platform}
                      onChange={(e) => setPlatform(e.target.value)}
                      className={`${inputClass} appearance-none pr-10 cursor-pointer`}
                      style={{ ...inputStyle, color: platform === "Select platform" ? "#8FA69C" : "#0D1F17" }}
                    >
                      {platformOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8FA69C] pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block mb-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
                    Notes <span style={{ color: "#8FA69C", fontWeight: 400 }}>(optional)</span>
                  </label>
                  <textarea
                    placeholder="Any context you'd like to share with the brand..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    className="w-full rounded-[8px] border border-[#E2EAE6] bg-white px-4 py-3 outline-none focus:border-[#1A8A5A] focus:shadow-[0_0_0_3px_#E8F5EE] transition-all resize-none"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <Button variant="primary" disabled={!canSubmit} loading={submitting} onClick={handleSubmit}>
                  Submit for Review <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Section({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}>
        {title}
      </span>
      <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#0D1F17", lineHeight: 1.7 }}>
        {body}
      </p>
    </div>
  );
}

function Row({ label, value, icon, warn }: { label: string; value: string; icon?: React.ReactNode; warn?: boolean }) {
  return (
    <div className="flex items-center justify-between mt-3 first:mt-0">
      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}>
        {label}
      </span>
      <span className="flex items-center gap-1.5" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: warn ? "#D97706" : "#0D1F17" }}>
        {icon} {value}
      </span>
    </div>
  );
}