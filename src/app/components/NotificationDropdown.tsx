import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router";
import { Megaphone, CheckCircle, IndianRupee, AlertTriangle } from "lucide-react";

type NotifType = "campaign" | "submission" | "payout" | "budget";

const iconMap: Record<NotifType, { icon: React.ElementType; bg: string; color: string }> = {
  campaign: { icon: Megaphone, bg: "#EFF6FF", color: "#2563EB" },
  submission: { icon: CheckCircle, bg: "#F0FDF4", color: "#16A34A" },
  payout: { icon: IndianRupee, bg: "#F5F3FF", color: "#6D28D9" },
  budget: { icon: AlertTriangle, bg: "#FFFBEB", color: "#D97706" },
};

const items: { type: NotifType; title: string; time: string; read: boolean }[] = [
  { type: "submission", title: "Submission approved for \"Summer Glow Reels\"", time: "2 min ago", read: false },
  { type: "payout", title: "₹5,472 payout released to your account", time: "1 hr ago", read: false },
  { type: "campaign", title: "New campaign match: Monsoon Skincare Launch", time: "3 hr ago", read: false },
  { type: "budget", title: "Budget 75% utilised — Fitness Tracker Review", time: "5 hr ago", read: true },
  { type: "submission", title: "Content under review — Protein Shake Challenge", time: "8 hr ago", read: true },
];

export function NotificationDropdown({ open, onClose, basePath }: { open: boolean; onClose: () => void; basePath: string }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-[380px] bg-white rounded-[16px] border border-[#E2EAE6] shadow-lg z-50 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#E2EAE6]">
              <span style={{ fontFamily: "var(--font-heading)", fontSize: 15, fontWeight: 600, color: "#0D1F17" }}>Notifications</span>
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#DC2626] text-white" style={{ fontSize: 11, fontWeight: 600 }}>3</span>
            </div>

            <div className="divide-y divide-[#E2EAE6] max-h-[360px] overflow-y-auto">
              {items.map((n, i) => {
                const { icon: Icon, bg, color } = iconMap[n.type];
                return (
                  <div key={i} className={`flex items-start gap-3 px-5 py-3.5 transition-colors hover:bg-[#F8FAF9] cursor-pointer ${!n.read ? "bg-[#F8FAF9]" : ""}`}>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundColor: bg }}>
                      <Icon className="w-3.5 h-3.5" style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-1.5">
                        <span className="flex-1" style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: n.read ? 400 : 500, color: "#0D1F17", lineHeight: 1.5 }}>{n.title}</span>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-[#1A8A5A] shrink-0 mt-1.5" />}
                      </div>
                      <span style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#8FA69C" }}>{n.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <Link
              to={`${basePath}/notifications`}
              onClick={onClose}
              className="block text-center py-3 border-t border-[#E2EAE6] no-underline hover:bg-[#F8FAF9] transition-colors"
              style={{ fontFamily: "var(--font-body)", fontSize: 13, fontWeight: 500, color: "#1A8A5A" }}
            >
              View all →
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
