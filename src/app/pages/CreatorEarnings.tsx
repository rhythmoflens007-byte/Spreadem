import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Button } from "../components/Buttons";
import { StatusBadge } from "../components/Badges";
import { ArrowRight, IndianRupee, TrendingUp, Clock, X, Eye, Coins } from "lucide-react";

function formatINR(n: number) { return "₹" + n.toLocaleString("en-IN"); }

const stats = [
  { label: "Total Earned", value: "₹12,400", icon: IndianRupee, color: "#1A8A5A" },
  { label: "This Month", value: "₹3,200", icon: TrendingUp, color: "#0D1F17" },
  { label: "Pending Payout", value: "₹1,800", icon: Clock, color: "#D97706" },
];

interface Payout {
  id: string;
  campaign: string;
  brand: string;
  amount: number;
  paidOn: string;
  status: "paidout" | "pending" | "completed";
  views: number;
  rate: number;
}

const payouts: Payout[] = [
  { id: "p1", campaign: "Diwali Gift Box Unboxing", brand: "GiftKaro", amount: 5472, paidOn: "8 Apr 2026", status: "paidout", views: 182400, rate: 3 },
  { id: "p2", campaign: "Fitness Tracker Review", brand: "FitBuddy", amount: 3390, paidOn: "5 Apr 2026", status: "paidout", views: 67800, rate: 5 },
  { id: "p3", campaign: "Smartwatch Unboxing Series", brand: "TechNova", amount: 1808, paidOn: "25 Mar 2026", status: "paidout", views: 45200, rate: 4 },
  { id: "p4", campaign: "Summer Glow Reels", brand: "GlowSkin", amount: 1800, paidOn: "—", status: "pending", views: 24300, rate: 2 },
];

const labelStyle: React.CSSProperties = { fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" };

export function CreatorEarnings() {
  const [selectedPayout, setSelectedPayout] = useState<Payout | null>(null);
  const hasData = payouts.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-[1280px] mx-auto px-8 py-10 md:py-14"
    >
      <h2 style={{ color: "#0D1F17" }}>Earnings & Payouts</h2>
      <p className="mt-2" style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#4A6358" }}>
        Track every rupee you've earned on SpreadEm.
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
              className="bg-white rounded-[16px] border border-[#E2EAE6] p-6 flex items-start justify-between"
            >
              <div>
                <span style={labelStyle}>{s.label}</span>
                <p className="mt-2" style={{ fontFamily: "var(--font-heading)", fontSize: 28, fontWeight: 600, color: s.color, letterSpacing: "-0.02em" }}>
                  {s.value}
                </p>
              </div>
              <div className="w-10 h-10 rounded-[10px] bg-[#E8F5EE] flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-[#1A8A5A]" />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Payout History */}
      <div className="mt-12 flex items-center justify-between mb-5">
        <h3 style={{ color: "#0D1F17" }}>Payout History</h3>
      </div>

      {hasData ? (
        <div className="bg-white rounded-[16px] border border-[#E2EAE6] overflow-hidden">
          <div className="hidden md:grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-4 px-6 py-3.5 border-b border-[#E2EAE6] bg-[#F8FAF9]">
            {["Campaign", "Brand", "Amount", "Paid On", "Status"].map((h) => (
              <span key={h} style={labelStyle}>{h}</span>
            ))}
          </div>

          {payouts.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: i * 0.08 }}
              onClick={() => setSelectedPayout(p)}
              className="grid grid-cols-1 md:grid-cols-[1.5fr_1fr_1fr_1fr_1fr] gap-2 md:gap-4 items-center px-6 py-4 border-b border-[#E2EAE6] last:border-b-0 hover:bg-[#F8FAF9] transition-colors cursor-pointer"
            >
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{p.campaign}</span>
              <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358" }}>{p.brand}</span>
              <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#1A8A5A" }}>{formatINR(p.amount)}</span>
              <span className="hidden md:block" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}>{p.paidOn}</span>
              <div className="hidden md:block">
                <StatusBadge variant={p.status === "pending" ? "pending" : "paidout"} />
              </div>

              {/* Mobile extras */}
              <div className="flex md:hidden items-center gap-3 flex-wrap">
                <span style={{ fontSize: 13, color: "#4A6358" }}>{p.brand}</span>
                <span style={{ fontSize: 13, fontWeight: 500, color: "#1A8A5A" }}>{formatINR(p.amount)}</span>
                <StatusBadge variant={p.status === "pending" ? "pending" : "paidout"} />
                <span style={{ fontSize: 12, color: "#8FA69C" }}>{p.paidOn}</span>
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
            <Coins className="w-9 h-9 text-[#1A8A5A]" />
          </motion.div>
          <h3 style={{ color: "#0D1F17" }}>No earnings yet</h3>
          <p className="mt-3 max-w-sm" style={{ fontSize: 15, color: "#4A6358", lineHeight: 1.7 }}>
            Submit content to live campaigns and earn based on your views. Your first payout is just one campaign away.
          </p>
          <div className="mt-6">
            <Link to="/creator/campaigns" className="no-underline">
              <Button variant="primary">Browse Campaigns <ArrowRight className="w-4 h-4" /></Button>
            </Link>
          </div>
        </motion.div>
      )}

      {/* Payout Detail Modal */}
      <AnimatePresence>
        {selectedPayout && (
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
              className="bg-white rounded-[20px] p-8 max-w-[440px] w-full shadow-xl relative"
            >
              <button
                onClick={() => setSelectedPayout(null)}
                className="absolute top-4 right-4 p-1.5 rounded-[8px] hover:bg-[#F0F4F2] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4 text-[#8FA69C]" />
              </button>

              <h3 style={{ color: "#0D1F17" }}>Payout Breakdown</h3>
              <p className="mt-1 mb-6" style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8FA69C" }}>
                {selectedPayout.campaign}
              </p>

              <div className="flex flex-col gap-4">
                <DetailRow icon={<Eye className="w-4 h-4 text-[#8FA69C]" />} label="Total Views" value={selectedPayout.views.toLocaleString("en-IN")} />
                <DetailRow icon={<Coins className="w-4 h-4 text-[#8FA69C]" />} label="PPV Rate" value={`₹${selectedPayout.rate}/1,000 views`} />
                <div className="border-t border-[#E2EAE6]" />
                <div className="flex items-center justify-between">
                  <span style={labelStyle}>Calculation</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#4A6358" }}>
                    {selectedPayout.views.toLocaleString("en-IN")} × ₹{selectedPayout.rate}/1K
                  </span>
                </div>
                <div className="bg-[#E8F5EE] rounded-[12px] p-5 flex items-center justify-between">
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0A4D32" }}>Amount Earned</span>
                  <span style={{ fontFamily: "var(--font-heading)", fontSize: 22, fontWeight: 600, color: "#1A8A5A", letterSpacing: "-0.02em" }}>
                    {formatINR(selectedPayout.amount)}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1">
                  <span style={labelStyle}>Brand</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{selectedPayout.brand}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={labelStyle}>{selectedPayout.status === "pending" ? "Expected By" : "Paid On"}</span>
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#0D1F17" }}>{selectedPayout.paidOn}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span style={labelStyle}>Status</span>
                  <StatusBadge variant={selectedPayout.status === "pending" ? "pending" : "paidout"} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2" style={{ fontFamily: "var(--font-body)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em", color: "#8FA69C" }}>
        {icon} {label}
      </span>
      <span style={{ fontFamily: "var(--font-body)", fontSize: 14, fontWeight: 500, color: "#0D1F17" }}>{value}</span>
    </div>
  );
}
