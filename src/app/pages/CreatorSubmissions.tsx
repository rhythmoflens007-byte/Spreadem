import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/Buttons";
import { StatusBadge } from "../components/Badges";
import { ArrowRight, ExternalLink, Send } from "lucide-react";

interface Submission {
  id: string;
  campaign: string;
  brand: string;
  submitted: string;
  status: "pending" | "escrow" | "live" | "completed" | "rejected" | "paidout";
  views: string;
  earnings: string;
  contentLink: string;
}

const submissions: Submission[] = [
  { id: "s1", campaign: "Summer Glow Reels", brand: "GlowSkin", submitted: "12 Apr 2026", status: "live", views: "24,300", earnings: "₹486", contentLink: "https://instagram.com/reel/abc123" },
  { id: "s2", campaign: "Monsoon Skincare Launch", brand: "DermaFix", submitted: "10 Apr 2026", status: "pending", views: "—", earnings: "—", contentLink: "https://youtube.com/watch?v=xyz" },
  { id: "s3", campaign: "Diwali Gift Box Unboxing", brand: "GiftKaro", submitted: "5 Apr 2026", status: "paidout", views: "1,82,400", earnings: "₹5,472", contentLink: "https://instagram.com/reel/def456" },
  { id: "s4", campaign: "Fitness Tracker Review", brand: "FitBuddy", submitted: "1 Apr 2026", status: "completed", views: "67,800", earnings: "₹3,390", contentLink: "https://youtube.com/watch?v=ghi" },
  { id: "s5", campaign: "Protein Shake Challenge", brand: "NutriBlend", submitted: "28 Mar 2026", status: "rejected", views: "—", earnings: "—", contentLink: "https://instagram.com/reel/jkl789" },
  { id: "s6", campaign: "Smartwatch Unboxing Series", brand: "TechNova", submitted: "15 Mar 2026", status: "paidout", views: "45,200", earnings: "₹1,808", contentLink: "https://youtube.com/watch?v=mno" },
];

const labelStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" };

export function CreatorSubmissions() {
  const hasData = submissions.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 style={{ color: "#0D1F17" }}>My Submissions</h2>
        <Link to="/creator/campaigns" className="no-underline">
          <Button variant="primary" size="small">Browse Campaigns <ArrowRight className="w-4 h-4" /></Button>
        </Link>
      </div>

      {hasData ? (
        <div className="bg-white rounded-[16px] border border-[#E2EAE6] overflow-hidden">
          {/* Header */}
          <div className="hidden lg:grid grid-cols-[1.4fr_0.9fr_0.9fr_1fr_0.8fr_0.8fr_0.7fr] gap-4 px-6 py-3.5 border-b border-[#E2EAE6] bg-[#F8FAF9]">
            {["Campaign", "Brand", "Submitted", "Status", "Views", "Earnings", "Content"].map((h) => (
              <span key={h} style={labelStyle}>{h}</span>
            ))}
          </div>

          {submissions.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
              className="grid grid-cols-1 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1fr_0.8fr_0.8fr_0.7fr] gap-2 lg:gap-4 items-center px-6 py-4 border-b border-[#E2EAE6] last:border-b-0 hover:bg-[#F8FAF9] transition-colors"
            >
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{s.campaign}</span>
              <span className="hidden lg:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358" }}>{s.brand}</span>
              <span className="hidden lg:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}>{s.submitted}</span>
              <div className="hidden lg:block"><StatusBadge variant={s.status} /></div>
              <span className="hidden lg:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{s.views}</span>
              <span className="hidden lg:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: s.earnings === "—" ? "#8FA69C" : "#1A8A5A" }}>{s.earnings}</span>
              <a
                href={s.contentLink}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:inline-flex items-center gap-1 no-underline"
                style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#1A8A5A" }}
              >
                View <ExternalLink className="w-3 h-3" />
              </a>

              {/* Mobile row extras */}
              <div className="flex lg:hidden items-center gap-3 flex-wrap">
                <span style={{ fontSize: 13, color: "#4A6358" }}>{s.brand}</span>
                <StatusBadge variant={s.status} />
                <span style={{ fontSize: 12, color: "#8FA69C" }}>{s.submitted}</span>
                {s.views !== "—" && <span style={{ fontSize: 13, color: "#0D1F17" }}>{s.views} views</span>}
                {s.earnings !== "—" && <span style={{ fontSize: 13, fontWeight: 500, color: "#1A8A5A" }}>{s.earnings}</span>}
                <a href={s.contentLink} target="_blank" rel="noopener noreferrer" className="no-underline inline-flex items-center gap-1" style={{ fontSize: 13, fontWeight: 500, color: "#1A8A5A" }}>
                  Link <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
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
            <Send className="w-9 h-9 text-[#1A8A5A]" />
          </motion.div>
          <h3 style={{ color: "#0D1F17" }}>You haven't submitted to any campaigns yet.</h3>
          <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
            Find campaigns that match your niche and start earning based on real performance.
          </p>
          <div className="mt-6">
            <Link to="/creator/campaigns" className="no-underline">
              <Button variant="primary">Browse Campaigns <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
