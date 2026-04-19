import React, { useState } from "react";
import { motion } from "motion/react";
import { Link, useParams } from "react-router";
import { Button } from "../components/Buttons";
import { StatusBadge } from "../components/Badges";
import { ArrowLeft, ArrowRight, ExternalLink, Inbox } from "lucide-react";

type BadgeVariant = "pending" | "escrow" | "live" | "completed" | "rejected" | "paidout";

interface Submission {
  id: string;
  handle: string;
  avatar: string;
  contentUrl: string;
  views: number;
  status: BadgeVariant;
}

interface Campaign {
  id: string;
  title: string;
  status: BadgeVariant;
  platform: string;
  ppvRate: number;
  totalBudget: number;
  submissions: Submission[];
}

const mockCampaigns: Record<string, Campaign> = {
  "1": {
    id: "1",
    title: "Summer Glow Reels",
    status: "live",
    platform: "Instagram",
    ppvRate: 2,
    totalBudget: 150000,
    submissions: [
      { id: "s1", handle: "@skincarebysneha", avatar: "S", contentUrl: "https://instagram.com/reel/Cx8k2mNpQrs", views: 184200, status: "live" },
      { id: "s2", handle: "@glowwithpriya", avatar: "P", contentUrl: "https://instagram.com/reel/Dy3nR7kLm2a", views: 92400, status: "live" },
      { id: "s3", handle: "@beautybyarjun", avatar: "A", contentUrl: "https://instagram.com/reel/Ez1pT9mNn4c", views: 41800, status: "completed" },
      { id: "s4", handle: "@radiantriya", avatar: "R", contentUrl: "https://instagram.com/reel/Fa2qU0nOo5d", views: 0, status: "pending" },
      { id: "s5", handle: "@dewydiaries", avatar: "D", contentUrl: "https://instagram.com/reel/Gb3rV1oPp6e", views: 0, status: "escrow" },
    ],
  },
  "2": {
    id: "2",
    title: "Monsoon Skincare Launch",
    status: "escrow",
    platform: "YouTube",
    ppvRate: 5,
    totalBudget: 75000,
    submissions: [],
  },
  "3": {
    id: "3",
    title: "Diwali Gift Box Unboxing",
    status: "completed",
    platform: "Instagram",
    ppvRate: 3,
    totalBudget: 200000,
    submissions: [
      { id: "s6", handle: "@festivefatima", avatar: "F", contentUrl: "https://instagram.com/reel/Hc4sW2pQq7f", views: 320000, status: "paidout" },
      { id: "s7", handle: "@unboxwithuday", avatar: "U", contentUrl: "https://instagram.com/reel/Id5tX3qRr8g", views: 215000, status: "paidout" },
    ],
  },
};

function formatINR(n: number): string {
  return "₹" + n.toLocaleString("en-IN");
}

function formatViews(v: number): string {
  if (v >= 10_000_000) return (v / 10_000_000).toFixed(1).replace(/\.0$/, "") + "Cr";
  if (v >= 100_000) return (v / 100_000).toFixed(1).replace(/\.0$/, "") + "L";
  if (v >= 1_000) return (v / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(v);
}

function truncateUrl(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname.length > 20 ? u.pathname.slice(0, 20) + "…" : u.pathname;
    return u.hostname.replace("www.", "") + path;
  } catch {
    return url.length > 35 ? url.slice(0, 35) + "…" : url;
  }
}

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-body)",
  fontSize: 12,
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  color: "#8FA69C",
};

export function CampaignDetail() {
  const { id } = useParams();
  const [resending, setResending] = useState(false);

  const campaign = mockCampaigns[id || "1"] || mockCampaigns["1"];
  const hasSubs = campaign.submissions.length > 0;

  const handleResend = () => {
    setResending(true);
    /* [BE:API] POST /api/campaigns/{id}/resend-payment-link */
    setTimeout(() => setResending(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      {/* Back nav */}
      <Link
        to="/brand/dashboard"
        className="inline-flex items-center gap-1.5 no-underline mb-6 px-3 py-2 -ml-3 rounded-[8px] hover:bg-[#F0F4F2] transition-colors"
        style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#4A6358" }}
      >
        <ArrowLeft className="w-4 h-4" /> My Campaigns
      </Link>

      {/* Campaign Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 flex-wrap">
        <h2 style={{ color: "#0D1F17" }}>{campaign.title}</h2>
        <div className="flex items-center gap-2.5 flex-wrap">
          <StatusBadge variant={campaign.status} />
          <span
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#E2EAE6] bg-[#F8FAF9]"
            style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#4A6358" }}
          >
            {campaign.platform}
          </span>
          <span
            className="inline-flex items-center px-3 py-1.5 rounded-full border border-[#E2EAE6] bg-[#F8FAF9]"
            style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, color: "#4A6358" }}
          >
            ₹{campaign.ppvRate}/1K views
          </span>
        </div>
      </div>

      {/* Budget Banner */}
      <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-[12px] bg-[#E8F5EE] border border-[#B3DFC8] px-6 py-4">
        <p style={{ fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 500, color: "#0A4D32", lineHeight: 1.6 }}>
          Your {formatINR(campaign.totalBudget)} performance budget is secured. Creators can submit.
        </p>
        <button
          onClick={handleResend}
          disabled={resending}
          className="shrink-0 inline-flex items-center gap-1 cursor-pointer bg-transparent border-none"
          style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}
        >
          {resending ? "Sending…" : "Resend payment link"} <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Submissions */}
      <div className="mt-12 flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <h3 style={{ color: "#0D1F17" }}>Submissions</h3>
          <span
            className="inline-flex items-center justify-center min-w-[28px] h-7 px-2 rounded-full bg-[#F0F4F2]"
            style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 600, color: "#4A6358" }}
          >
            {campaign.submissions.length}
          </span>
        </div>
      </div>

      {hasSubs ? (
        <div className="bg-white rounded-[16px] border border-[#E2EAE6] overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[1.5fr_2fr_1fr_1fr_100px] gap-4 px-6 py-3.5 border-b border-[#E2EAE6] bg-[#F8FAF9]">
            {["Creator", "Content Link", "Views", "Status", "Action"].map((h) => (
              <span key={h} style={labelStyle}>{h}</span>
            ))}
          </div>

          {/* Rows */}
          {campaign.submissions.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
              className="grid grid-cols-1 md:grid-cols-[1.5fr_2fr_1fr_1fr_100px] gap-2 md:gap-4 items-center px-6 py-4 border-b border-[#E2EAE6] last:border-b-0 hover:bg-[#F8FAF9] transition-colors"
            >
              {/* Creator */}
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full bg-[#E8F5EE] flex items-center justify-center shrink-0"
                  style={{ fontFamily: "var(--font-heading)", fontSize: 13, fontWeight: 600, color: "#1A8A5A" }}
                >
                  {s.avatar}
                </div>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
                  {s.handle}
                </span>
              </div>

              {/* Content Link */}
              <a
                href={s.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 no-underline hover:underline"
                style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#1A8A5A" }}
              >
                {truncateUrl(s.contentUrl)}
                <ExternalLink className="w-3 h-3 shrink-0" />
              </a>

              {/* Views */}
              <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>
                {s.views > 0 ? formatViews(s.views) : "—"}
              </span>

              {/* Status */}
              <div className="hidden md:block">
                <StatusBadge variant={s.status} />
              </div>

              {/* Action */}
              <div>
                {s.status !== "pending" ? (
                  /* Route: /brand/campaigns/:id/submissions/:submissionId
                     Uses BOTH campaignId (from current page) AND submissionId (from row).
                     Never use flat /brand/submissions/:id — that route is unregistered. */
                  <Link
                    to={`/brand/campaigns/${id}/submissions/${s.id}`}
                    className="no-underline inline-flex items-center gap-1"
                    style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}
                  >
                    View <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ) : (
                  <span style={{ fontSize: 13, color: "#8FA69C" }}>—</span>
                )}
              </div>

              {/* Mobile extras */}
              <div className="flex md:hidden items-center gap-3 flex-wrap">
                {s.views > 0 && (
                  <span style={{ fontSize: 13, color: "#4A6358" }}>{formatViews(s.views)} views</span>
                )}
                <StatusBadge variant={s.status} />
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
            <Inbox className="w-9 h-9 text-[#1A8A5A]" />
          </motion.div>
          <h3 style={{ color: "#0D1F17" }}>No submissions yet</h3>
          <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
            Your campaign is live — creators are reviewing it. You'll see submissions here as they come in.
          </p>
        </motion.div>
      )}
    </motion.div>
  );
}