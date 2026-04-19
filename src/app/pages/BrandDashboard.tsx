import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { StatCard } from "../components/StatCard";
import { StatusBadge } from "../components/Badges";
import { Button } from "../components/Buttons";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, Megaphone } from "lucide-react";

type BadgeVariant = "pending" | "escrow" | "live" | "completed" | "rejected" | "paidout";

interface Campaign {
  id: string;
  name: string;
  status: BadgeVariant;
  budget: string;
  submissions: number;
  created: string;
}

const mockCampaigns: Campaign[] = [
  { id: "1", name: "Summer Glow Reels", status: "live", budget: "₹1,50,000", submissions: 12, created: "12 Apr 2026" },
  { id: "2", name: "Monsoon Skincare Launch", status: "escrow", budget: "₹75,000", submissions: 0, created: "10 Apr 2026" },
  { id: "3", name: "Diwali Gift Box Unboxing", status: "completed", budget: "₹2,00,000", submissions: 24, created: "28 Mar 2026" },
  { id: "4", name: "New Year Influencer Push", status: "paidout", budget: "₹3,50,000", submissions: 18, created: "15 Mar 2026" },
  { id: "5", name: "Spring Collection Teaser", status: "pending", budget: "₹50,000", submissions: 0, created: "16 Apr 2026" },
  { id: "6", name: "Valentine's Day Special", status: "rejected", budget: "₹80,000", submissions: 0, created: "5 Feb 2026" },
];

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

export function BrandDashboard() {
  const [campaigns] = useState<Campaign[]>(mockCampaigns);
  const hasCampaigns = campaigns.length > 0;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((p) => (p + 1) % featuredCreators.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const currentCreator = featuredCreators[activeSlide];

  const stats = [
    { label: "Total Campaigns", value: String(campaigns.length), delta: { value: "+2 this month", positive: true } },
    { label: "Budget in Reserve", value: formatINR(225000), delta: { value: "₹75K secured", positive: true } },
    { label: "Active Campaigns", value: String(campaigns.filter((c) => c.status === "live").length), delta: { value: "1 pending review", positive: true } },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      {/* Greeting */}
      <h2 style={{ color: "#0D1F17" }}>{getGreeting()}, GlowSkin</h2>
      <p className="mt-1" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
        Here's what's happening with your campaigns today.
      </p>

      {/* Hero Banner */}
      <div className="bg-white rounded-[16px] border border-[#E2EAE6] overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          {/* Left 60% */}
          <div className="flex-[3] p-8 flex flex-col justify-center">
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1A8A5A" }}>
              Featured creators this week
            </span>
            <AnimatePresence mode="wait">
              <motion.h2
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-3"
                style={{ color: "#0D1F17" }}
              >
                {currentCreator.handle}
              </motion.h2>
            </AnimatePresence>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-1 rounded-full" style={{ fontSize: 12, fontWeight: 500 }}>{currentCreator.niche}</span>
              <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-1 rounded-full" style={{ fontSize: 12, fontWeight: 500 }}>{currentCreator.platform}</span>
              <span style={{ fontSize: 14, color: "#4A6358" }}>{currentCreator.followers} followers</span>
            </div>
            <div className="mt-6">
              <Link to={`/brand/creators/${currentCreator.id}`} className="no-underline">
                <Button variant="outline" size="small">View Profile <ArrowRight className="w-3.5 h-3.5" /></Button>
              </Link>
            </div>
            {/* Dots */}
            <div className="flex gap-2 mt-6">
              {featuredCreators.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className="rounded-full cursor-pointer transition-all border-none p-0"
                  style={{
                    width: 8,
                    height: 8,
                    backgroundColor: i === activeSlide ? "#1A8A5A" : "transparent",
                    border: i === activeSlide ? "none" : "1.5px solid #E2EAE6",
                  }}
                />
              ))}
            </div>
          </div>
          {/* Right 40% */}
          <div className="flex-[2] bg-[#F0F4F2] min-h-[220px] md:min-h-0 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ImageWithFallback src={currentCreator.avatar} alt={currentCreator.name} className="w-32 h-32 rounded-[16px] object-cover" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: i * 0.08 }}
          >
            <StatCard label={s.label} value={s.value} delta={s.delta} />
          </motion.div>
        ))}
      </div>

      {/* Section header */}
      <div className="flex items-center justify-between mt-14 mb-6">
        <h3 style={{ color: "#0D1F17" }}>My Campaigns</h3>
        <Link to="/brand/campaigns/new" className="no-underline">
          <Button variant="primary" size="small">
            Create Campaign <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {hasCampaigns ? (
        /* Data table */
        <div className="bg-white rounded-[16px] border border-[#E2EAE6] overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] gap-4 px-6 py-3.5 border-b border-[#E2EAE6] bg-[#F8FAF9]">
            {["Campaign", "Status", "Budget", "Submissions", "Created", "Action"].map((h) => (
              <span
                key={h}
                style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}
              >
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {campaigns.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_100px] gap-2 md:gap-4 items-center px-6 py-4 border-b border-[#E2EAE6] last:border-b-0 hover:bg-[#F8FAF9] transition-colors"
            >
              {/* Campaign name */}
              <span style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "#0D1F17" }}>
                {c.name}
              </span>

              {/* Status */}
              <div>
                <StatusBadge variant={c.status} />
              </div>

              {/* Budget */}
              <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#0D1F17" }}>
                {c.budget}
              </span>

              {/* Submissions */}
              <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358" }}>
                {c.submissions}
              </span>

              {/* Created */}
              <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}>
                {c.created}
              </span>

              {/* Action */}
              <div>
                {c.status !== "pending" ? (
                  <Link
                    to={`/brand/campaigns/${c.id}`}
                    className="no-underline inline-flex items-center gap-1"
                    style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}
                  >
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span style={{ fontSize: 13, color: "#8FA69C" }}>—</span>
                )}
              </div>

              {/* Mobile: extra info */}
              <div className="flex md:hidden items-center gap-3 flex-wrap">
                <span style={{ fontSize: 13, color: "#4A6358" }}>{c.budget}</span>
                <span style={{ fontSize: 13, color: "#8FA69C" }}>{c.submissions} submissions</span>
                <span style={{ fontSize: 13, color: "#8FA69C" }}>{c.created}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="bg-white rounded-[16px] border border-[#E2EAE6] py-20 px-8 flex flex-col items-center text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-[#E8F5EE] flex items-center justify-center mb-6"
          >
            <Megaphone className="w-9 h-9 text-[#1A8A5A]" />
          </motion.div>
          <h3 style={{ color: "#0D1F17" }}>Your first campaign is one click away.</h3>
          <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
            Launch a campaign, set your budget, and start receiving creator applications within hours.
          </p>
          <div className="mt-8">
            <Link to="/brand/campaigns/new" className="no-underline">
              <Button variant="primary">
                Create your first campaign <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

/* ── FEATURED CREATORS FOR HERO CAROUSEL ── */
const featuredCreators = [
  { id: "c1", handle: "@priyasharma", name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1600430665436-d4ff685937eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQxNDE2NHww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Beauty", platform: "YouTube", followers: "124K" },
  { id: "c2", handle: "@techvivek", name: "Vivek Rao", avatar: "https://images.unsplash.com/photo-1728015401182-1c715f133d5d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBtYW4lMjBwb3J0cmFpdCUyMHlvdW5nJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3NjQyNzIwM3ww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Tech", platform: "Instagram", followers: "89K" },
  { id: "c3", handle: "@ananyafitlife", name: "Ananya Gupta", avatar: "https://images.unsplash.com/photo-1761933808230-9a2e78956daa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwc21pbGluZyUyMGhlYWRzaG90fGVufDF8fHx8MTc3NjM0Mjg1OXww&ixlib=rb-4.1.0&q=80&w=1080", niche: "Fitness", platform: "YouTube", followers: "210K" },
  { id: "c4", handle: "@rahulcooks", name: "Rahul Menon", avatar: "https://images.unsplash.com/photo-1762708590808-c453c0e4fb0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NzY0MjcyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080", niche: "Food", platform: "Instagram", followers: "340K" },
  { id: "c5", handle: "@nehastyle", name: "Neha Kapoor", avatar: "https://images.unsplash.com/photo-1641108001784-cdf7d87b353f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBjcmVhdG9yJTIwcG9ydHJhaXQlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzY0MjcyMDR8MA&ixlib=rb-4.1.0&q=80&w=1080", niche: "Fashion", platform: "YouTube", followers: "67K" },
];
