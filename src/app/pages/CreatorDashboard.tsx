import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/Buttons";
import { StatusBadge } from "../components/Badges";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { ArrowRight, Send, CheckCircle2, IndianRupee, Video, Sparkles } from "lucide-react";

/* ── FEATURED CAMPAIGNS FOR HERO CAROUSEL ── */
const featuredCampaigns = [
  { id: "c1", title: "Monsoon Skincare Routine — UGC Reels", brand: "Nykaa", niche: "Beauty", ppv: "₹1.20", cover: "https://images.unsplash.com/photo-1697309006580-cda397ee09c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3NtZXRpY3MlMjBiZWF1dHklMjBicmFuZCUyMHByb2R1Y3R8ZW58MXx8fHwxNzc2NDI2NzMxfDA&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "c2", title: "30-Day Transform Challenge", brand: "CureFit", niche: "Fitness", ppv: "₹1.80", cover: "https://images.unsplash.com/photo-1668260948546-e5ba33085688?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwYWN0aXZld2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMXww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "c3", title: "Wireless Earbuds Review", brand: "boAt", niche: "Tech", ppv: "₹0.90", cover: "https://images.unsplash.com/photo-1660921436563-65ec990056e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNoJTIwZ2FkZ2V0JTIwcHJvZHVjdCUyMHBob3RvZ3JhcGh5fGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "c4", title: "Streetwear Haul — OOTD Videos", brand: "Bewakoof", niche: "Fashion", ppv: "₹1.50", cover: "https://images.unsplash.com/photo-1760736534430-ed4a321e108f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwc3RyZWV0d2VhciUyMGJyYW5kfGVufDF8fHx8MTc3NjQyNjczMnww&ixlib=rb-4.1.0&q=80&w=1080" },
  { id: "c5", title: "Finance Explainer Shorts", brand: "Groww", niche: "Finance", ppv: "₹2.00", cover: "https://images.unsplash.com/photo-1582005450386-52b25f82d9bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMG1hcmtldGluZyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc3NjQyNjczMHww&ixlib=rb-4.1.0&q=80&w=1080" },
];

/* ───── mock data — [BE:API] GET /api/creator/dashboard ───── */
const stats = [
  { label: "Active Submissions", value: "4", icon: Send, link: null },
  { label: "Approved", value: "12", icon: CheckCircle2, link: null },
  { label: "Total Earned (₹)", value: "₹1,84,500", icon: IndianRupee, link: "/creator/earnings" },
];

interface Submission {
  id: string;
  campaignId: string;
  campaign: string;
  brand: string;
  status: "pending" | "escrow" | "live" | "completed" | "rejected" | "paidout";
  submitted: string;
}

const submissions: Submission[] = [
  { id: "s1", campaignId: "c1", campaign: "Summer Glow Reels", brand: "GlowSkin", status: "live", submitted: "12 Apr 2026" },
  { id: "s2", campaignId: "c6", campaign: "Monsoon Skincare Launch", brand: "DermaFix", status: "pending", submitted: "10 Apr 2026" },
  { id: "s3", campaignId: "c4", campaign: "Diwali Gift Box Unboxing", brand: "GiftKaro", status: "paidout", submitted: "5 Apr 2026" },
  { id: "s4", campaignId: "c2", campaign: "Fitness Tracker Review", brand: "FitBuddy", status: "completed", submitted: "1 Apr 2026" },
  { id: "s5", campaignId: "c3", campaign: "Protein Shake Challenge", brand: "NutriBlend", status: "rejected", submitted: "28 Mar 2026" },
];

const hour = new Date().getHours();
const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 12,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#8FA69C",
};

export function CreatorDashboard() {
  const hasSubmissions = submissions.length > 0;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveSlide((p) => (p + 1) % featuredCampaigns.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const currentCampaign = featuredCampaigns[activeSlide];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      {/* Greeting */}
      <h2 style={{ color: "#0D1F17" }}>{greeting}, @snehavibes</h2>
      <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#4A6358" }}>
        Here's what's happening with your campaigns.
      </p>

      {/* Hero Banner */}
      <div className="bg-white rounded-[16px] border border-[#E2EAE6] overflow-hidden mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="flex-[3] p-8 flex flex-col justify-center">
            <span style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#1A8A5A" }}>
              Top campaigns this week
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
                {currentCampaign.title}
              </motion.h2>
            </AnimatePresence>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span style={{ fontSize: 14, color: "#4A6358" }}>{currentCampaign.brand}</span>
              <span className="bg-[#F0F4F2] text-[#4A6358] px-3 py-1 rounded-full" style={{ fontSize: 12, fontWeight: 500 }}>{currentCampaign.niche}</span>
              <span style={{ fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}>{currentCampaign.ppv}/view</span>
            </div>
            <div className="mt-6">
              <Link to={`/creator/campaigns/${currentCampaign.id}`} className="no-underline">
                <Button variant="primary" size="small">View Campaign <ArrowRight className="w-3.5 h-3.5" /></Button>
              </Link>
            </div>
            <div className="flex gap-2 mt-6">
              {featuredCampaigns.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className="rounded-full cursor-pointer transition-all border-none p-0"
                  style={{
                    width: 8, height: 8,
                    backgroundColor: i === activeSlide ? "#1A8A5A" : "transparent",
                    border: i === activeSlide ? "none" : "1.5px solid #E2EAE6",
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex-[2] bg-[#F0F4F2] min-h-[220px] md:min-h-0 flex items-center justify-center p-4">
            <AnimatePresence mode="wait">
              <motion.div key={activeSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="w-full aspect-video rounded-[16px] overflow-hidden">
                <ImageWithFallback src={currentCampaign.cover} alt={currentCampaign.title} className="w-full h-full object-cover rounded-[16px]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const isClickable = !!s.link;
          const Card = isClickable ? Link : "div";
          const cardProps = isClickable ? { to: s.link!, className: "no-underline" } : {};

          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
            >
              <Card {...(cardProps as any)}>
                <motion.div
                  whileHover={isClickable ? { scale: 1.01, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" } : {}}
                  transition={{ duration: 0.2 }}
                  className={`bg-white rounded-[16px] border border-[#E2EAE6] p-6 flex items-start justify-between ${isClickable ? "cursor-pointer" : ""}`}
                >
                  <div>
                    <span style={labelStyle}>{s.label}</span>
                    <p
                      className="mt-2"
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: 28,
                        fontWeight: 600,
                        color: "#0D1F17",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {s.value}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-[10px] bg-[#E8F5EE] flex items-center justify-center shrink-0">
                    {isClickable ? (
                      <ArrowRight className="w-5 h-5 text-[#1A8A5A]" />
                    ) : (
                      <Icon className="w-5 h-5 text-[#1A8A5A]" />
                    )}
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Recent Submissions */}
      <div className="mt-12 flex items-center justify-between mb-5">
        <h3 style={{ color: "#0D1F17" }}>Recent Submissions</h3>
        <Link to="/creator/campaigns" className="no-underline">
          <Button variant="primary" size="small">
            Browse Campaigns <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </div>

      {hasSubmissions ? (
        <div className="bg-white rounded-[16px] border border-[#E2EAE6] overflow-hidden">
          {/* Header */}
          <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_100px] gap-4 px-6 py-3.5 border-b border-[#E2EAE6] bg-[#F8FAF9]">
            {["Campaign", "Brand", "Status", "Submitted", "Action"].map((h) => (
              <span key={h} style={labelStyle}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {submissions.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_100px] gap-2 md:gap-4 items-center px-6 py-4 border-b border-[#E2EAE6] last:border-b-0 hover:bg-[#F8FAF9] transition-colors"
            >
              {/* Campaign */}
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
                {s.campaign}
              </span>

              {/* Brand */}
              <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358" }}>
                {s.brand}
              </span>

              {/* Status */}
              <div className="hidden md:block">
                <StatusBadge variant={s.status} />
              </div>

              {/* Submitted */}
              <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}>
                {s.submitted}
              </span>

              {/* Action */}
              {/* ⚠ Links use campaignId from submission data — not submissionId.
                  Old connection /creator/campaigns/s1 was wrong ID type. */}
              <Link
                to={`/creator/campaigns/${s.campaignId}`}
                className="no-underline inline-flex items-center gap-1"
                style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}
              >
                View <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              {/* Mobile extras */}
              <div className="flex md:hidden items-center gap-3 flex-wrap">
                <span style={{ fontSize: 13, color: "#4A6358" }}>{s.brand}</span>
                <StatusBadge variant={s.status} />
                <span style={{ fontSize: 12, color: "#8FA69C" }}>{s.submitted}</span>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="bg-white rounded-[16px] border border-[#E2EAE6] py-20 px-8 flex flex-col items-center text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-20 h-20 rounded-full bg-[#E8F5EE] flex items-center justify-center mb-6"
          >
            <Video className="w-9 h-9 text-[#1A8A5A]" />
          </motion.div>
          <h3 style={{ color: "#0D1F17" }}>Your first payout is one campaign away.</h3>
          <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
            Browse live campaigns from brands, submit your content, and start earning based on real views.
          </p>
          <div className="mt-6">
            <Link to="/creator/campaigns" className="no-underline">
              <Button variant="primary">
                Browse Campaigns <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}